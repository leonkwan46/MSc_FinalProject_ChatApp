import { totp } from "otplib"
import mailerHelper from "./mailerHelper.js"
import OTPEmail from "../mailer/templates/OTPEmail.js"

const OTPHelper = {}

OTPHelper.generateOTP = async (secret) => {
    return await totp.generate(secret)
}

OTPHelper.verifyOTP = async (otp, secret) => {
    return await totp.verify({ token: otp, secret })
}

OTPHelper.sendOTPByEmail = async (email, code) => {
    const details = OTPEmail(code)
    await mailerHelper.sendEmail({ email, details })
}

export default OTPHelper