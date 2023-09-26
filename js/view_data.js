var jsonObject;

$.getJSON("/data.json", function (data) {
  jsonObject = data;
  main();
});

function main() {
  console.log(jsonObject);

  showTable();
}

function showTable() {
  var htmlString = "";
  for (var i = 0; i < jsonObject.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>" + jsonObject[i].ID + "</td>";
    htmlString += "<td>" + jsonObject[i].bookTitle + "</td>";
    htmlString += "<td>" + jsonObject[i].author + "</td>";
    htmlString += "<td>" + jsonObject[i].demographic + "</td>";
    htmlString += "<td>" + jsonObject[i].magazine + "</td>";
    htmlString += "<td>" + jsonObject[i].yearPublished + "</td>";
    htmlString += "<td>" + jsonObject[i].volumes + "</td>";
    htmlString += "<td>" + jsonObject[i].status + "</td>";
    htmlString += "<td>" + jsonObject[i].genre + "</td>";
    htmlString += "<td>" + jsonObject[i].rating + "</td>";
    htmlString += "</tr>";
  }

  $("#libraryTable").html(htmlString);
}

$("#refresh").click(function () {
  var newBook = {
    ID: "008",
    bookTitle: "Test title",
    author: "Test author",
    demographic: "Test demo",
    magazine: "Test magazine",
    yearPublished: "Test yearPub",
    volumes: "# volumes",
    status: "Test status",
    genre: "Test genre",
    rating: "Test rating",
  };

  jsonObject.push(newBook);

  var anotherBook = {};
  anotherBook.ID = "009";
  anotherBook.bookTitle = "Test title";
  anotherBook.author = "Test author";
  anotherBook.demographic = "Test demo";
  anotherBook.magazine = "Test magazine";
  anotherBook.yearPublished = "Test yearPub";
  anotherBook.volumes = "# volumes";
  anotherBook.status = "Test status";
  anotherBook.genre = "Test genre";
  anotherBook.rating = "Test rating";

  jsonObject.push(anotherBook);

  showTable();
});
