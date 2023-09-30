import expres from "express"
import User from "../db/users.js"
import bcrypt from 'bcrypt'

const router = expres.Router()

router.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body
        
        // Check if user exists
        const user = await User.findOne({ username })
        if (!user) throw new Error("User does not exist", { code: 666 })

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new Error("Invalid Username/Password")

        return res.status(200).json(user)
    } catch (err) {
        next(err, err.code = 999)
    }
})

export default router