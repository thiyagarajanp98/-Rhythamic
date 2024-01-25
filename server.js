const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const jiosaavnApiBaseUrl = "https://www.jiosaavn.com/api.php";
const ctx = "web6dot0";
const apiVersion = "4";
const makeApiRequest = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        cookie: "L=tamil; gdpr_acceptance=true; DL=english",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}; /* GET / */
app.get("/", async (req, res) => {
  try {
    const url = `${jiosaavnApiBaseUrl}?__call=webapi.getLaunchData&api_version=${apiVersion}&_format=json&_marker=0&ctx=${ctx}`;
    const launchData = await makeApiRequest(url);
    res.json(launchData);
  } catch (error) {
    res.status(500).json({
      error: error.message || "An error occurred",
    });
  }
}); /* GET /details/:id/:type/:p/:n */
app.get("/details/:id/:type/:p?/:n?", async (req, res) => {
  try {
    const { id, type, p, n } = req.params;
    console.log(id, type, p, n);
    const url = `${jiosaavnApiBaseUrl}?__call=webapi.get&token=${id}&type=${type}&p=${p ? p : 1}&n=${n ? n : 10}&includeMetaTags=0&ctx=${ctx}&api_version=${apiVersion}&_format=json&_marker=0`;
    const songDetails = await makeApiRequest(url);
    res.json(songDetails);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
    });
  }
}); /* GET /search/songs/:query */
app.get("/search/songs/:query", async (req, res) => {
  try {
    const { query } = req.params;
    let page = 1;
    let allResults = [];
    while (true) {
      const url = `${jiosaavnApiBaseUrl}?p=${page}&_format=json&_marker=0&api_version=${apiVersion}&ctx=wap6dot0&n=50&__call=search.getResults&q=${query}`;
      const response = await makeApiRequest(url);
      const tamilSongs = response.results.filter(
        (song) => song.language === "tamil",
      );
      allResults.push(...tamilSongs);
      if (response.results.length < 50) {
        break;
      }
      page++;
    }
    res.json(allResults);
  } catch (error) {
    res.status(500).json({
      error: error.message || "An error occurred",
    });
  }
}); /* GET /song/:id*/
app.get("/song/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const url = `${jiosaavnApiBaseUrl}?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=${id}`;
    const songDetails = await makeApiRequest(url);
    res.json(songDetails);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
    });
  }
}); /* GET /search/albums/:query */
app.get("/search/albums/:query", async (req, res) => {
  try {
    const { query } = req.params;
    let page = 1;
    let allResults = [];
    while (true) {
      const url = `${jiosaavnApiBaseUrl}?p=${page}&_format=json&_marker=0&api_version=${apiVersion}&ctx=wap6dot0&n=50&__call=search.getAlbumResults&q=${query}`;
      const response = await makeApiRequest(url);
      const tamilAlbums = response.results.filter(
        (album) => album.language === "tamil",
      );
      allResults.push(...tamilAlbums);
      if (response.results.length < 50) {
        break;
      }
      page++;
    }
    res.json(allResults);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
    });
  }
}); /* GET /album/:id*/
app.get("/album/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const url = `${jiosaavnApiBaseUrl}?__call=webapi.get&api_version=${apiVersion}&_format=json&_marker=0&ctx=web6dot0&token=${id}&type=album`;
    const albumDetails = await makeApiRequest(url);
    res.json(albumDetails);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
    });
  }
}); /* GET /search/playlists/:query */
app.get("/search/playlists/:query", async (req, res) => {
  try {
    const { query } = req.params;
    let page = 1;
    let allResults = [];
    while (true) {
      const url = `${jiosaavnApiBaseUrl}?p=${page}&_format=json&_marker=0&api_version=${apiVersion}&ctx=wap6dot0&n=50&__call=search.getArtistResults&q=${query}`;
      const response = await makeApiRequest(url);
      const tamilPlaylists = response.results.filter(
        (playlist) => playlist.more_info.language === "tamil",
      );
      allResults.push(...tamilPlaylists);
      if (response.results.length < 50) {
        break;
      }
      page++;
    }
    res.json(allResults);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
    });
  }
}); /* GET /playlist/:id */
app.get("/playlist/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const url = `${jiosaavnApiBaseUrl}?__call=playlist.getDetails&_format=json&cc=in&_marker=0%3F_marker%3D0&listid=${id}`;
    const playlistDetails = await makeApiRequest(url);
    res.json(playlistDetails);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred",
    });
  }
}); // Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
