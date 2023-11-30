import chatHelper from "../helpers/chatHelper.js"

const connectSocketIO = (io) => {
    let onlineUsers = new Set()

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`)
        onlineUsers.add(socket.id)
        console.log(onlineUsers)

        socket.on('message', (message) => {
            chatHelper.handleReceiveMessage(io, socket, message)
        })

        socket.on('sendMessage', (props) => {
            const { recipientSocketId, userId, message } = props
            if (recipientSocketId) {
                chatHelper.handleOnlineSendMessageToOne(io, socket, recipientSocketId, message)
            } else {
                chatHelper.handleOfflineSendMessageToOne(io, socket, userId, message)
            }
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`)
            onlineUsers.delete(socket.id)
            console.log(onlineUsers)
        })
    })
}

export default connectSocketIO