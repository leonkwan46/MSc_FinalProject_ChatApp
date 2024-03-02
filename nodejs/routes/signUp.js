import express from "express"
import { User, Document } from "../db/modals/index.js"
import authHelper from "../helpers/authHelper.js"

const router = express.Router()

router.post('/', async (req, res, next) => {
    try {
        const { email, password, role } = req.body
        const { user, token } = await authHelper.createAccount(email, password, role)

        // Return User
        let userData = await User.findOne({ email })
        userData = {
            userId: user._id,
            email,
            role: user.role,
            isRegistered: user.isRegistered,
            isInvited: user.isInvited,
            invitationCode: user.invitationCode,
        }

        return res.status(200).json({ user: userData, token })
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