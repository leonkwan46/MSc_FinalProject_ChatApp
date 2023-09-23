import expres from "express"
import User from "../db/users.js"

const router = expres.Router()

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        console.log(user)
        if (!user || user.password !== password) {throw new Error ("Invalid username or password")}
        return res.status(200).json(user)
    } catch (err) {
        
    }
})

export default router