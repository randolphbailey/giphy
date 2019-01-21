var topics = ["Funny Cats", "Birds", "Funny Dogs", "Giraffes", "Explosions"];

//Ajax Construction
function fetchGifs () {
    let gQuery = "https://api.giphy.com/v1/gifs/search?api_key=lvA12IjUg0sH1TWocJQxC1zmb2VEYq1y&q=" + event.target.innerText + "&limit=10";
    $.ajax({url: gQuery, method: "GET"}).then(populateGifs);
}

//Populate GIFs in the bootstrap grid
function populateGifs (r) {
    let j = 0;
    $(".container").empty();
    for (let i=0; i<r.data.length; i++) {
        if (i%3 == 0) {
            j++;
            $(".container").append("<div class='row' id='row"+j+"'><div class='card-deck' id='deck" + j+ "'></div>");
        }
        console.log(r.data[i].images.original_still.url);
        let card = "<div class='card m-2'><img src='" + r.data[i].images.original.url + "' id='" + r.data[i].id + "' class='card-img-top' alt-src='" + r.data[i].images.original_still.url + "'><div class='card-body'><h5 class='card-title'>" + r.data[i].title + "</h5><p class='card-text'>Rating: " + r.data[i].rating + "</p></div></div>";
        $("#deck" + j).append(card);
    }
}

//Initialize topics list in sidebar
function initTopics () {
    $("ul").empty().append("<li class='sidebar-brand'>Giphy Search</li><input type='text' id='newTopic'><br><button id='addTopicButton'>Add Topic</button>");
    for (let i=0; i<topics.length; i++) {
        $("ul").append("<li class='topic'>" + topics[i] + "</li>");
    }
}

//Adds user submitted topic to end of sidebar
function addTopic () {
    let ttext = $("#newTopic").val();
    topics.push(ttext);
    $("#newTopic").val("");
    initTopics();
}

//Play and/or pause gifs on click
function playPause(event) {
    let clicked = $("#" + event.target.id);
    let newSource = clicked.attr("alt-src");
    let oldSource = clicked.attr("src");
    clicked.attr("alt-src", oldSource).attr("src", newSource);
}

//EVENT HANDLERS
$(function() {
    initTopics();
    $(document).on("click", ".topic", fetchGifs);
    $(document).on("click", "#addTopicButton", addTopic);
    $(document).on("click", ".card-img-top", playPause);
});