// ombd api documentation is available here:
// http://www.omdbapi.com/

/**
 * app.getMovieById
 * @param id    - omdb id of the movie you're searching for
 */
app.getMovieById = function getMovieById(id) {

  // set api search options to pass to the calling function
  dataSpecs = {
    i: id,
    apikey: 'd31f1a94',
    plot: 'full',
    r: 'json'
  };

  // api (omdb) call with the specs
  omdbCall(dataSpecs);
}



/**
 * app.getMovieByTitle
 * @param title     - title of the movie you're searching for
 */
app.getMovieByTitle = function getMovieByTitle(title) {

  // set api search options to pass to the calling function
  dataSpecs = {
    t: title,
    apikey: 'd31f1a94',
    plot: 'full',
    r: 'json'
  };

  // api (omdb) call with the specs
  omdbCall(dataSpecs);

}



/**
 * app.MovieModel
 * movie model constructor
 * @param options  - options object
 */
app.MovieModel = function MovieModel(options) {
  // storing items into the model for later use
  this.id = options.id;
  this.title = options.title;
  this.rating = options.rating;
  this.director = options.director;
  this.plot = options.plot;
  this.year = options.year;
  this.genre = options.genre;
  this.poster = options.poster;
}



/**
 * app.MovieView
 * movie view constructor
 * @param options  - options object
 */
app.MovieView = function MovieView(options) {
  console.log("app.MovieView has been called");
  // rendering function to display the information
  this.render = function() {
    console.log("app.MovieView.render has been called");
    // apparently not all movies have posters! default to the logo
    if (options.poster == "N/A") options.poster = "bootflix-logo.png";
    // $('#movie-listing').html(""); // clear out the view
    $('#movie-listing').append('<div class="movie"/>');
    // v-- This is a test to see if it would work properly...it does
    $('.movie:last').html(
      "<table>" +
        "<tr>" +
          "<td>" +
            "<img src='" + options.poster + "' alt='" + options.title + "'>" +
          "</td>" +
          "<td>" +
            "<h3>" + options.title + "</h3><h6><em>ID: " + options.id + "</em></h6>" +
            "<p>" +
            "<strong>Released:</strong>" + options.year + "<br>" +
            "<strong>Directed By:</strong>" + options.director + "<br>" +
            "<strong>Genre:</strong><em>" + options.genre + "</em><br>" +
            "<strong>Rating:</strong><em>" + options.rating + "</em>" +
            "</p><strong>Plot:</strong>" +
            "<p>" + options.plot + "</p>" +
          "</td>" +
        "</tr>" +
      "</table>"
    );
  }
}


/**
 * trying to make it more DRY
 * a function for the omdb call that takes in the search parameters
 * @param dataSpecs - search terms object
 */
function omdbCall(dataSpecs) {
  $.ajax({
    url: 'http://www.omdbapi.com/?',
    type: 'GET',
    dataType: 'json',
    data: dataSpecs,
    success: function(data) {
      console.log("app.getMovieById() has been successful using an ID of " + dataSpecs.id);
      console.log(data);
      // save the info into options
      options = {
        id: data.imdbID,
        title: data.Title,
        rating: data.imdbRating,
        director: data.Director,
        plot: data.Plot,
        year: data.Year,
        genre: data.Genre,
        poster: data.Poster
      };
      console.log(options);
      // create a 'movie' object using the options info
      var movie = new app.MovieModel(options);
      // create a view for the new movie model
      var movieView = new app.MovieView(movie);
      // render that view
      movieView.render();
    },
    fail: function(error) {
        console.log("Something has gone wrong v");
        console.log(error);
        console.log("Something has gone wrong ^");
    }
  });
}
