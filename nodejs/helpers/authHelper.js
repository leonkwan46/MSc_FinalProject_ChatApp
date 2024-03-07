import { Parent, Student, Teacher, User } from "../db/modals/index.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authHelper = {}

authHelper.validateUser = async (email, isLogin=false) => {
    let user = await User.findOne({ email })

    if (isLogin) {
        if (!user) throw new Error("Invalid Username/Password")
        if (!user.isRegistered) throw new Error("User not registered")
    } else {
        if (user) throw new Error("User already exists")
    }
    return user
}

authHelper.validatePassword = async (password, hashPassword) => {
    const isMatch = await bcrypt.compare(password, hashPassword)
    if (!isMatch) throw new Error("Invalid Username/Password")
    return isMatch
}

authHelper.returnUserData = async (user = '', isValid = false) => {
    if (!isValid) user = await authHelper.validateUser(user.email, true)

    const defaultUserData = {
        userId: user._id,
        email: user.email,
        role: user.role,
        isRegistered: user.isRegistered,
        isGeneralFormComplete: user.isGeneralFormComplete,
    }
    if (user.role === "parent") {
        const children = await Promise.all(user.children.map(async (childId) => {
            const child = await Student.findById(childId)
            if (!child) return null
            const { _id, email, name, role, DoB, gender, parent, teachers, instruments } = child
            return { _id, email, name, role, DoB, gender, parent, teachers, instruments }
        }))
        const teachers = await Promise.all(user.teachers.map(async (teacherId) => {
            const teacher = await Teacher.findById(teacherId)
            if (!teacher) return null
            const { _id, email, name, role, DoB, gender, parents } = teacher
            return { _id, email, name, role, DoB, gender, parents }
        }))
        return {
            ...defaultUserData,
            isInvited: user.isInvited,
            isInvitationVerified: user.isInvitationVerified,
            children: children,
            teachers: teachers,
        }
    } else if (user.role === "teacher") {
        const parents = await Promise.all(user.parents.map(async (parentId) => {
            const parent = await Parent.findById(parentId)
            return parent
        }))
        const students = await Promise.all(user.students.map(async (studentId) => {
            const student = await Student.findById(studentId)
            return student
        }))
        return {
            ...defaultUserData,
            isDocUploaded: user.isDocUploaded,
            isDocVerified: user.isDocVerified,
            parents: parents,
            students: students,
        }
    } else if (user.role === "student") {
        const parent = await Parent.findById(user.parent)
        const teachers = await Promise.all(user.teachers.map(async (teacherId) => {
            const teacher = await Teacher.findById(teacherId)
            return teacher
        }))
        return {
            ...defaultUserData,
            instrument: user.instruments,
            parent: parent,
            teachers: teachers,
        }
    } else {
        return defaultUserData
    }
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
        isInvitationVerified: user.isInvitationVerified,
        isDocUploaded: user.isDocUploaded,
        isDocVerified: user.isDocVerified,
        isGeneralFormComplete: user.isGeneralFormComplete,
        createAt: user.createAt,
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
    } else if (role === "student") {
        user = new Student({
            email,
            hashPassword,
            role,
            isRegistered: true,
        })
    }
    // Store User
    const storingUser = await user.save()
    if (!storingUser) throw new Error("Failed to store user")

    // Find User
    user = await User.findOne({ email })
    // Generate Token
    const token = await authHelper.generateAuthToken(user)

    return { user, token }
}

export default authHelper