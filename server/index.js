const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//* Load config
require("dotenv").config({ path: "./.env" });

app.use(cors());
app.use(express.json());

//* Routes
app.use("/api/auth", require("./routes/userRoutes"));

//* DB
mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("DB Connection Successfull"))
   .catch((err) => console.log(err.message));

app.listen(process.env.PORT, () =>
   console.log(`Server Started on Port ${process.env.PORT}`)
);
