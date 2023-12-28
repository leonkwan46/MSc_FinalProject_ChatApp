import express from "express"
import { Room, Message } from "../db/modals/index.js"

const router = express.Router()

router.get("/rooms", async (req, res, next) => {
    try {
        const rooms = await Room.find()
        return res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
})

router.get("/:roomId", async (req, res, next) => {
    console.log('=======================')
    console.log(req.params.roomId)
    console.log('=======================')
})

export default router