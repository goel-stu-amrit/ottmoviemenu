const Movie = require('../models/movie.model');

class Quries {
  async findMovie(movie_name) {
    return Movie.findOne({movie_name});
  }

  async findMovies(searchmovie) {
    return Movie.find(searchmovie, {movie_name: 1, _id: 0, genre: 1}).sort({_created_at: -1}).limit(1);
  }


  async AddMovie(data) {
    return Movie(data).save();
  }

  async updateMovie(data) {
    const {filter, updateObj} = data;
    return Movie.updateOne(filter, updateObj);
  }
  async DeleteMovie(data) {
    return Movie.deleteOne(data);
  }
}

module.exports = new Quries();
