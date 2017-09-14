// NPM packages
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");


//------------------TWITTER--------------------------------------------------------------

// Import the twitter keys from keys.js and make a new object for authentification
var twitterKeys = require("./keys.js");
var client = new Twitter(twitterKeys);

// Terminal command to get tweets using "my-tweets"
if (process.argv[2] === "my-tweets") {

    // Twitter NPM code to get "tweets" array and loop through just the actual tweet text.
    // Default max length = 20 tweets so no additional logic needed
    var params = { screen_name: "jeff_ucsd" };

    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    });
}

//------------------SPOTIFY---------------------------------------------------------------







//------------------OMDB MOVIE------------------------------------------------------------

// Terminal command to get OMDB data using "movie-this"
if (process.argv[2] === "movie-this") {

    // Store all of the arguments in an array
    var nodeArgs = process.argv;

    // Create an empty variable for holding the movie name
    var movieName = "";

    // Loop through all the words in the node argument
    // to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }

    // Make a variable for the URL for clarity
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    // Then run a request to the OMDB API with the movie specified
    request(movieQueryUrl, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the corresponding array value
            console.log("----------------------------------------------------------");
            console.log("Movie Name:                 " + JSON.parse(body).Title);
            console.log("Release Year:               " + JSON.parse(body).Year);
            console.log("IMBD Rating:                " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[1].Value);
            console.log("Country:                    " + JSON.parse(body).Country);
            console.log("Language:                   " + JSON.parse(body).Language);
            console.log("Plot:                       " + JSON.parse(body).Plot);
            console.log("Major Actors:               " + JSON.parse(body).Actors);
            console.log("----------------------------------------------------------");
        }
    });
}