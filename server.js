"use strict";

const express = require("express");

require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(cors());

const weatherData = require("./data/weather.json");
const response = require("express");

app.get("/weather", (req, res) => {
  const searchQuery = req.query.searchQuery;
  const lat = req.query.lat;
  const lon = req.query.lon;

  const cityArr = weatherData.find(
    (item) => item.city_name.toLowerCase() === searchQuery.toLowerCase()
  );

  try {
    const cityData = cityArr.data.map((item) => new Forcast(item));

    res.status(200).send(cityData);
  } catch (error) {
    errorHandeler(error, res);
  }

  //   console.log(cityArr);
  // res.send({ cityArr });
});

app.get("*", (req, res) => {
  res.status(404).send("page not found");
});

function errorHandeler(error, res) {
  res.status(500).send({ error: "something went wrong" });
}

class Forcast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

app.listen(process.env.PORT || 3002, () => {
  console.log("server is working");
});
