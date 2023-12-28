const chatHelper = {}

chatHelper.handleSendMessage = (io, socket, props) => {
    const { roomId, message, userId } = props
    console.log(`Message received from ${socket.id}:\n${message}`)
    io.emit('chatMessage', { sender: socket.id, data: props })
}

chatHelper.joinRoom = (io, socket, room) => {
    socket.join(room)
    console.log(`User ${socket.id} joined room ${room}`)
    io.to(room).emit('roomJoined', { user: socket.id, room: room })
}

export default chatHelper
