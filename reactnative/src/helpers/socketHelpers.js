import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')

const getSocketId = () => {
  return socket.id
}

const disconnectSocket = () => {
  socket.disconnect()
}

const sendMessage = (message, recipientSocketId, recipientUserId) => {
  socket.emit('message', { message, recipientSocketId, recipientUserId })
}

const receiveMessage = () => {
  return new Promise((resolve) => {
    socket.on('chatMessage', (data) => {
      resolve(data)
    })
  })
}

export { getSocketId, disconnectSocket, sendMessage, receiveMessage }