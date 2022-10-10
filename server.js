const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const id = socket.id;

  console.log(`User Connected: ${socket.id}`);


  socket.on("disconnect", function () {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.get("/", async (req, res) => {
  res.send("Hello world");
});

// user: chat-bondhu
// pswd: M3y5wIQPDoaCcIet

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hc4xz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("chat-bondhu").collection("users");

    app.get("/users", async (req, res) => {
      const result = await userCollection.find({}).toArray();
      res.send(result);
    });

  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

server.listen(port, () => {
  console.log(`SERVER IS RUNNING AT ${port}`);
});
