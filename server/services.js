const fs = require("fs");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const dbFile = require(path.join(__dirname + "/../server/files/manga.json"));

var dbURL = "mongodb://127.0.0.1";

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

    console.log(JSON.stringify({ bookData }));
    MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        return res.status(201).send(JSON.stringify({ msg: err }));
      } else {
        var dbo = client.db("mangadb");

        dbo.collection("manga").insertOne(bookData, function (err) {
          if (err) {
            return res.status(201).send(JSON.stringify({ msg: err }));
          } else {
            console.log(bookData);
            return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
          }
        });
      }
    });
  });

  app.get("/get-records", function (req, res) {
    MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        return res.status(201).send(JSON.stringify({ msg: err }));
      } else {
        var dbo = client.db("mangadb");

        dbo
          .collection("manga")
          .find()
          .toArray(function (err, data) {
            if (err) {
              return res.status(201).send(JSON.stringify({ msg: err }));
            } else {
              console.log(data);
              return res
                .status(200)
                .send(JSON.stringify({ msg: "SUCCESS", manga: data }));
            }
          });
      }
    });
  });

  app.delete("/delete-records", function (req, res) {
    var idToDel = req.body._id;

    var s_id = new ObjectId(idToDel);
    var search = { _id: s_id };

    MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        return res.status(201).send(JSON.stringify({ msg: err }));
      } else {
        var dbo = client.db("mangadb");

        dbo.collection("manga").deleteOne(search, function (err) {
          if (err) {
            return res.status(201).send(JSON.stringify({ msg: err }));
          } else {
            return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
          }
        });
      }
    });
  });
};

//To Initialize the manga table
var initializeDatabase = function () {
  MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
    if (err) {
      console.log(err);
    } else {
      var dbo = client.db("mangadb");

      //See if the database has any records
      dbo
        .collection("manga")
        .find()
        .toArray(function (err, data) {
          if (err) {
            client.close();
            console.log(err);
          } else {
            if (data.length === 0) {
              var manga = dbFile;

              dbo.collection("manga").insertMany(manga, function (err) {
                if (err) {
                  client.close();
                  console.log(err);
                } else {
                  console.log("Added seed records");
                  client.close();
                }
              });
            } else {
              console.log("Seed record already exist");
              client.close();
            }
          }
        });
    }
  });
};

module.exports = { services, initializeDatabase };
