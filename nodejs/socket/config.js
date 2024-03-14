import chatHelper from "../helpers/chatHelper.js"

const connectSocketIO = (io) => {
    let onlineUsers = new Set()

    io.on('connection', (socket) => {
        onlineUsers.add(socket.id)

        // Join room
        socket.on('joinRoom', (roomData) => {
            chatHelper.joinRoom(io, socket, roomData)
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