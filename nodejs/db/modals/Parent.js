import mongoose from "mongoose"
import { User } from "./index.js"

const parentSchema = new mongoose.Schema({
    isInvited: {
        type: Boolean,
        default: false,
    },
    InvitationCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InvitationCode",
    }
})

export default User.discriminator("Parent", parentSchema)