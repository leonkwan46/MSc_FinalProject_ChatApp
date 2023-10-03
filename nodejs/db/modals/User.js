import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    hashPassword: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["student", "parent", "teacher",  "admin"],
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    isVerifiend: {
      type: Boolean,
      default: false,
    },
  }
)

export default mongoose.model("User", userSchema)