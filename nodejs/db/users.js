import mongoose from "mongoose"

const validateInvitationCode = (role) => {
  if (role !== "student" && role !== "parent") {
    return false;
  }
  return true;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
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
    isInvited: {
      type: Boolean,
      default: false,
    },
    invitationCode: {
      type: String,
      unique: true,
      validation: {
        validator: (() => {validateInvitationCode(this.role)}),
        message: "Invalid Role",
      },
    },
  }
)

export default mongoose.model("User", userSchema)