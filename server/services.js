const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const dbFile = require(path.join(__dirname + "/../server/files/manga.json"));

var dbURL = "mongodb://127.0.0.1";

var services = function (app) {
  app.post("/write-record", function (req, res) {
    console.log("write record");

    var bookData = {
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
    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
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
      }
    );
  });

  app.get("/get-records", function (req, res) {
    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
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
      }
    );
  });

  app.get("/get-mangaByType", function (req, res) {
    var mangaDemographic = req.query.mangaDemographic;
    var search =
      mangaDemographic === "" ? {} : { mangaDemographic: mangaDemographic };

    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) {
          return res.status(201).send(JSON.stringify({ msg: err }));
        } else {
          var dbo = client.db("mangadb");

          dbo
            .collection("manga")
            .find(search)
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
      }
    );
  });

  app.delete("/delete-records", function (req, res) {
    var idToDel = req.query.mangaId;
    var s_id = new ObjectId(idToDel);
    var search = { _id: s_id };

    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
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
      }
    );
  });

  app.put("/update-manga", function (req, res) {
    var mangaID = req.body.mangaID;
    var mangaTitle = req.body.mangaTitle;
    var mangaArtist = req.body.mangaArtist;
    var mangaDemographic = req.body.mangaDemographic;
    var mangaMagazine = req.body.mangaMagazine;
    var yearPublished = req.body.yearPublished;
    var volumes = req.body.volumes;
    var mangaStatus = req.body.mangaStatus;
    var mangaGenre = req.body.mangaGenre;
    var rating = req.body.rating;

    var s_id = new ObjectId(mangaID);

    var search = { _id: s_id };

    var updateData = {
      $set: {
        mangaTitle: mangaTitle,
        mangaArtist: mangaArtist,
        mangaDemographic: mangaDemographic,
        mangaMagazine: mangaMagazine,
        yearPublished: yearPublished,
        volumes: volumes,
        mangaStatus: mangaStatus,
        mangaGenre: mangaGenre,
        rating: rating,
      },
    };

    MongoClient.connect(
      dbURL,
      { useUnifiedTopology: true },
      function (err, client) {
        if (err) {
          return res.status(201).send(JSON.stringify({ msg: err }));
        } else {
          var dbo = client.db("mangadb");

          dbo.collection("manga").updateOne(search, updateData, function (err) {
            if (err) {
              return res.status(201).send(JSON.stringify({ msg: err }));
            } else {
              console.log("SEARCH" + JSON.stringify(search));
              console.log("UPDATEDATA: " + JSON.stringify(updateData));
              return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
            }
          });
        }
      }
    );
  });
};

//To Initialize the manga table
var initializeDatabase = function () {
  MongoClient.connect(
    dbURL,
    { useUnifiedTopology: true },
    function (err, client) {
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
    }
  );
};

module.exports = { services, initializeDatabase };
