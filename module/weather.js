const axios = require("axios");

// initial cash for weather
const weatherCashe = {};

async function handleWeather(req, res) {
  const searchQuery = req.query.searchQuery;
  const lat = req.query.lat;
  const lon = req.query.lon;
  // const cityArr = weatherData.find(
  //   (item) => item.city_name.toLowerCase() === searchQuery.toLowerCase()
  // );

  if (weatherCashe[searchQuery] !== undefined) {
    res.status(200).send(weatherCashe[searchQuery]);
  } else {
    const cityArr = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
    );
    console.log(cityArr.data);
    try {
      const cityData = cityArr.data.data.map((item) => new Forcast(item));
      weatherCashe[searchQuery] = cityData;
      res.status(200).send(cityData);
    } catch (error) {
      errorHandeler(error, res);
    }
  }
}

class Forcast {
  constructor(day) {
    this.date = day.valid_data;
    this.description = day.weather.description;
  }
}

module.exports = { handleWeather };
