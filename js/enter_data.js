const buttonListener = document.getElementById("submit");
buttonListener.addEventListener("click", function () {
  var inputID = $("#input1").val();
  var inputTitle = $("#input2").val();
  var inputArtist = $("#input3").val();
  var inputDemographic = $("#input4").val();
  var inputMagazine = $("#input5").val();
  var inputYear_Published = $("#input6").val();
  var inputVolumes = $("#input7").val();
  var inputStatus = $("#input8").val();
  var inputGenre = $("#input9").val();
  var inputRating = $("#input10").val();

  console.log(input1);
  console.log(input2);
  console.log(input3);
  console.log(input4);
  console.log(input5);
  console.log(input6);
  console.log(input7);
  console.log(input8);
  console.log(input9);
  console.log(input10);

  alert("SUBMIT WAS PRESSED, NICE!");

  return false;
});

$("#clear").click(function () {
  $("#input1").val("");
  $("#input2").val("");
  $("#input3").val("");
  $("#input4").val("");
  $("#input5").val("");
  $("#input6").val("");
  $("#input7").val("");
  $("#input8").val("");
  $("#input9").val("");
  $("#input10").val("");
});
