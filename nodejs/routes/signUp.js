import express from "express"
import { User, Parent, Teacher } from "../db/modals/index.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const { username, password, role } = req.body

        // Check if user exists
        let user = await User.findOne({ username: username })
        if (user) throw new Error ("Username already exists")
        
        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        
        // Create users based on role
        if (role === "parent") {
            const invitationCode = Math.random(100000, 999999).toString().substring(2, 7)
            user = await new Parent({
                username,
                hashPassword,
                role,
                invitationCode,
            })
        } else if (role === "teacher") {
            user = await new Teacher({
                username,
                hashPassword,
                role,
            })
        }
        
        // Generate Token
        const tokenPayload = {
            username: user.username,
            role: user.role,
            isRegistered: user.isRegistered,
            isInvited: user.isInvited,
            invitationCode: user.invitationCode,
        }
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1m" })

        // Store User
        let storingUser = await user.save()
        if (!storingUser) throw new Error("Failed to store user")

        // Update User isRegistered status
        let update = await user.updateOne({ $set: { isRegistered: true } })
        if (!update) throw new Error("Failed to update user isRegistered status")

        // Return User
        user = await User.findOne({ username: username })
        user = {
            _id: user._id,
            username: user.username,
            role: user.role,
            isRegistered: user.isRegistered,
            isInvited: user.isInvited,
            invitationCode: user.invitationCode,
        }

        return res.status(200).json({ user, token })
    } catch (err) {
        next(err)
    }
})

export default router