const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//* Swagger
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const options = require("./utils/swaggerOptions");
const spacs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs));

//* Load config
require("dotenv").config({ path: "./.env" });

app.use(cors());

//* middleware
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
