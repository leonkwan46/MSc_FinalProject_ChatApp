import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import connectDB from "./db/config.js"
import errorHandler from "./handlers/errorHandler.js"
import routes from "./routes/index.js"
import { Server } from "socket.io"
import { createServer } from "http"

// App Config
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())

// DB Conection
console.log("Connecting to DB...")
connectDB()

// Socket.io
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`)
})

// Routes
app.use(routes)

// Error Handler, always keep this at the bottom (As it will catch any errors from the routes before)
app.use(errorHandler)

app.listen(5000, () => {
  console.log("Server started on port 5000")
})