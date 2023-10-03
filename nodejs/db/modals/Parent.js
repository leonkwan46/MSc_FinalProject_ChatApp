import mongoose from "mongoose"
import User from "./User.js"

const parentSchema = new mongoose.Schema(
    {
        isVerifiedCode: {
            type: Boolean,
            default: false,
        },
        isInvited: {
            type: Boolean,
            default: false,
        },
        invitationCode: {
            type: String,
            unique: true,
        },
    }
)

export default User.discriminator("Parent", parentSchema)