var manga = [];
var activeManga = 0;

var app = angular.module("browseMangaApp", []);

app.controller("browseMangaCtrl", function ($scope, $http) {
  $scope.obj = {};
  $scope.get_records = function () {
    $http({
      method: "get",
      url: "http://localhost:5000" + "/get-records",
    }).then(
      function (response) {
        if (response.data.msg === "SUCCESS") {
          manga = response.data.manga;
          console.log(response);
          $scope.obj = manga[activeManga];
          $scope.showHide();
        } else {
          console.log(response.data.msg);
        }
      },
      function (response) {
        console.log(response);
      }
    );
  };

  $scope.get_records();

  $scope.changeManga = function (direction) {
    activeManga += direction;
    $scope.obj = manga[activeManga];
    $scope.showHide();
    console.log(($scope.obj = manga[activeManga]));
  };

  $scope.showHide = function () {
    $scope.hidePrev = activeManga === 0 ? true : false;
    $scope.hideNext = activeManga === manga.length - 1 ? true : false;
  };
});
