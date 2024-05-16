import express from "express";

// Create an instance of an Express application
const app = express();

// Define the port the server will listen on
const port = 3000;

// Initialize an empty array to store anime objects
const animes = [];
// Initialize a unique ID counter for assigning IDs to new anime objects
let uniqueId = 1;

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to create a new anime
app.post("/anime", (req, res) => {
  const { name, seasons } = req.body;

  const newAnime = {
    id: uniqueId++,
    name,
    seasons,
  };

  animes.push(newAnime);
  res.status(200).send(newAnime);
});

// Route to get all animes
app.get("/getAnimes", (req, res) => {
  res.send(animes).status(200);
});

// Route to get a specific anime by its ID
app.get("/getAnime/:id", (req, res) => {
  // Find the anime with the matching ID in the animes array
  const data = animes.find((anime) => anime.id === parseInt(req.params.id));

  if (data) {
    res.status(200).send(data);
  } else {
    res.status(404).send("Anime not found!");
  }
});

// Route to update an existing anime by its ID
app.put("/updateAnime/:id", (req, res) => {
  const animeId = parseInt(req.params.id);

  const animeIndex = animes.findIndex((anime) => anime.id === animeId);

  if (animeIndex !== -1) {
    const updatedAnime = { ...animes[animeIndex], ...req.body };

    animes[animeIndex] = updatedAnime;

    res.status(200).send(updatedAnime);
  } else {
    res.status(404).send("Anime not found!");
  }
});

// Route to delete an anime by its ID
app.delete("/deleteAnime/:id", (req, res) => {
  const animeId = parseInt(req.params.id);

  const animeIndex = animes.findIndex((anime) => anime.id === animeId);

  if (animeIndex !== -1) {
    const deletedAnime = animes.splice(animeIndex, 1);

    res.status(200).send(deletedAnime[0]);
  } else {
    res.status(404).send("Anime not found!");
  }
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
