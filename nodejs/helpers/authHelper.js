import { Parent, Teacher, User } from "../db/modals/index.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authHelper = {}

authHelper.validateUser = async (email) => {
    let user = await User.findOne({ email })
    const { isRegistered, isInvited } = user

    if (!isRegistered) {
        if (user) throw new Error("User already exists")
    } else {
        if (!user) throw new Error("Invalid Username/Password")
        if (!user.isRegistered) throw new Error("User is not registered")
    }
    return user
}

authHelper.validatePassword = async (password, hashPassword) => {
    const isMatch = await bcrypt.compare(password, hashPassword)
    if (!isMatch) throw new Error("Invalid Username/Password")
    return isMatch
}

authHelper.generateHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

authHelper.generateAuthToken = async (user) => {
    const tokenPayload = {
        _id: user._id,
        email: user.email,
        hashPassword: user.hashPassword,
        role: user.role,
        gender: user.gender,
        name: user.name,
        isRegistered: user.isRegistered,
        isInvited: user.isInvited,
        invitationCode: user.invitationCode,
    }
    return await jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" })
}

authHelper.createAccount = async (email, password, role) => {
    let user = await authHelper.validateUser(email)
    const hashPassword = await authHelper.generateHashPassword(password)
    // Create User
    if (role === "parent") {
        user = new Parent({
            email,
            hashPassword,
            role,
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
    // Store User
    const storingUser = await user.save()
    if (!storingUser) throw new Error("Failed to store user")
    // Generate Token
    const token = await authHelper.generateAuthToken(user)

    return { user, token }
}

export default authHelper