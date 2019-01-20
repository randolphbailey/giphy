var topics = ["Funny Cats", "Birds", "Funny Dogs", "Giraffes", "Explosions"];


//Ajax Construction
function fetchGifs () {
    let gQuery = "https://api.giphy.com/v1/gifs/search?api_key=lvA12IjUg0sH1TWocJQxC1zmb2VEYq1y&q=" + event.target.innerText + "&limit=10";
    $.ajax({url: gQuery, method: "GET"}).then(populateGifs);
}

//Populate GIFs in the bootstrap grid via AJAX
function populateGifs (r) {
    let j = 0;
    $(".container").empty();
    for (let i=0; i<r.data.length; i++) {
        if (i%3 == 0) {
            j++;
            $(".container").append("<div class='row' id='row"+j+"'><div class='card-deck' id='deck" + j+ "'></div>");
        }
        let card = "<div class='card m-2'><img src='" + r.data[i].images.original.url + "' class='card-img-top imr' alt=''><div class='card-body'><h5 class='card-title'>" + r.data[i].title + "</h5><p class='card-text'>Rating: " + r.data[i].rating + "</p></div></div>";
        $("#deck" + j).append(card);
    }
}

//Initialize topics list in sidebar
function initTopics () {
    $("ul").empty().append("<li class='sidebar-brand'>Giphy Search</li>")
                    .append("<input type='text' id='newTopic'><br>")
                    .append("<button id='addTopicButton'>Add Topic</button>");
    for (let i=0; i<topics.length; i++) {
        $("ul").append("<li class='topic'>" + topics[i] + "</li>");
    }
}

function addTopic () {
    let ttext = $("#newTopic").val();
    $("#newTopic").val("");
    topics.push(ttext);
    console.log(ttext);
    initTopics();
}


/*
PAGE LOAD EVENT HANDLERS
*/
$(function() {
    initTopics();
    $(document).on("click", ".topic", fetchGifs);
    $(document).on("click", "#addTopicButton", addTopic);
});