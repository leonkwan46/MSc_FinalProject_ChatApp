import express from "express"
import User from "../db/users.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/", async (req, res, next) => {

    try {
        const { username, password, role } = req.body

        // Check if user exists
        let user = await User.findOne({ username: req.body.username })
        if (user) throw new Error ("Username already exists")

        // Check if role is valid
        let invitationCode = ""
        if (role === "parent") {
            invitationCode = "P" + Math.random().toString(36)
        }
        
        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        
        // Create User
        user = await new User({
            username,
            hashPassword,
            role,
        })

        // Generate Token
        const token = jwt.sign(user, process.env.JWT_SECRET)

        // Store User
        user.save()

        return res.status(200).json(token)
    } catch (err) {
        next(err)
    }
})

export default router