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
//----------------------------------------------------------------
function deleteData(jsonID) {
  $.ajax({
    url: "http://localhost:5000" + "/delete-records",
    type: "delete",
    data: { mangaID: jsonID },
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
}

//----------------------------------------------------------------
function showTable(jsonObject) {
  var htmlString = "";
  for (var i = 0; i < jsonObject.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>" + jsonObject[i].mangaID + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaTitle + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaArtist + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaDemographic + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaMagazine + "</td>";
    htmlString += "<td>" + jsonObject[i].yearPublished + "</td>";
    htmlString += "<td>" + jsonObject[i].volumes + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaStatus + "</td>";
    htmlString += "<td>" + jsonObject[i].mangaGenre + "</td>";
    htmlString += "<td>" + jsonObject[i].rating + "</td>";
    htmlString +=
      "<td class='deleteColumn' style='display: none'> <button class='deleteRow-btn' data-id='" +
      jsonObject[i].mangaID +
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
