const path = require("path");

var router = function (app) {
  app.get("/", function (req, res) {
    res
      .status(200)
      .sendFile(path.join(__dirname + "/../client/manga_homepage.html"));
  });

  app.get("/manga_homepage", function (req, res) {
    res
      .status(200)
      .sendFile(path.join(__dirname + "/../client/manga_homepage.html"));
  });

  app.get("/browse_data", function (req, res) {
    res
      .status(200)
      .sendFile(path.join(__dirname + "/../client/browse_data.html"));
  });

  app.get("/view_data", function (req, res) {
    res
      .status(200)
      .sendFile(path.join(__dirname + "/../client/view_data.html"));
  });

  app.get("/enter_data", function (req, res) {
    res
      .status(200)
      .sendFile(path.join(__dirname + "/../client/enter_data.html"));
  });
};

module.exports = router;
