import express from "express"
import loginRoute from "./login.js"
import signUpRoute from "./signUp.js"
import extraDetailsRoute from "./extraDetails.js"

const router = express.Router()

router.use("/login", loginRoute)
router.use("/signup", signUpRoute)
router.use("/extraDetails", extraDetailsRoute)

export default router