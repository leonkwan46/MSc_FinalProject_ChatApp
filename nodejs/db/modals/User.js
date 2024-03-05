import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      requiredd: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "parent", "teacher",  "admin"],
      required: true,
    },

    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    DoB: {
      type: Date,
    },

    isRegistered: {
      type: Boolean,
      default: false,
    },
    isGeneralFormComplete: {
      type: Boolean,
      default: false,
    },


    createAt: {
      type: Number,
      default: Date.now,
    },
  })

export default mongoose.model("User", userSchema)