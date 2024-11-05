const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

app.use(cors());
app.use(express.json());

//app.use(express.static('static'));

let db;

(async () => {
  db = await open({
    filename: './tracks_database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Function which returns all tracks from the database
async function fetchAllTracks() {
  let query = 'SELECT * FROM tracks';
  let response = await db.all(query, []);

  return { tracks: response };
}

//Endpoint 1: Retrieve All Tracks
app.get('/tracks', async (req, res) => {
  let result = await fetchAllTracks();

  res.status(200).json(result);
});

//Function which returns tracks for a given artist from the database
async function fetchTracksByArtist(artist) {
  let query = 'SELECT * FROM tracks WHERE artist = ?';
  let response = await db.all(query, [artist]);

  return { tracks: response };
}

//Endpoint 2: Retrieve Tracks by Artist
app.get('/tracks/artist/:artist', async (req, res) => {
  let artist = req.params.artist;
  let result = await fetchTracksByArtist(artist);

  res.status(200).json(result);
});

//Function which returns tracks for a given genre from the database
async function fetchTracksByGenre(genre) {
  let query = 'SELECT * from tracks WHERE genre = ?';
  let response = await db.all(query, [genre]);

  return { tracks: response };
}

//Endpoint 3: Retrieve Tracks by Genre
app.get('/tracks/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let result = await fetchTracksByGenre(genre);

  res.status(200).json(result);
});

//Function which returns tracks for a given release year from the database
async function fetchTracksByReleaseYear(year) {
  let query = 'SELECT * FROM tracks WHERE release_year = ?';
  let response = await db.all(query, [year]);

  return { tracks: response };
}

//Endpoint 4: Retrieve Tracks by Release Year
app.get('/tracks/release_year/:year', async (req, res) => {
  let year = req.params.year;
  let result = await fetchTracksByReleaseYear(year);

  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
