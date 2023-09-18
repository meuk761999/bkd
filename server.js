const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
var logger = require("morgan");
var http = require("http").Server(app);

const cookieParser = require("cookie-parser");
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(logger("dev"));


// Database connection start
mongoose
  .connect(
    "mongodb+srv://easyhaionline:DFAjWJ1vLrNDr2ul@cluster0.moljno4.mongodb.net/easyhaionline?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 100000,
    }
  )
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });
// Database connection end


// Routes start
app.use("/api/v1/modules", require("./Modules"));

// Routes end

app.get("/", (req, res) => {
  res.send("Server is Ok!...");
});

http.listen("7000", () => {
  console.log("Server is running at http://localhost:7000");
});

