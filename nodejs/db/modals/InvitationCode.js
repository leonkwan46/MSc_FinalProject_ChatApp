import mongoose from 'mongoose'

const invitationCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
})

export default mongoose.model("InvitationCode", invitationCodeSchema)