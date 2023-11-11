const fs = require("fs");
const path = require("path");

const DATABASE_FILE = path.join(__dirname + "/../server/files/data.txt");

var services = function (app) {
  app.post("/write-record", function (req, res) {
    console.log("write record");
    var id = Date.now();

    var bookData = {
      ID: id,
      mangaTitle: req.body.mangaTitle,
      mangaArtist: req.body.mangaArtist,
      mangaDemographic: req.body.mangaDemographic,
      mangaMagazine: req.body.mangaMagazine,
      yearPublished: req.body.yearPublished,
      volumes: req.body.volumes,
      mangaStatus: req.body.mangaStatus,
      mangaGenre: req.body.mangaGenre,
      rating: req.body.rating,
    };

    var jsonObject = [];

    if (fs.existsSync(DATABASE_FILE)) {
      fs.readFile(DATABASE_FILE, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          jsonObject = JSON.parse(data);

          jsonObject.push(bookData);

          fs.writeFile(
            DATABASE_FILE,
            JSON.stringify(jsonObject),
            function (err) {
              if (err) {
                res.send(JSON.stringify({ msg: err }));
              } else {
                res.send(JSON.stringify({ msg: "SUCCESS" }));
              }
            }
          );
        }
      });
    } else {
      jsonObject.push(bookData);

      fs.writeFile(DATABASE_FILE, JSON.stringify(jsonObject), function (err) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          res.send(JSON.stringify({ msg: "SUCCESS" }));
        }
      });
    }
  });

  app.get("/get-records", function (req, res) {
    if (fs.existsSync(DATABASE_FILE)) {
      fs.readFile(DATABASE_FILE, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          jsonObject = JSON.parse(data);
          res.send(
            JSON.stringify({ msg: "SUCCESS", jsonObject: jsonObject })
          );
        }
      });
    } else {
      var data = [];
      res.send(JSON.stringify({ msg: "SUCCESS", jsonObject: data }));
    }
  });
};

module.exports = services;
