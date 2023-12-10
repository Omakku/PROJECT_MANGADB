const fs = require("fs");
const path = require("path");

const DATABASE_FILE = path.join(__dirname + "/../server/files/data.txt");

var services = function (app) {
  app.post("/write-record", function (req, res) {
    console.log("write record");
    var mangaID = Date.now();

    var bookData = {
      mangaID: mangaID,
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
          res.send(JSON.stringify({ msg: "SUCCESS", jsonObject: jsonObject }));
        }
      });
    } else {
      var data = [];
      res.send(JSON.stringify({ msg: "SUCCESS", jsonObject: data }));
    }
  });

  app.delete("/delete-records", function (req, res) {
    var idToDel = Number(req.body.mangaID);
    if (fs.existsSync(DATABASE_FILE)) {
      fs.readFile(DATABASE_FILE, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          data = JSON.parse(data);
          const filteredData = data.filter((manga) => {
            const mangaId = manga.mangaID;
            return mangaId !== idToDel;
          });

          let newTable = JSON.stringify(filteredData);
          res.send(JSON.stringify({ msg: "SUCCESS", data: filteredData }));

          fs.writeFile(DATABASE_FILE, newTable, "utf8", (err) => {
            if (err) {
              console.error("Error writing to the file:", err);
            } else {
              console.log(
                "Manga with mangaID",
                idToDel,
                "removed successfully."
              );
            }
          });
        }
      });
    }
  });
};

module.exports = services;
