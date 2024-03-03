import expres from "express"
import authHelper from "../helpers/authHelper.js"

const router = expres.Router()

router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await authHelper.validateUser(email, true)
        await authHelper.validatePassword(password, user.hashPassword)
        const authToken = authHelper.generateAuthToken(user)

        const userData = {
            _id: user._id,
            email: user.email,
            hashPassword: user.hashPassword,
            role: user.role,
            isRegistered: user.isRegistered,
            isInvited: user.isInvited,
            isGeneralFormComplete: user.isGeneralFormComplete,
        }

        return res.status(200).json({ user: userData, token: authToken })
    } catch (err) {
        next(err)
    }
})

export default router