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
    role: {
      type: String,
      enum: ["student", "parent", "teacher",  "admin"],
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    isFilledDetails: {
      type: Boolean,
      default: false,
    },
  })

export default mongoose.model("User", userSchema)