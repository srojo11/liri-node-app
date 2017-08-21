
//Twitter
if (process.argv[2] == "my-tweets"){
myTweets();

}

//Spotify
if (process.argv[2] == "spotify-this-song"){
spotifySearch();

}

//OMDB
if (process.argv[2] == "movie-this"){
OMDB();

}

//Random.txt
if (process.argv[2] == "do-what-it-says") {
doWhat();

}	




function myTweets(){

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'Oye3VFlxOkMs4M2PwqWhKLYxM',
  consumer_secret: 'cKCus1yp7mmjjhjPOZEvpPSTTDOppjwDaMR0diOiMCdSqyBMKm',
  access_token_key: '898615155826638849-sx4ZbzjcHkblilG9jyioeUsqXbzkNJ3',
  access_token_secret: 'keKk5pDiPULFBAJvH3CV2fmPAWAT7SdEfNPtazjoBhpMA',
});
 
var params = {screen_name: 'man moon', count: 20 };

client.get('statuses/user_timeline', params, function(error, tweets, response) {
 
  if (!error) {

    console.log(tweets);
  }
});
}



function spotifySearch(){

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: '14615a47701a4bf79814ac286ef6a589',
  secret: '976b88d4157e4da3a4d92a378235e2ba'
});


var nodeArgs = process.argv;
var songName = "";

for (var i = 3; i < nodeArgs.length; i++){

	if (i > 3 && i < nodeArgs.length){

		songName = songName  + " " + nodeArgs[i];
	}

	else {
		songName += nodeArgs[i];

	}

	console.log(songName)
}

spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
 

  if (err) {

    return console.log('Error occurred: ' + err);
  }

  else{
  	var songInfo = data.tracks.items[0];
    var songResult = console.log(songInfo.artists[0].name);
                     console.log(songInfo.name);
                     console.log(songInfo.preview_url);
                     console.log(songInfo.album.name);
                  
  }
 
});


}





function OMDB(){
var request = require("request");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Released);
    console.log("Rating: " + JSON.parse(body).Rated);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);


  }
});
}










function doWhat(){

var randomOne = process.argv[2];

var fs = require("fs");

// Running the readFile module that's inside of fs.
// Stores the read information into the variable "data"
fs.readFile("random.txt", "utf8", function(err, data) {
  
  if (err) {
    return console.log(err);
  }
 
  // Break the string down by comma separation and store the contents into the output array.
  var output = data.split(",");

  // Loop Through the newly created output array
  for (var i = 0; i < output.length; i++) {

    // Print each element (item) of the array
    console.log(output[i]);
  }
});

}

//push string to process.argv[2] to run command from random.txt
//make spotift track input search strict and not by keyword



