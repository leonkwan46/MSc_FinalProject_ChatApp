import express from "express"
import { Room } from "../db/modals/index.js"

const router = express.Router()

router.post('/create_room', async (req, res, next) => {
    try {
        const { roomName, members } = req.body
        const newRoom = Room({
            name: roomName,
            members: members,
        })
        const room = await newRoom.save()
        return res.status(200).json(room)
    } catch (err) {
        next(err)
    }
})

router.get('/rooms', async (req, res, next) => {
    try {
        const rooms = await Room.find()
        return res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
})

router.get('/:roomId', async (req, res, next) => {
    console.log('=======================')
    console.log(req.params.roomId)
    console.log('=======================')
})

export default router