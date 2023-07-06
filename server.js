const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const apiLaunchDataUrl = 'https://www.jiosaavn.com/api.php?__call=webapi.getLaunchData&api_version=4&_format=json&_marker=0&ctx=web6dot0';

// GET /
app.get('/', async (req, res) => {
  try {

    const url = apiLaunchDataUrl;
    const response = await axios.get(url,{withCredentials: true,
      headers: {
        cookie: 'L=tamil; gdpr_acceptance=true; DL=english',
      }});

    // Filter the songs for Tamil language
    const tamilSongs = response.data;

    res.json(tamilSongs);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// details by ID

// GET /song/:query
app.get('/details/:id/:type/:p/:n', async (req, res) => {
  try {

    const id = req.params.id;
    const type = req.params.type;
    const p=req.params.p;
    const n=req.params.n;
    const url = `https://www.jiosaavn.com/api.php?__call=webapi.get&token=${id}&type=${type}&p=${p}&n=${n}&includeMetaTags=0&ctx=web6dot0&api_version=4&_format=json&_marker=0`;
    const response = await axios.get(url);

    // Filter the songs for Tamil language
    const song = response.data

    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

//Song search by string
const apiSongUrl = 'https://www.jiosaavn.com/api.php?p={page}&_format=json&_marker=0&api_version=4&ctx=wap6dot0&n=50&__call=search.getResults&q=';

// GET /search/songs/:query
app.get('/search/songs/:query', async (req, res) => {
  try {
    const query = req.params.query;
    let page = 1;
    let allResults = [];

    const url = apiSongUrl.replace('{page}', page);
    const response = await axios.get(url + query);

    // Filter the songs for Tamil language
    const tamilSongs = response.data.results.filter((song) => song.language === 'tamil');

    // Append the current page's Tamil songs to the accumulated results
    allResults = [...allResults, ...tamilSongs];

    res.json(allResults);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

//Song details by ID
const apiSongIDUrl = 'https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=';

// GET /song/:query
app.get('/song/:id', async (req, res) => {
  try {

    const query = req.params.id;
    const url = apiSongIDUrl;
    const response = await axios.get(url + query);

    // Filter the songs for Tamil language
    const song = response.data;

    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

const apiAlbumUrl = 'https://www.jiosaavn.com/api.php?p={page}&_format=json&_marker=0&api_version=4&ctx=wap6dot0&n=50&__call=search.getAlbumResults&q=';

// GET /search/albums/:query
app.get('/search/albums/:query', async (req, res) => {
    try {
      const query = req.params.query;
      let page = 1;
      let allResults = [];
  
      const url = apiAlbumUrl.replace('{page}', page);
      const response = await axios.get(url + query);

      // Filter the albums for Tamil language
      const tamilAlbums = response.data.results.filter((album) => album.language === 'tamil');

      // Append the current page's Tamil albums to the accumulated results
      allResults = [...allResults, ...tamilAlbums];

      res.json(allResults);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  //Album details by ID

// GET /album/:query
app.get('/album/:id', async (req, res) => {
  try {

    const id = req.params.id;
    const url = `https://www.jiosaavn.com/api.php?__call=webapi.get&api_version=4&_format=json&_marker=0&ctx=web6dot0&token=${id}&type=album`;
    const response = await axios.get(url);

    // Filter the songs for Tamil language
    const album = response.data;

    res.json(album);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
  
  const apiPlaylistUrl = 'https://www.jiosaavn.com/api.php?p={page}&_format=json&_marker=0&api_version=4&ctx=wap6dot0&n=50&__call=search.getArtistResults&q=';

// GET /search/playlists/:query
app.get('/search/playlists/:query', async (req, res) => {
    try {
      const query = req.params.query;
      let page = 1;
      let allResults = [];
  
      const url = apiPlaylistUrl.replace('{page}', page);
      const response = await axios.get(url + query);

      // Filter the playlist for Tamil language
      const tamilPlaylists = response.data.results.filter((playlist) => playlist.more_info.language === 'tamil');

      // Append the current page's Tamil playlist to the accumulated results
      allResults = [...allResults, ...tamilPlaylists];

      res.json(allResults);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  //Playlist details by ID
const apiPlaylistIDUrl = 'https://www.jiosaavn.com/api.php?__call=playlist.getDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&listid=';

// GET /playlist/:query
app.get('/playlist/:id', async (req, res) => {
  try {

    const query = req.params.id;
    const url = apiPlaylistIDUrl;
    const response = await axios.get(url + query);

    // Filter the songs for Tamil language
    const playlist = response.data;

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
  
  //MoreAlbums details by ID

// GET /playlist/:query
app.get('/moreAlbums/:api:input', async (req, res) => {
  try {

    const api = req.params.api;
    const apiMoreAlbumUrl = `https://www.jiosaavn.com/api.php?__call=${api}&api_version=4&_format=json&_marker=0&ctx=web6dot0`;
    const response = await axios.get(apiMoreAlbumUrl);

    // Filter the songs for Tamil language
    const moreAlbums = response.data;

    res.json(moreAlbums);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
  

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
