var topics = ["Funny Cats", "Birds", "Funny Dogs", "Giraffes", "Explosions"];
var favorites = [];

//Ajax Construction
function fetchGifs () {
    let gQuery = "https://api.giphy.com/v1/gifs/search?api_key=lvA12IjUg0sH1TWocJQxC1zmb2VEYq1y&q=" + event.target.innerText + "&limit=10";
    $.ajax({url: gQuery, method: "GET"}).then(populateGifs);
}

//Populate GIFs in the bootstrap grid
function oldPopulate (r) {
    $("#main-content").empty();
    for (let i=0; i<r.data.length; i++) {
        console.log(r.data[i].images.original_still.url);
        let card = "<div class='col-4 not-pinterest'><div class='card m-2'><img src='" + r.data[i].images.original.url + "' const='" + r.data[i].images.original.url + "' id='" + r.data[i].id + "' class='card-img-top play-pause' alt-src='" + r.data[i].images.original_still.url + "' smallfixed='" + r.data[i].images.fixed_height_small.url + "'><div class='card-body'><h5 class='card-title'>" + r.data[i].title + "</h5><p class='card-text'>Rating: " + r.data[i].rating + "</p></div><div class='card-footer'><a class='btn btn-outline-warning btn-sm add-favorite' parentid='" + r.data[i].id + "'><i class='far fa-star' parentid='" + r.data[i].id + "'></i></a></div></div></div>";
        $("#main-content").append(card);
    }
}

function populateGifs (r) {
    $("#main-content").empty();
    //Build Gif cards and populate using jQuery instead of the better method.
    for (let i=0; i<r.data.length; i++) {
        let $cardCol = $("<div class='col-4 not-pinterest'></div>");
        let $card = $("<div class='card m-2'></div>");
        let $cardIMG = $("<img>");
        $cardIMG.attr("src", r.data[i].images.original.url);
        $cardIMG.attr("const", r.data[i].images.original.url);
        $cardIMG.attr("id", r.data[i].id);
        $cardIMG.attr("alt-src", r.data[i].images.original_still.url);
        $cardIMG.attr("smallfixed", r.data[i].images.fixed_height_small.url);
        $cardIMG.addClass("card-img-top play-pause");
        let $cardBody = $("<div class='card-body'></div>");
        let $cardTitle = $("<h5 class='card-title'>" + r.data[i].title + "</h5>");
        let $cardText = $("<p class='card-text'>Rating: " + r.data[i].rating + "</p>");
        let $footer = $("<div class='card-footer'></div>");
        let $a = $("<a class='btn btn-outline-warning btn-sm add-favorite'></a>");
        let $download = $("<a class='btn btn-outline-success btn-sm' href='" + r.data[i].images.original.url + "' download><i class='fas fa-cloud-download-alt'></i></a>");
        $a.attr("parentid", r.data[i].id);
        let $i = $("<i class='far fa-star'></i>");
        $i.attr("parentid", r.data[i].id);
        $cardBody.append($cardTitle, $cardText);
        $a.append($i);
        $footer.append($download, $a);
        $card.append($cardIMG, $cardBody, $footer);
        $cardCol.append($card);
        $("#main-content").append($cardCol);
    }
    $("#pinterest").prop("disabled", false);
}

//Toggle "pinterest" mode.  Gifs will show up as Masonry-like columns instead of defined rows
function pinterest () {
    if ($("#pinterest").prop("checked")) {
        $("#main-content").removeClass("row").addClass("card-columns");
        $(".card").unwrap();
    }
    else {
        console.log("false");
        $("#main-content").removeClass("card-columns").addClass("row");
        $(".card").wrap("<div class='col-4'></div>");
    }
}

//Initialize topics list in sidebar
function initTopics () {
    $("#populate").empty();
    for (let i=0; i<topics.length; i++) {
        $("#populate").append("<li class='nav-item'><a class='nav-link gif-link' href='#'>" + topics[i] + "</a></li>");
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

//Remove Favorite Item
function removeMe () {
    let search = $(this).prev().attr("biggif");
    let index = favorites.map(function(x) {return x.original; }).indexOf(search);
    favorites.splice(index, 1);
    $(this).parent().remove();
    initFavorites();
}

//Initialize Favorites List
function initFavorites () {
    $("#favoritesList").empty();
    for (let i=0; i<favorites.length; i++) {
        $("#favoritesList").append("<div class='dropdown-item'><img class='fav-gif' src='" + favorites[i].small + "' biggif='" + favorites[i].original + "'><button class='btn remove-favorite'>X</button></div>");
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
    $(document).on("click", "#pinterest", pinterest);
    $(document).on("click", ".remove-favorite", removeMe);
});