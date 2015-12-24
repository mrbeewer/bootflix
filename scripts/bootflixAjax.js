// ombd api documentation is available here:
// http://www.omdbapi.com/

/**
 * app.getMovieById
 * @param id    - omdb id of the movie you're searching for
 */
app.getMovieById = function getMovieById(id) {

  // console.log("app.getMovieById() has been called. nothing happens. wait.. some tumbleweeds are tumbling by! an ID of '" + id + "' was entered.");

  // request URL for omdb's id search
  // http://www.omdbapi.com/?i=tt0095016&plot=full&r=json


    dataSpecs = {
      i: id,
      apikey: 'd31f1a94',
      plot: 'full',
      r: 'json'
    };

    omdbCall(dataSpecs);


    // // 1. create your ajax request and then in your success method.
    // $.ajax({
    //   url: 'http://www.omdbapi.com/?',
    //   type: 'GET',
    //   dataType: 'json',
    //   data: {
    //     i: id,
    //     apikey: 'd31f1a94',
    //     plot: 'full',
    //     r: 'json'
    //   },
    //   // 2. you should create a new MovieModel object based on the returned
    //   // result.
    //   // var movie = new app.MovieModel(data);
    //   success: function(data) {
    //     console.log("app.getMovieById() has been successful using an ID of " + id);
    //     console.log(data);
    //     options = {
    //       id: data.imdbID,
    //       title: data.Title,
    //       rating: data.imdbRating,
    //       director: data.Director,
    //       plot: data.Plot,
    //       year: data.Year,
    //       genre: data.Genre,
    //       poster: data.Poster
    //     };
    //     console.log(options);
    //     // 3. you should create a new MovieView object based on movie model
    //     var movie = new app.MovieModel(options);
    //     // 4. you call render() on the view
    //     var movieView = new app.MovieView(movie);
    //     // 5. your render() should append the `$el` to the DOM
    //     movieView.render();
    //   },
    //   fail: function(error) {
    //       console.log("Something has gone wrong below");
    //       console.log(error);
    //       console.log("Something has gone wrong ^");
    //   }
    // });
}

/**
 * app.getMovieByTitle
 * @param title     - title of the movie you're searching for
 */
app.getMovieByTitle = function getMovieByTitle(title) {

  console.log("app.getMovieByTitle() has been called. the form stares at you blankly. wait, what? A title of '" + title + "' was entered");

  // request URL for omdb's title search:
  //http://www.omdbapi.com/?t=Die+Hard&y=1988&plot=full&r=json



  dataSpecs = {
    t: title,
    apikey: 'd31f1a94',
    plot: 'full',
    r: 'json'
  };

  omdbCall(dataSpecs);

  // 1. create your ajax request and then in your success method.
  // 2. you should create a new MovieModel object based on the returned
  // result.
  // var movie = new app.MovieModel(data);
  // 3. you should create a new MovieView object based on movie model
  // 4. you call render() on the view
  // 5. your render() should append the `$el` to the DOM


}


/**
 * app.MovieModel
 * movie model constructor
 * @param options  - options object
 */
app.MovieModel = function MovieModel(options) {
  this.id = options.id;
  this.title = options.title;
  this.rating = options.rating;
  this.director = options.director;
  this.plot = options.plot;
  this.year = options.year;
  this.genre = options.genre;
  this.poster = options.poster;
  // id, title, rating, director, plot, year, genre
  // should all be in the `options` object
  // store all the information in the model
}





/**
 * app.MovieView
 * movie view constructor
 * @param options  - options object
 */
app.MovieView = function MovieView(options) {
  console.log("app.MovieView has been called");
  // options should contain the `model` for which the view is using
  // render(options);
  // 1. create a view
  // 2. create a render() method
  this.render = function() {
    // 3. render() should a div with a class of '.movie' via string concatenation
    //    you will want to add the id, title, rating, director, plot, year,
    //    and genre. See design/movielayout.html
    // 4. finally, render() will $(selector).append() each new '.movie' to "#movie-listing".
    console.log("app.MovieView.render has been called");
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

function omdbCall(dataSpecs) {
  // 1. create your ajax request and then in your success method.
  $.ajax({
    url: 'http://www.omdbapi.com/?',
    type: 'GET',
    dataType: 'json',
    data: dataSpecs,
    // 2. you should create a new MovieModel object based on the returned
    // result.
    // var movie = new app.MovieModel(data);
    success: function(data) {
      console.log("app.getMovieById() has been successful using an ID of " + dataSpecs.id);
      console.log(data);
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
      // 3. you should create a new MovieView object based on movie model
      var movie = new app.MovieModel(options);
      // 4. you call render() on the view
      var movieView = new app.MovieView(movie);
      // 5. your render() should append the `$el` to the DOM
      movieView.render();
    },
    fail: function(error) {
        console.log("Something has gone wrong below");
        console.log(error);
        console.log("Something has gone wrong ^");
    }
  });
}
