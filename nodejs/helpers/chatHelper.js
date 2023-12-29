import { Message } from '../db/modals/index.js'

const chatHelper = {}

chatHelper.handleSendMessage = async (io, socket, props) => {
    const { roomId, message, userId } = props

    const newMessage = Message({
        message,
        senderId: userId,
        roomId,
        sentAt: Date.now(),
        isRead: false,
    })
    // Save message to database
    // try {
    //     await newMessage.save()
    //     console.log('=======================')
    //     console.log('Message saved to database')
    //     console.log('=======================')
    // } catch (err) {
    //     console.log(err)
    // }
    io.emit('chatMessage', { sender: socket.id, data: newMessage })
}

chatHelper.joinRoom = (io, socket, room) => {
    socket.join(room)
    io.to(room).emit('roomJoined', { user: socket.id, room: room })
}

export default chatHelper
