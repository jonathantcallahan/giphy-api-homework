var topics = ["surprised","laughing","clapping","confused","happy"]

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
        var imgUrl = userInput.data[i].images.fixed_width.url;
        var imgRating = userInput.data[i].rating;
        var imgHtml = ("<div class='giphy-image'><div class='image-rating'>" + imgRating + "</div><img src='" + imgUrl + "'></div>") 
        $("#image-container").append(imgHtml);
    }
}

$(".button").on("click", function(){
    $("#image-container").html("");
    var gifSearch = $(this).attr("data")
    console.log(gifSearch);
    var apiKey = "dc6zaTOxFJmzC"
    var queryUrl = ("https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=" + apiKey  + "&limit=10")
    console.log(queryUrl);
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).done(function(response){
        createImage(response)
    })
})

