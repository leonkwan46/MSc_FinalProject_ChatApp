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
    instrument: {
        type: [String],
        required: true,
    },
})

export default User.discriminator("Student", studentSchema)