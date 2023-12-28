import chatHelper from "../helpers/chatHelper.js"
import Message from '../db/modals/Message.js'

const connectSocketIO = (io) => {
    let onlineUsers = new Set()

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`)
        onlineUsers.add(socket.id)
        console.log(onlineUsers)

        // Reveive message
        socket.on('message', (message) => {
            chatHelper.handleReceiveMessage(io, socket, message)
        })
        // // Save message to database
        // const newMessage = Message({
        //     sender: userId,
        //     recipients: [],
        //     message: message,
        //     isRead: false,
        // })
        // console.log(newMessage)
        // try {
        //     await newMessage.save()
        // } catch (err) {
        //     console.log(err)
        // }

        // Send message
        socket.on('sendMessage', async (props) => {
            console.log('===========MSG============')
            console.log(props)
            console.log('==========================')

            chatHelper.handleSendMessage(io, socket, props)
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`)
            onlineUsers.delete(socket.id)
            console.log(onlineUsers)
        })
        
        socket.on('joinRoom', (room) => {
            console.log('===========Room============')
            chatHelper.joinRoom(io, socket, room)
            console.log('===========================')

        })
    })
}

export default connectSocketIO