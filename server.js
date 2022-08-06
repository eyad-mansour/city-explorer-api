"use strict";

const express = require("express");

require("dotenv").config();

const cors = require("cors");

const axios = require("axios");

const { handleWeather } = require("./module/weather");

const { handleMovie } = require("./module/movies");

const app = express();
app.use(cors());

app.get("/weather", handleWeather);

app.get("/movies", handleMovie);

const weatherData = require("./data/weather.json");
const response = require("express");

app.get("*", (req, res) => {
  res.status(404).send("page not found");
});

function errorHandeler(error, res) {
  res.status(500).send({ error: "something went wrong" });
}

app.listen(process.env.PORT || 3002, () => {
  console.log("server is working");
});

// imovie api
// https://api.themoviedb.org/3/movie/550?api_key=520dcd017c8714412881351d06c7cd93
