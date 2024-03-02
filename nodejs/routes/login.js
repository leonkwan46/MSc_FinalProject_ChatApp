import expres from "express"
import User from "../db/modals/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = expres.Router()

router.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body
        // Check if user exists
        let user = await User.findOne({ username })
        if (!user) throw new Error("Invalid Username/Password")
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.hashPassword)
        if (!isMatch) throw new Error("Invalid Username/Password")
        // Check if user is registered
        if (!user.isRegistered) throw new Error("User is not registered")

        // Generate Token
        const tokenPayload = {
            _id: user._id,
            email: user.email,
            hashPassword: user.hashPassword,
            role: user.role,
            gender: user.gender,
            name: user.name,
            isRegistered: user.isRegistered,
            isInvited: user.isInvited,
            invitationCode: user.invitationCode,
        }
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" })
        // Return User
        user = {
            _id: user._id,
            email: user.email,
            hashPassword: user.hashPassword,
            role: user.role,
            isRegistered: user.isRegistered,
            isInvited: user.isInvited,
            invitationCode: user.invitationCode,
        }

        return res.status(200).json({ user, token })
    } catch (err) {
        next(err, err.code = 999)
    }
})

export default router