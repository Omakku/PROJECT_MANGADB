main();

function main() {
  retrieveData();
}

$("#refresh").click(function () {
  location.reload();
  retrieveData();
});

$(".deleteRow-btn").click(function () {
  var idToDel = $(this).attr("data-id");
  console.log("DELETE THIS ROW: ");
  console.log(idToDel);
  deleteData(idToDel);
});

//----------------------------------------------------------------
//----------------------------------------------------------------
function retrieveData() {
  $.ajax({
    url: "http://localhost:5000" + "/get-records",
    type: "get",
    success: function (response) {
      var data = JSON.parse(response);
      if (data.msg == "SUCCESS") {
        console.log(data);
        showTable(data.manga);
      } else {
        console.log(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}
//----------------------------------------------------------------
function deleteData(jsonID) {
  $.ajax({
    url: "http://localhost:5000" + "/delete-records",
    type: "delete",
    data: { _id: jsonID },
    success: function (response) {
      var data = JSON.parse(response);
      if (data.msg == "SUCCESS") {
        alert(
          "ID: " +
            jsonID +
            " has been removed!\nPlease refresh table to confirm changes!"
        );
        console.log(data);
      } else {
        console.log(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
  location.reload();
  retrieveData();
}

//----------------------------------------------------------------
function showTable(manga) {
  var htmlString = "";
  for (var i = 0; i < manga.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>" + manga[i]._id + "</td>";
    htmlString += "<td>" + manga[i].mangaTitle + "</td>";
    htmlString += "<td>" + manga[i].mangaArtist + "</td>";
    htmlString += "<td>" + manga[i].mangaDemographic + "</td>";
    htmlString += "<td>" + manga[i].mangaMagazine + "</td>";
    htmlString += "<td>" + manga[i].yearPublished + "</td>";
    htmlString += "<td>" + manga[i].volumes + "</td>";
    htmlString += "<td>" + manga[i].mangaStatus + "</td>";
    htmlString += "<td>" + manga[i].mangaGenre + "</td>";
    htmlString += "<td>" + manga[i].rating + "</td>";
    htmlString +=
      "<td class='deleteColumn' style='display: none'> <button class='deleteRow-btn' data-id='" +
      manga[i]._id +
      "'>DELETE</button> </td>";
    htmlString += "</tr>";
  }

  $("#libraryTable").html(htmlString);

  $(".deleteRow-btn").click(function () {
    var idToDel = $(this).attr("data-id");
    deleteData(idToDel);
  });

  $("#edit").click(function () {
    const deleteRows = document.querySelectorAll(".deleteColumn");
    deleteRows.forEach((row) => {
      row.removeAttribute("style");
    });
  });
}

//----------------------------------------------------------------
//----------------------------------------------------------------
