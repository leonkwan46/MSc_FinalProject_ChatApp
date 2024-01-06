import express from "express"
import { User, Parent, Teacher, InvitationCode, Document } from "../db/modals/index.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/", async (req, res, next) => {
    try {
        const { email, password, role } = req.body
        // Check if user exists
        let user = await User.findOne({ email })
        if (user) throw new Error ("User already exists")
        
        // Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        
        // Create users based on role
        if (role === "parent") {
            const code = Math.random(100000, 999999).toString().substring(2, 7)
            let invitationCode = new InvitationCode({
                code,
                isUsed: false,
                isVerified: false
            })
            user = new Parent({
                email,
                hashPassword,
                role,
                invitationCode,
                isRegistered: true,
            })
        } else if (role === "teacher") {
            user = new Teacher({
                email,
                hashPassword,
                role,
                isRegistered: true,
            })
        }
        
        // Generate Token
        const tokenPayload = {
            email: user.email,
            role: user.role,
            isRegistered: user.isRegistered,
            isInvited: user.isInvited,
            invitationCode: user.invitationCode,
        }
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1m" })
        
        // Store User
        let storingUser = await user.save()
        if (!storingUser) throw new Error("Failed to store user")
        
        // Update User isRegistered status
        let update = await user.updateOne({ $set: { isRegistered: true } })
        if (!update) throw new Error("Failed to update user isRegistered status")

        // Return User
        user = await User.findOne({ email })
        user = {
            userId: user._id,
            email,
            role: user.role,
            isRegistered: user.isRegistered,
            isInvited: user.isInvited,
            invitationCode: user.invitationCode,
        }

        return res.status(200).json({ user, token })
    } catch (err) {
        next(err)
    }
})

router.post('/extra_details', async (req, res, next) => {
    try {
        const { name, DoB, gender, userId } = req.body

        // Find user
        let user = await User.findById(userId)
        if (!user) throw new Error("User not found")

        // Update user
        user.name = name
        user.DoB = DoB
        user.gender = gender

        // Save user
        let savingUser = await user.save()
        if (!savingUser) throw new Error("Failed to save user")

        return res.status(200).json({ name, DoB, gender, userId })
    } catch (err) {
        next(err)
    }
})

router.post('/extra_details/upload', async (req, res, next) => {
    try {
        const { userId, selectedDBS, selectedID, selectedProfessionalCert } = req.body
        // Find user
        let user = await User.findById(userId)
        if (!user) throw new Error("User not found")

        let documents = new Document({
            DBSCert: selectedDBS,
            ProofOfId: selectedID,
            ProfessionalCert: selectedProfessionalCert,
        })

        // Save documents
        let savingDocuments = await documents.save()
        if (!savingDocuments) throw new Error("Failed to save documents")

        // Update user
        user.isDocUploaded = true
        user.documents = savingDocuments

        // Save user
        let savingUser = await user.save()
        if (!savingUser) throw new Error("Failed to save user")

        return res.status(200).json({ userId })
    } catch (err) {
        next(err)
    }
})

export default router