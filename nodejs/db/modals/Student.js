import mongoose from "mongoose"
import User from "./User.js"

const studentSchema = new mongoose.Schema({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
})

export default User.discriminator("Student", studentSchema)