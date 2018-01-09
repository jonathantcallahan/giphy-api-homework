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

$(".button").on("click", function(){
    console.log($(this).attr("data"))
})