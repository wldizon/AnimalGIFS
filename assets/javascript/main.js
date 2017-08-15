//initialize an empty array to store the buttons and the JSON data from Giphy
var animals = [];
var giphyData = [];
//adds a button based on the input typed in
$("#addAnimal").on("click", function(event) {
  event.preventDefault();
  var animal = $("#animal-input").val().trim();
  animals.push(animal);
  renderButtons();
});
//removes all the buttons and the images from the page
$("#clearButton").on("click", function(event) {
  event.preventDefault();
  $("#animalButtons").empty();
  $("#animals").empty();
  animals = [];
});

//line which runs the displayAnimalInfo function when the animal buttons are clicked
$(document).on("click",".animal", displayAnimalInfo);
//line which runs the animateGIF function when the images are clicked
$(document).on("click",".animalGIF", animateGIF);

//function which pulls the information from the Giphy API.
function displayAnimalInfo(){
  $("#animals").empty();
  var animal = $(this).attr("id");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=dc6zaTOxFJmzC";
  $.ajax({
    url:queryURL,
    method: "GET"
  }).done(function(response) {
    giphyData = response.data;
    for(var j=0; j < giphyData.length; j++) {
      var rating = $('<p></p>');
      rating.text("Rating: " + giphyData[j].rating);
      var picture = $('<img>');
      picture.attr("src",giphyData[j].images.fixed_height_small_still.url);
      picture.attr("id",giphyData[j].id);
      picture.attr("still","true");
      picture.addClass("animalGIF");
      $("#animals").append(rating);
      $("#animals").append(picture);
    }
  });
}
//function which makes the animated gifs play or stop
function animateGIF () {
  var gifID = $(this).attr("id");
  for (var k=0; k < giphyData.length; k++) {
    if (giphyData[k].id == gifID){
      if ($(this).attr("still") == "true"){
        $(this).append($(this).attr("src",giphyData[k].images.fixed_height_small.url));
        $(this).attr("still","false");
      }
      else if ($(this).attr("still") == "false"){
        $(this).append($(this).attr("src",giphyData[k].images.fixed_height_small_still.url));
        $(this).attr("still","true");
      }
    }
  }
}

//function which creates the buttons on the screen
function renderButtons() {
  $("#animalButtons").empty();
  for (var i=0; i < animals.length; i++) {
    var a = $("<button>");
    a.addClass("animal");
    a.attr("id", animals[i]);
    a.text(animals[i]);
    $("#animalButtons").append(a);
  }
}
