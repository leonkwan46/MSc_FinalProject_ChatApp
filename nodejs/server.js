import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import connectDB from "./db/config.js"
import errorHandler from "./handlers/errorHandler.js"
import routes from "./routes/index.js"

// App Config
const app = express()
app.use(cors())
app.use(bodyParser.json())
console.log("Connecting to DB...")
connectDB()

// Routes
app.use(routes)

// Error Handler, always keep this at the bottom (As it will catch any errors from the routes before)
app.use(errorHandler)

app.listen(5000, () => {
  console.log("Server started on port 5000")
})