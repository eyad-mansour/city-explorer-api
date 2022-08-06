const axios = require("axios");

const movieCashe = {};

async function handleMovie(req, res) {
  const searchQuery = req.query.searchQuery;

  if (movieCashe[searchQuery] !== undefined) {
    res.status(200).send(movieCashe[searchQuery]);
  } else {
    const movieArr = await axios.get(
      // https://api.themoviedb.org/3/movie/550?api_key=520dcd017c8714412881351d06c7cd93
      // https://api.themoviedb.org/3/search/movie?api_key=520dcd017c8714412881351d06c7cd93&query=amman
      `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`
    );
    try {
      const movieData = movieArr.data.results.map((item) => new Movie(item));
      res.status(200).send(movieData);
    } catch (error) {
      errorHandeler(error, res);
    }
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = movie.poster_path;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}
module.exports = { handleMovie };
