// import the twitter keys from keys.js
var twitterKeys = require('./keys.js');


// Import the "twitter" NPM package to liri.js
var Twitter = require('twitter');

// Import the Twitter Keys Object for Authentification
var client = new Twitter(
    twitterKeys
);
// Twitter NPM code to get "tweets" array and loop through just the tweets text.
var params = { screen_name: 'jeff_ucsd' };
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
    }
});