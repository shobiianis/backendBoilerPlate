const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();
app.use(express.json());



mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Database Connected Successfully");
    });
  }).catch((err) => {
    console.log(err);
  });
