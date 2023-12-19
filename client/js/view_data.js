var app = angular.module("viewMangaApp", []);
app.controller("viewMangaCtrl", function ($scope, $http) {
  $scope.manga = [];

  //----------------------------------------------------------------
  //----------------------------------------------------------------
  $scope.get_records = function () {
    $http({
      method: "get",
      url: "http://localhost:5000" + "/get-records",
    }).then(
      function (response) {
        if (response.data.msg === "SUCCESS") {
          $scope.manga = response.data.manga;
          $scope.types = getTypes(response.data.manga);
          $scope.selectedType = $scope.types[0];
        } else {
          console.log(response.data.msg);
        }
      },
      function (response) {
        console.log(JSON.stringify(response));
      }
    );
  };
  $scope.get_records();

  $scope.redrawTable = function () {
    var type = $scope.selectedType.value;

    $http({
      method: "get",
      url: "http://localhost:5000" + "/get-mangaByType",
      params: { mangaDemographic: type },
    }).then(
      function (response) {
        if (response.data.msg === "SUCCESS") {
          $scope.manga = response.data.manga;
        }
      },
      function (response) {
        console.log(response);
      }
    );
  };

  $scope.editManga = function (mangaNumber) {
    $scope.mangaTitle = $scope.manga[mangaNumber].mangaTitle;
    $scope.mangaArtist = $scope.manga[mangaNumber].mangaArtist;
    $scope.mangaDemographic = $scope.manga[mangaNumber].mangaDemographic;
    $scope.mangaMagazine = $scope.manga[mangaNumber].mangaMagazine;
    $scope.yearPublished = $scope.manga[mangaNumber].yearPublished;
    $scope.volumes = $scope.manga[mangaNumber].volumes;
    $scope.mangaStatus = $scope.manga[mangaNumber].mangaStatus;
    $scope.mangaGenre = $scope.manga[mangaNumber].mangaGenre;
    $scope.rating = $scope.manga[mangaNumber].rating;
    $scope.mangaID = $scope.manga[mangaNumber]["_id"];

    $scope.hideTable = true;
    $scope.hideForm = false;
  };

  $scope.cancelUpdate = function () {
    $scope.hideTable = false;
    $scope.hideForm = true;
  };

  //----------------------------------------------------------------
  $scope.deleteData = function (jsonId) {
    $http({
      method: "delete",
      url: "http://localhost:5000" + "/delete-records",
      params: { mangaId: jsonId },
    }).then(
      function (response) {
        console.log(response);
        if (response.data.msg === "SUCCESS") {
          $scope.redrawTable();
        } else {
          console.log(response.data.msg);
        }
      },
      function (response) {
        console.log(response);
      }
    );
  };

  //----------------------------------------------------------------
  $scope.updateManga = function () {
    if (
      $scope.mangaTitle === "" ||
      $scope.mangaArtist === "" ||
      $scope.mangaDemographic === "" ||
      $scope.mangaMagazine === "" ||
      $scope.yearPublished === "" ||
      $scope.volumes === "" ||
      $scope.mangaStatus === "" ||
      $scope.mangaGenre === "" ||
      $scope.rating === ""
    ) {
      $scope.addResults = "All Fields are required!";
      return;
    }

    $http({
      method: "put",
      url: "http://localhost:5000" + "/update-manga",
      data: {
        mangaID: $scope.mangaID,
        mangaTitle: $scope.mangaTitle,
        mangaArtist: $scope.mangaArtist,
        mangaDemographic: $scope.mangaDemographic,
        mangaMagazine: $scope.mangaMagazine,
        yearPublished: $scope.yearPublished,
        volumes: $scope.volumes,
        mangaStatus: $scope.mangaStatus,
        mangaGenre: $scope.mangaGenre,
        rating: $scope.rating,
      },
    }).then(
      function (response) {
        console.log(response);
        if (response.data.msg === "SUCCESS") {
          $scope.cancelUpdate();
          $scope.get_records();

          $scope.mangaTitle = "";
          $scope.mangaArtist = "";
          $scope.mangaDemographic = "";
          $scope.mangaMagazine = "";
          $scope.yearPublished = "";
          $scope.volumes = "";
          $scope.mangaStatus = "";
          $scope.mangaGenre = "";
          $scope.rating = "";
        }
      },
      function (response) {
        console.log(response);
      }
    );
  };
});

//----------------------------------------------------------------

function getTypes(mangaTableData) {
  var typeExists;

  typesArray = [{ value: "", display: "ALL" }];

  for (var i = 0; i < mangaTableData.length; i++) {
    typeExists = typesArray.find(function (element) {
      return element.value === mangaTableData[i].mangaDemographic;
    });

    if (typeExists) {
      continue;
    } else {
      typesArray.push({
        value: mangaTableData[i].mangaDemographic,
        display: mangaTableData[i].mangaDemographic.toUpperCase(),
      });
    }
  }
  return typesArray;
}

//----------------------------------------------------------------
//----------------------------------------------------------------
