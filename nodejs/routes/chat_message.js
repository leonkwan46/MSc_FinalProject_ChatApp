import express from "express"
import { Room } from "../db/modals/index.js"
import authHandler from "../handlers/authHandler.js"
import chatHelper from "../helpers/chatHelper.js"

const router = express.Router()

router.post('/create_chat_room', authHandler, async (req, res, next) => {
    const { role, _id } = req.user
    const memberData = await chatHelper.generateRoomMemberData(_id, role, req.body)

    const newRoom = Room({
        name: `${memberData.student.name}'s Music Room`,
        members: [memberData.teacher, memberData.student, memberData.parent]
    })

    try {
        await newRoom.save()
        return res.status(200).json(newRoom)
    } catch (err) {
        next(err)
    }
})

router.get('/get_rooms', async (req, res, next) => {
    try {
        const rooms = await Room.find()
        return res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
})

export default router