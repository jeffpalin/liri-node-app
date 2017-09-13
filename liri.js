// import the twitter keys from keys.js
var twitterKeys = require('./keys.js');

// Import the "twitter" NPM package to liri.js
var Twitter = require('twitter');

var client = new Twitter(
    twitterKeys
);
console.log(client);

var params = { screen_name: 'jeff_ucsd' };
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});