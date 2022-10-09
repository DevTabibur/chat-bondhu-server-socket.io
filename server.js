// const express = require("express");
// const app = express();
// const http = require("http");
// const expressServer = http.createServer(app);

// const cors = require("cors");
// app.use(cors());
// const { Server } = require("socket.io");

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// app.get("/", async function (req, res) {
//   res.send("This is backend");
// });

// io.on("connection", function (socket) {
//   console.log("New user is connected");

//   // user disconnected
//   socket.on("disconnect", function () {
//     console.log("User is disconnected");
//   });
// });

// expressServer.listen(port, function (req, res) {
//   console.log("server is running on port 5000");
// });


const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

  socket.on("disconnect", function(){
    console.log('user is disconnected')
  })
});

app.get("/", async (req, res)=>{
    res.send("Hello world")
})
server.listen(port, () => {
  console.log(`SERVER IS RUNNING AT ${port}`);
});