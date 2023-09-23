import express from "express"
import User from "../db/users.js"

const router = express.Router()

// Create Account
router.post("/", async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username })
        if (user) throw new Error ("Username already exists")
        user = await new User({
            username: req.body.username,
            password: req.body.password,
        })
        // user.save()
        return res.status(200).json({ message: "User created successfully" })
    } catch (err) {
        console.log(err)
    }
})

export default router