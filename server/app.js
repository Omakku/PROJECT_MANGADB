const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

//Server initialize
var server;
var port = 5000;

//page ears (router file)

//service listenas
var router = require("./router.js");
router(app);

var services = require("./services.js");
services(app);

//start server
server = app.listen(port, function (err) {
  if (err) throw err;
  else {
    console.log("Listening on port: " + port);
  }
});
