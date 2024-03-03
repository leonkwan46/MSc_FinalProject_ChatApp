import mongoose from "mongoose"
import { User } from "./index.js"

const parentSchema = new mongoose.Schema({
    isInvited: {
        type: Boolean,
        default: false,
    },
    isInvitationVerified: {
        type: Boolean,
        default: false,
    },
})

export default User.discriminator("Parent", parentSchema)