import express from "express"
import authHandler from "../handlers/authHandler.js"
import OTPHelper from "../helpers/OTPHelper.js"
import { Parent, Student, User } from "../db/modals/index.js"
import authHelper from "../helpers/authHelper.js"

const router = express.Router()

router.post('/send_invitation', authHandler, async (req, res, next) => {  
    try {
        const teacherID = req.user._id
        const { email, userId } = req.body

        let recipient = await User.findById(userId)
        // If user does not exist, create user
        if (!recipient) {
            recipient = await authHelper.createAccount(email, '123456', 'parent')
            await Parent.updateMany({ _id: recipient.user._id }, {
                $push: { teachers: teacherID }
            })
        }

        const otpCode = await OTPHelper.generateOTP(recipient.user.hashPassword)
        await OTPHelper.sendOTPByEmail(email, otpCode)
        return res.status(200).json({ message: "Success" })
    } catch (err) {
        next(err)
    }
})

router.post('/create_student_account', authHandler, async (req, res, next) => {
    try {
        const { _id: parentID } = req.user
        const { email, password, name, DoB, gender, teacher, instrument } = req.body

        // Create student account
        const student = await authHelper.createAccount(email, password, 'student')
        // Update student details
        await Student.updateMany({ _id: student.user._id }, {
            $set: { name: name, DoB: DoB, gender: gender, isGeneralFormComplete: true, parent: parentID},
            $push: { teachers: teacher.split(',')[1], instrument: instrument }
        })
        // Update parent details
        await Parent.updateMany({ _id: parentID }, {
            $push: { children: student.user._id }
        })

        return res.status(200).json({ message: "Success" })
    } catch (err) {
        next(err)
    }
})

export default router