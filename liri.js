// NPM packages
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var moment = require("moment");

//Node.JS File System Core Package 
var fs = require("fs");

//keys.js for Twitter and Spotify
var keys = require("./keys.js");

//------------------TWITTER--------------------------------------------------------------

// Import the twitter keys from keys.js and make a new object for authentification
var client = new Twitter(keys.twitterKeys);

// Terminal command to get tweets using "my-tweets"
if (process.argv[2] === "my-tweets") {

    // screen_name = twitter handle with no # sign
    // Count = 20 most recent tweets
    var params = { screen_name: "jeff_ucsd", count: 20 };

    // Twitter NPM code to get "tweets" array and loop through just the actual tweet text.
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    });
}

//------------------SPOTIFY---------------------------------------------------------------

// Import the spotify keys from keys.js and make a new object for authentification
var spotify = new Spotify(keys.spotifyKeys);

// Terminal command to get songs using "spotify-this-song"
if (process.argv[2] === "spotify-this-song") {

    // Store all of the arguments in an array
    var nodeArgs = process.argv;

    // Create an empty variable for holding the track name
    var trackName = "";

    //If no track submitted then The Sign is the requested track
    if (!process.argv[3]) {
        trackName = "The Sign+Ace of Base";
    } else {
        // Loop through all the words in the node argument
        // to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                trackName = trackName + "+" + nodeArgs[i];
            } else {
                trackName += nodeArgs[i];
            }
        }
    }

    // Spotify NPM code to get song information
    function getSpotify() {
        spotify.request("https://api.spotify.com/v1/search?q=track:" + trackName + "&type=track&market=US")
            .then(function(data) {
                console.log("----------------------------------------------------------");
                console.log("Artist:                " + data.tracks.items[0].artists[0].name);
                console.log("Track Name:            " + data.tracks.items[0].name);
                console.log("Album:                 " + data.tracks.items[0].album.name);
                console.log("Track Preview Link:    " + data.tracks.items[0].preview_url);
                console.log("----------------------------------------------------------");
            })
            .catch(function(err) {
                console.error('Error occurred: ' + err);
            });
    }
    getSpotify();
}

//------------------OMDB MOVIE------------------------------------------------------------

// Terminal command to get OMDB data using "movie-this"
if (process.argv[2] === "movie-this") {

    // Store all of the arguments in an array
    var nodeArgs = process.argv;

    // Create an empty variable for holding the movie name
    var movieName = "";

    //If no movie submitted then Mr Nobody is the requested movie
    //This also clears "The Sign" from process.argv[3]
    if (!process.argv[3]) {
        movieName = "Mr. Nobody";
    } else {
        // Loop through all the words in the node argument
        // to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            } else {
                movieName += nodeArgs[i];
            }
        }
    }
    console.log(process.argv);

    // Make a variable for the URL for clarity
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    // Then run a request to the OMDB API with the movie specified
    request(movieQueryUrl, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the corresponding array values
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

//------------------DO WHAT IT SAYS------------------------------------------------------------

if (process.argv[2] === "do-what-it-says") {
    // reads the text from random.txt with error control
    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log("node liri.js " + data);
    });
}