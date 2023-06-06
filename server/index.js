const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//* Swagger
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Chat Express API with Swagger",
         version: "1.0.0",
         description: "",
         contact: {
            name: "Possibility of user registration and login, Ability to send messages to users",
            url: "arif.com",
            email: "info@gmail.com",
         },
      },
      servers: [
         {
            url: "http://localhost:5000/",
         },
      ],
   },
   // path to the API docs
   apis: ["./api/*.yaml"],
};
// initialize swagger-jsdoc
const spacs = swaggerjsdoc(options);
// use swagger-Ui-express for your app documentation endpoint
app.use("/docs", swaggerui.serve, swaggerui.setup(spacs));

//* Load config
require("dotenv").config({ path: "./.env" });

app.use(cors());

//* middleware
app.use(express.json());

//* Routes
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messagesRoute"));

//* DB
mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("DB Connection Successfull"))
   .catch((err) => console.log(err.message));

const server = app.listen(process.env.PORT, () =>
   console.log(`Server Started on Port ${process.env.PORT}`)
);

//* Socket.io
const socket = require("socket.io");
const io = socket(server, {
   cors: {
      origin: "https://localhost:3000",
      credentials: true,
   },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
   global.chatSocket = socket;
   socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
   });

   socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      sendUserSocket && socket.to(sendUserSocket).emit("msg-recieve", data.msg);
   });
});
