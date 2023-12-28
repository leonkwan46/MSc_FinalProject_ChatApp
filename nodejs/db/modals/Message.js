import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    message: {
        type: String,
        require: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    createAt: {
        type: Number,
        default: Date.now,
        required: true,
    },
})

export default mongoose.model("Message", messageSchema)