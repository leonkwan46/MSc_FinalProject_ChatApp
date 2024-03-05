import express from "express"
import authHandler from "../handlers/authHandler.js"
import OTPHelper from "../helpers/OTPHelper.js"
import { User } from "../db/modals/index.js"
import authHelper from "../helpers/authHelper.js"

const router = express.Router()

router.post('/send_invitation', authHandler, async (req, res, next) => {  
    try {
        const { email, userId } = req.body

        let recipient = await User.findById(userId)
        // If user does not exist, create user
        if (!recipient) recipient = await authHelper.createAccount(email, '123456', 'parent')

        const otpCode = await OTPHelper.generateOTP(recipient.user.hashPassword)
        await OTPHelper.sendOTPByEmail(email, otpCode)
        return res.status(200).json({ message: "Success" })
    } catch (err) {
        next(err)
    }
})

export default router