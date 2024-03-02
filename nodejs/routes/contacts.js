import express from "express"
import authHandler from "../handlers/authHandler.js"
import OTPHelper from "../helpers/OTPHelper.js"

const router = express.Router()

router.post('/', authHandler, async (req, res, next) => {  
    const user = req.user
    const { email } = req.body
    const { hashPassword } = user
    try {
        const otpCode = await OTPHelper.generateOTP(hashPassword)
        await OTPHelper.sendOTPByEmail(email, otpCode)
        return res.status(200).json({ message: "Success" })
    } catch (err) {
        next(err)
    }
})

export default router