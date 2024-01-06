import mongoose from "mongoose"
import { User } from "./index.js"

const teacherSchema = new mongoose.Schema({
    isDocUploaded: {
        type: Boolean,
        default: false,
    },
    isDocVerified: {
        type: Boolean,
        default: false,
    },
    documents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
    },
})

export default User.discriminator("Teacher", teacherSchema)