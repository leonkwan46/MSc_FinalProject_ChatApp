import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')

const sendMessage = (message) => {
  socket.emit('message', message)
}

export { sendMessage }