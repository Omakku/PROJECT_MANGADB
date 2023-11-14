$("#submit").click(function () {
  console.log("I was clicked <submit button>");
  //-------------
  var mangaTitle = $("#mangaTitle").val();
  var mangaArtist = $("#mangaArtist").val();
  var mangaDemographic = $("#mangaDemographic").val();
  var mangaMagazine = $("#mangaMagazine").val();
  var yearPublished = $("#yearPublished").val();
  var volumes = $("#volumes").val();
  var mangaStatus = $("#mangaStatus").val();
  var mangaGenre = $("#mangaGenre").val();
  var rating = $("#rating").val();

  var jsonObject = {
    mangaTitle: mangaTitle,
    mangaArtist: mangaArtist,
    mangaDemographic: mangaDemographic,
    mangaMagazine: mangaMagazine,
    yearPublished: yearPublished,
    volumes: volumes,
    mangaStatus: mangaStatus,
    mangaGenre: mangaGenre,
    rating: rating,
  };

  $.ajax({
    url: "http://localhost:5000" + "/write-record",
    type: "post",
    data: jsonObject,
    success: function (response) {
      console.log("inside success")
      var data = JSON.parse(response);
      if (data.msg == "SUCCESS") {
        alert("Data successfully saved!");
      } else {
        console.log(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
});

$("#clear").click(function () {
  $("#mangaID").val("");
  $("#mangaTitle").val("");
  $("#mangaArtist").val("");
  $("#mangaDemographic").val("");
  $("#mangaMagazine").val("");
  $("#yearPublished").val("");
  $("#volumes").val("");
  $("#mangaStatus").val("");
  $("#mangaGenre").val("");
  $("#rating").val("");
});
