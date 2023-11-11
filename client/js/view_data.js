function main() {
  retrieveData();
}

function retrieveData() {
  $.ajax({
    url: "http://localhost:5000" + "/get-records",
    type: "get",
    success: function (response) {
      var data = JSON.parse(response);
      console.log(response)
      console.log(data)
      if (data.msg == "SUCCESS") {
        showTable(data.jsonObject);
      } else {
        console.log(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function showTable(jsonObject) {
  var htmlString = "";
  for (var i = 0; i < jsonObject.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>" + jsonObject[i].ID + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaTitle + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaArtist + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaDemographic + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaMagazine + "</td>";
    htmlString += "<td>" + jsonObject[i].yearPublished + "</td>";
    htmlString += "<td>" + jsonObject[i].volumes + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaStatus + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaGenre + "</td>";
    htmlString += "<td>" + jsonObject[i].rating + "</td>";
    htmlString += "</tr>";
  }

  $("#libraryTable").html(htmlString);
}

$("#refresh").click(function () {
 /* var newBook = {
    ID: "008",
    mangaTitle: "Test title",
    mangaArtist: "Test author",
    mangaDemographic: "Test demo",
    mangaMagazine: "Test magazine",
    yearPublished: "Test yearPub",
    volumes: "# volumes",
    mangaStatus: "Test status",
    mangaGenre: "Test genre",
    rating: "Test rating",
  };

  jsonObject.push(newBook);

  var anotherBook = {};
  anotherBook.ID = "009";
  anotherBook.mangaTitle = "Test title";
  anotherBook.mangaArtist = "Test author";
  anotherBook.mangaDemographic = "Test demo";
  anotherBook.mangaMagazine = "Test magazine";
  anotherBook.yearPublished = "Test yearPub";
  anotherBook.volumes = "# volumes";
  anotherBook.mangaStatus = "Test status";
  anotherBook.mangaGenre = "Test genre";
  anotherBook.rating = "Test rating";

  jsonObject.push(anotherBook);*/
});

main();