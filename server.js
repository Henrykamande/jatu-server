require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const passport = require("passport");
const moment = require("moment");
var cors = require("cors");
// mongoose stuffs
const mongoose = require("mongoose");

const dbUrl =
  "mongodb://127.0.0.1:27017/jubilantafrofarms";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const app = express();
app.use(fileUpload());

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  return next();
});

app.use(cors());

app.set("view engine", "ejs");

//admin routes
require("./src/routes/api")(app);

app.get("*", function (req, res, next) {
  const url = req.url;
  if (url === "/api") {
    return next();
  }
  console.log(url);
  return res.render("index", {});
});
// set port
const port = process.env.PORT || "7800";
app.set("port", port);
// create a http server
const server = http.createServer(app);
const mymessage = "Running on port: " + port;
server.listen(port, () => console.log(mymessage));