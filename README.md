# Giphy Front End

This site makes calls to the Giphy API to return gifs based on the user's query.  The querys will populate in the sidebar for future access, and users can save favorite gifs.

## Technical Description

The site starts out as a basic, effectivley blank, bootstrap grid.  When querys are typed, or clicked on, jQuery makes an asyncronous GET call to the Giphy API endpoint, which returns JSON with information of the gifs.  jQuery is then used to populate the bootstrap grid with the returned gifs.

Additional features include a favorites drawer, which will open a full-size modal of the favorite gif once clicked.  Also featured is a "pinterest mode" which displays the gifs in an unaligned columnar format instead of the default vertically aligned grid.

## Technologies Used
* Bootstrap
* jQuery
* AJAX
* JSON
* Giphy API
