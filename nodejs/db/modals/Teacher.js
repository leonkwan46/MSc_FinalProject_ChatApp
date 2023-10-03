import mongoose from "mongoose"
import User from "./User.js"

const teacherSchema = new mongoose.Schema(
    {
        isDocUploaded: {
            type: Boolean,
            default: false,
        },
        isDocVerified: {
            type: Boolean,
            default: false,
        },
        
    }
)

export default User.discriminator("Teacher", teacherSchema)