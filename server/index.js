const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Connecting to MongoDB using Mongoose
mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true, // Using new URL parser
      useUnifiedTopology: true, // Using unified topology
   })
   .then(() => {
      // If the connection is successful, logging a success message
      console.log("DB Connection Successful");
   })
   .catch((err) => {
      // If an error occurs during the connection, logging the error message
      console.log(err.message);
   });

//* Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
   console.log(`Server started on ${process.env.PORT}`)
);

// Creating a Socket.IO instance and attaching it to the server with specific configurations
const io = socket(server, {
   cors: {
      origin: "http://localhost:3000",
      // Allowing credentials such as cookies, authorization headers to be sent with the cross-origin request
      credentials: true,
   },
});

// Manage online users (storage of key-value)
global.onlineUsers = new Map();

io.on("connection", (socket) => {
   // if user is online => create a new global socket
   global.chatSocket = socket;

   // if add new user => user ID and socket ID are stored in the onlineUsers array
   socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
   });

   // send message from A to B
   socket.on("send-msg", (data) => {
      // data = { to: '6525858cdfe126b9ca8b0f2d', from: '652585dddfe126b9ca8b0f42',  msg: 'message' }

      // Get socket ID receiving user
      const sendUserSocket = onlineUsers.get(data.to);

      if (sendUserSocket) {
         // If user is online => message sent to receiving user
         socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
   });
});
