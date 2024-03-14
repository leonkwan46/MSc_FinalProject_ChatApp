import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')

const getSocketId = () => {
  return socket.id
}

const disconnectSocket = async () => {
  await socket.disconnect()
}

const sendMessage = async (roomId, message, userId) => {
  await socket.emit('sendMessage', { roomId, message, userId })
}

const receiveMessage = () => {
  return new Promise((resolve) => {
    socket.on('chatMessage', (res) => {
      resolve(res.data)
    })
  })
}

const joinRoomAndGetChatHistory = (roomId) => {
  return new Promise((resolve, reject) => {
      socket.emit('joinRoom', { roomId })
      socket.once('roomJoined', (result) => {
          resolve(result.chatHistory)
      })
      socket.once('roomJoinError', (error) => {
          reject(error)
      })
  })
}

export { getSocketId, disconnectSocket, sendMessage, receiveMessage, joinRoomAndGetChatHistory }