var topics = ["surprised","laughing","clapping","confused","happy"]
var gifSearch;
var apiKey = "dc6zaTOxFJmzC"


function createButton(buttonTopic){
    var buttonHtml = "<div data='" + buttonTopic + "' class='button'>" + buttonTopic + "</div>"
    $("#button-container").append(buttonHtml)
    
}

for(var i = 0; i < topics.length; i++){
    createButton(topics[i]);
}

$("#enter-emotion").on("click", function(){
    if($("#emot-input-box").val() === "Enter a different reaction!"){
        alert("You need to enter something first!")
        return;
    }
    createButton($("#emot-input-box").val())
})

function createImage(userInput){
    for(var i = 0; i < 10; i++){

        var imageHolder = $("<div>").attr("class", "giphy-image")
        var rating = $("<p>").text("Rating: " + userInput.data[i].rating).attr("class","image-rating")
        var img = $("<img>").attr("id", "img").attr("src", userInput.data[i].images.fixed_height_still.url).attr("paused", "true").attr("mov-url",userInput.data[i].images.fixed_height.url).attr("still-url", userInput.data[i].images.fixed_height_still.url)
       imageHolder.append(rating, img)
        $("#image-container").append(imageHolder);
    }
}

$(document).delegate(".button", "click", function(){
    $("#image-container").html("");
    gifSearch = $(this).attr("data")
    console.log(gifSearch);
    var queryUrl = ("https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=" + apiKey  + "&limit=10")
    console.log(queryUrl);
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).done(function(response){
        createImage(response)
    })
})

$(document).delegate("#img", "click", function(){
    console.log("test")
    var paused = $(this).attr("paused")
    var gif = $(this).attr("mov-url");
    var still = $(this).attr("still-url");
    if(paused === "true"){
        $(this).attr("src", gif) 
        $(this).attr("paused", "false")
    } else {
        $(this).attr("src", still)
        $(this).attr("paused", "true")
    }
    
})

$("#emot-input-box").click(function(){
    var inputVal = $(this).val()
    
    if(inputVal === "Enter a different reaction!"){
        $(this).val("")
    } else {
        return;
    } 
})

