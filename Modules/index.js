const express = require("express");
const Router = express.Router();
Router.use("/blogs", require('./blogs'))
module.exports = Router;
