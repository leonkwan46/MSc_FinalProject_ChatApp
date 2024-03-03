import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      require: true,
    },
    hashPassword: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["student", "parent", "teacher",  "admin"],
    },

    name: {
      type: String,
      require: true,
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