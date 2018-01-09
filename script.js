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
        var imgUrl = userInput.data[i].images.fixed_height_still.url;
        var imgRating = userInput.data[i].rating;
        var imgHtml = ("<div class='giphy-image' image-number='" + i + "'><div class='image-rating'> Rating: " + imgRating + "</div><img id='image' image-paused='true' image-number='" + i + "' src='" + imgUrl + "'></div>") 
        $("#image-container").append(imgHtml);
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

$(document).delegate("#image", "click", function(){
    var r = $(this).attr("image-paused");
    console.log(r);
    var el = $(this)[0];
    if(r){
        console.log($(this).attr("src"))
        var imageIndex = $(this).attr("image-number")
        console.log(imageIndex)
        var imageUrl = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=" + apiKey  + "&limit=10"
        $.ajax({
            url: imageUrl,
            method: "GET",
        }).done(function(userInput){
            console.log(el)
            el.attr("src", userInput.data[imageIndex].images.fixed_height.url);
        })
        
    } 
})

