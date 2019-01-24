var topics = ["Funny Cats", "Birds", "Funny Dogs", "Giraffes", "Explosions"];
var favorites = [];

//Ajax Construction
function fetchGifs () {
    let gQuery = "https://api.giphy.com/v1/gifs/search?api_key=lvA12IjUg0sH1TWocJQxC1zmb2VEYq1y&q=" + event.target.innerText + "&limit=10";
    $.ajax({url: gQuery, method: "GET"}).then(populateGifs);
}

//Populate GIFs in the bootstrap grid
function populateGifs (r) {
    let j = 0;
    $("#main-content").empty();
    for (let i=0; i<r.data.length; i++) {
        if (i%3 == 0) {
            j++;
            $("#main-content").append("<div class='row' id='row"+j+"'><div class='card-deck' id='deck" + j+ "'></div>");
        }
        console.log(r.data[i].images.original_still.url);
        let card = "<div class='card m-2'><img src='" + r.data[i].images.original.url + "' const='" + r.data[i].images.original.url + "' id='" + r.data[i].id + "' class='card-img-top play-pause' alt-src='" + r.data[i].images.original_still.url + "' smallfixed='" + r.data[i].images.fixed_height_small.url + "'><div class='card-body'><h5 class='card-title'>" + r.data[i].title + "</h5><p class='card-text'>Rating: " + r.data[i].rating + "</p></div><div class='card-footer'><a class='btn btn-outline-warning btn-sm add-favorite' parentid='" + r.data[i].id + "'><i class='far fa-star' parentid='" + r.data[i].id + "'></i></a></div></div>";
        //console.log(card);
        $("#deck" + j).append(card);
    }
}

//Initialize topics list in sidebar
function initTopics () {
    $("#populate").empty();
    for (let i=0; i<topics.length; i++) {
        $("#populate").append("<li class='nav-item mt-1 mb-1'><a class='nav-link gif-link'>" + topics[i] + "</a></li>");
    }
}

//Adds user submitted topic to end of sidebar
function addTopic () {
    let ttext = $("#newTopic").val();
    topics.push(ttext);
    $("#newTopic").val("");
    initTopics();
}

//Add gif to favorites dropup
function addFavorite (event) {
    let parentID = $(event.target).attr("parentid");
    let constURL = $("#" + parentID).attr("const");
    let smallGif = $("#" + parentID).attr("smallfixed");
    let newFav = {original: constURL, small: smallGif};
    favorites.push(newFav);
    initFavorites();
}

//Initialize Favorites List
function initFavorites () {
    $("#favoritesList").empty();
    for (let i=0; i<favorites.length; i++) {
        $("#favoritesList").append("<img class='dropdown-item fav-gif' src='" + favorites[i].small + "' biggif='" + favorites[i].original + "'>");
    }
    $("#favoritesBadge").text(favorites.length);
}

//Play and/or pause gifs on click
function playPause(event) {
    let clicked = $(event.target);
    let newSource = clicked.attr("alt-src");
    let oldSource = clicked.attr("src");
    clicked.attr("alt-src", oldSource).attr("src", newSource);
}

//Popup for favorite gifs
function showModal(event) {
    let clicked = $(event.target);
    let modalSrc = clicked.attr("biggif");
    $("#modal-img").attr("src", modalSrc);
    $("#favoritesModal").modal("show");
}

//EVENT HANDLERS
$(function() {
    initTopics();
    $(document).on("click", ".gif-link", function() { $("li, a").removeClass("active"); $(this).addClass("active"); fetchGifs(); });
    $(document).on("click", "#addTopicButton", addTopic);
    $(document).on("click", ".play-pause", playPause);
    $(document).on("click", ".add-favorite", addFavorite);
    $(document).on("click", ".fav-gif", showModal);
});