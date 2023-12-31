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

const joinRoom = async(room) => {
  await socket.emit('joinRoom', room)
  await socket.on('roomJoined', (data) => {
    console.log('JOIN LIAO LAH - ', data)
  })
}

export { getSocketId, disconnectSocket, sendMessage, receiveMessage, joinRoom }