import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import connectDB from "./db/config.js";

// App Config
const app = express();
app.use(cors());
app.use(bodyParser.json());
connectDB();

// Routes
import loginRoute from "./routes/login.js";
app.use("/login", loginRoute);








app.listen(5000, () => {
  console.log("Server started on port 5000");
});