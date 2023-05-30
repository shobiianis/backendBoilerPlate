const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const StudentRouter = require("./routes/studentRouter");
require("dotenv").config();


const app = express();
app.use(express.json())//Middleware
app.use(cors())

  
app.use("/api/student", StudentRouter);


mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Database Connected Successfully");
    });
  }).catch((err) => {
    console.log(err);
  });
