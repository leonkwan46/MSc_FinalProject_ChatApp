import express from "express"
import User from "../db/users.js"
import authHandler from "../handlers/authHandler.js"

const router = express.Router()

router.post('/authInvitationCode', authHandler, async (req, res, next) => {    
    const user = req.user

    try {
        const { invitationCode } = req.body

        // Check if user is invited
        if (invitationCode !== user.invitationCode) throw new Error("Invalid Invitation Code")
        
        // Update user's isInvited field to true
        try {
            await User.findOneAndUpdate({ username: req.user.username }, { isInvited: true })
        } catch (err) {
            throw new Error("Updating user's isInvited field")
        }
        
        return res.status(200).json({ message: "Success" })
    } catch (err) {
        next(err)
    }
})

export default router