import express from "express"
import loginRoute from "./login.js"
import signUpRoute from "./signUp.js"
import extraDetailsRoute from "./extraDetails.js"
import chatMessageRoute from "./chatMessage.js"
import contactsRoute from "./contacts.js"

const router = express.Router()

router.use('/login', loginRoute)
router.use('/signup', signUpRoute)
router.use('/extra_details', extraDetailsRoute)
router.use('/chat_message', chatMessageRoute)
router.use('/contacts', contactsRoute)

export default router