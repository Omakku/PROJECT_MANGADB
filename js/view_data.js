var jsonObject

$.getJSON("/data.json", function(data) {
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
    ID: "somevalue",
    author: "Sir Kevin Squires the Great",
    bookTitle: "Amazin!",
    isbn: "123123",
    publisher: "ur mom",
    yearPublished: "1812",
  };

  jsonObject.push(newBook);

  var anotherBook = {};
  anotherBook.ID = "94";
  anotherBook.author = "Luis The Alright";
  anotherBook.bookTitle = "Hello Joe";
  anotherBook.isbn = "34566666655555";
  anotherBook.publisher = "Gojo";
  anotherBook.yearPublished = "1999";

  jsonObject.push(anotherBook);

  showTable();
});