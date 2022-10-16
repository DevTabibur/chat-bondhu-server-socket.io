const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const Chat = require("./Chat");
const connectDB = require("./config/db");
const colors = require("colors")
const userRoutes = require("./Routes/userRoutes")

app.use(cors());

const server = http.createServer(app);
connectDB();


app.get("/", async (req, res) => {
  res.send("Hello world");
});

// for user authentication
app.use('/api/user' , userRoutes)

// user: chat-bondhu
// pswd: M3y5wIQPDoaCcIet


server.listen(port, () => {
  console.log(`SERVER IS RUNNING AT ${port}`.yellow.bold);
});
