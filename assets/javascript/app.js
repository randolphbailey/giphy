var topics = ["Funny Cats", "Birds", "Funny Dogs"];


//Ajax Construction
function fetchGifs () {
    let gQuery = "http://api.giphy.com/v1/gifs/search?api_key=lvA12IjUg0sH1TWocJQxC1zmb2VEYq1y&q=" + event.target.innerText + "&limit=10";
    $.ajax({url: gQuery, method: "GET"}).then(populateGifs);
}

//Populate GIFs in the bootstrap grid via AJAX
function populateGifs (r) {
    let j = 0;
    $(".container-fluid").empty();
    for (let i=0; i<r.data.length; i++) {
        if (i%3 == 0) {
            j++;
            $(".container-fluid").append("<div class='row' id='row"+j+"'></div>");
        }
        $("#row" + j).append("<div class='col-4'><img src='" + r.data[i].images.fixed_width.url + "'></div>");
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