const chatHelper = {}

chatHelper.handleReceiveMessage = (io, socket, message) => {
    console.log(`Message received from ${socket.id}:\n${message}`)
    io.emit('chatMessage', { sender: socket.id, data: message })
}

chatHelper.handleOnlineSendMessageToOne = (io, senderSocket, recipientSocketId, message) => {
    console.log(`Message sent from ${senderSocket.id} to ${recipientSocketId}: ${msg}`)
    io.to(recipientSocketId).emit('chat message', { sender: senderSocket.id, message: message })
}

chatHelper.handleOfflineSendMessageToOne = (io, senderSocket, recipientUserId, message) => {
    console.log(`Message sent from ${senderSocket.id} to ${recipientUserId}: ${message}`)
    io.emit('chat message', { sender: senderSocket.id, message: message })
}

export default chatHelper