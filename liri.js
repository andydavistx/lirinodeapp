////**VARIABLES**////

//to activate the ".env package" 
require('dotenv').config();

//to access "My API Keys" in keys.js
let keys = require("./keys.js");
//console.log(" ",keys);
//this activates my "spotify npm package"
let Spotify = require('node-spotify-api');

//this activates the "node spotify api info" from my keys.js
let spotify = new Spotify({
  id: keys.spotifyKeys.id,
	secret: keys.spotifyKeys.secret
});

//the variable used to search for songs on Spotify
let songChoice=" "; 

//this accesses the request to "my omdbKeys"
let request = require('request');
request(`http://www.omdbapi.com/?apikey=${keys.omdbKeys.id}&`, function (error, response, body) {

// displays an error if one occurred
console.log('error:', error); 

// displays the response status code if a response was received
  console.log('statusCode:', response && response.statusCode);

// displays the details for the body if there is one
  console.log('body:', body); 
});

//the variable used to search for movies on omdb
let movieChoice=" ";

//this accesses the request to my bandsintownKeys
//let bandsintownKeys= new bandsintown({
  //id: key.bandsintownKeys.id,
//});

// the variable used to search for movies on bandsintown
//let concertChoice="";

//brings in the fs library?
let fs = require("fs");

//**USER COMMANDS**//

/* 
    spotify-song ==> will search for a spotify song and display info.

    movie-this ==> will search for a movie from omdb and display info.

    concert-this ==> will search for a concert from bandsintown and display info.

    do-what-it-says ==> will read off of random.txt and perfrom the command written inside of the file.

*/

// defines what the user commands will do inside of the terminal
let userCommand = process.argv[2]; 



////**CALLS**////

//spotify call for user input
if (userCommand === "spotify-song"){
    spotifyCheck();
    spotifyCall(songChoice);
}

//omdb call for user input
else if (userCommand === "movie-this"){
  movieCheck();
  movieCall(movieChoice);
}

//bandsintown call for user input
//else if (userCommand === "concert-this"){
  //concertCheck();
  //concertCall(concertChoice);
//}

//do-what-it-says call for user input
else if (userCommand === "do-what-it-says"){
  JustDoIt();
}

//if there is no command typed...
else {
  return console.log ("Hey. Enter a command into the terminal! ......Please.");
}

////**FUNCTIONS**////


//"spotifyCheck" refers back to the user call for a "songChoice" or displays the random.txt default
function spotifyCheck () {
 
 //will default to random.txt input if nothing is defined 
  if (!process.argv[3]) {
    songChoice = "I want It That Way";
  }
  //else statement takes the 3rd arguement in the command line and searches for it
  else {
    for (i = 3; i < process.argv.length; i++) {
			songChoice = process.argv[i];
		}
  }
};

//"spotifyCall" actually pulls the info for the actual user "songChoice" and displays it in the terminal
function spotifyCall (songChoice) {
  
  //this is a ".search" node spotify API documentation template for how they want their data pulled...
  spotify.search({type: "track", query: songChoice, limit: 1}, function(error, response){
		if (error) {
      return console.log(error);
    } 
    //this controls the format for how the terminal will display the info     
    for (j = 0; j < response.tracks.items[0].album.artists.length; j++) {
      console.log("Artist(s): " + response.tracks.items[0].album.artists[j].name);
      console.log("Song: " + response.tracks.items[0].name);
      console.log("Song Link: " + response.tracks.items[0].external_urls.spotify);
      console.log("Album: " + response.tracks.items[0].album.name);
      }
  });
};

//"movieCheck" refers back to the user's call for movieChoice 
function movieCheck() {

  //if the user doesn't put in a movie title, the default search will be Shaun of the Dead (tis spooky season after all...)
	if (!process.argv[3]) {
    movieChoice = "Shaun of the Dead";

	} else {
		//this accomodates movie titles with multiple words in it
		for (m = 3; m < process.argv.length; m++) {
			movieChoice += process.argv[m] + "+";
			
		}

	}

};

//refers back to "movieCall" and "movieChoice" from "CALLS"   
function movieCall(movieChoice) {

	//variable to hold the omdb url search with api key and omdb request
	let omdbMovie = `http://www.omdbapi.com/?apikey=${keys.omdbKeys.id}&t=` + movieChoice;

	
	request(omdbMovie, function (error, response, body) {
		if (error) {
			return console.log(error);
		}
    let data = JSON.parse(body);
    //printint out desired information
    console.log("Title of the movie: " + data.Title);
		console.log("Year the movie came out: " + data.Year);
		console.log("IMDB Rating: " + data.imdbRating);
		console.log("Country where the movie was produced: " + data.Country);
		console.log("Movie language: " + data.Language);
		console.log("Movie plot: " + data.Plot);
		console.log("Actors in the movie: " + data.Actors);

    
	});

};











