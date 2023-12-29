import chatHelper from "../helpers/chatHelper.js"

const connectSocketIO = (io) => {
    let onlineUsers = new Set()

    io.on('connection', (socket) => {
        onlineUsers.add(socket.id)
        console.log(onlineUsers)

        // Join room
        socket.on('joinRoom', (room) => {
            chatHelper.joinRoom(io, socket, room)
        })
        // Send message
        socket.on('sendMessage', (props) => {
            chatHelper.handleSendMessage(io, socket, props)
        })

        // Disconnect
        socket.on('disconnect', () => {
            onlineUsers.delete(socket.id)
            console.log(onlineUsers)
        })
        
    })
}

export default connectSocketIO