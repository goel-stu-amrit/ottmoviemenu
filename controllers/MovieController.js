const CONSTANT = require('../helpers/Constants');
const utils = require('../utils/response');
const {STATUS_CODE} = require('../helpers/STATUS_CODE');
const Quries = require('../quries/MovieQuries');
const ObjectId = require('mongodb').ObjectId;

exports.AllMovies = async (req, res) => {
  try {
    const Movies = await Quries.findMovies({});
    return utils.sendResponse(res, STATUS_CODE.OK, CONSTANT.ALL_MOVIES, Movies);
  } catch (error) {
    console.log('error in AllMovies controller', error);
    return utils
        .sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, CONSTANT.SOMETHING_WENT_WRONG);
  }
};

exports.SearchMovie = async (req, res) => {
  try {
    const {body} = req;
    const movie_name = body.movie_name;
    const genre = body.genre;
    const searchmovie = {};
    if (movie_name) {
      searchmovie.movie_name = movie_name;
    } else if (genre) {
      searchmovie.genre = genre;
    }
    const found_movie = await Quries.findMovies(searchmovie);

    if (found_movie.length === 0) {
      return utils.sendResponse(res, STATUS_CODE.OK, CONSTANT.MOVIE_NOT_FOUND, []);
    }
    return utils.sendResponse(res, STATUS_CODE.OK, CONSTANT.MOVIE_EXISTS, found_movie);
  } catch (error) {
    console.log('error in SearchMovie controller', error);
    return utils.sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, CONSTANT.SOMETHING_WENT_WRONG);
  }
};
exports.AddMovie = async (req, res) => {
  try {
    const {body} = req;
    const {movie_name, genre, rating, streaming_link} = body;
    const alreadyMovie = await Quries.findMovie(movie_name);
    if (alreadyMovie) {
      return utils.sendResponse(res, STATUS_CODE.OK, CONSTANT.MOVIE_ALREADY_EXISTS, alreadyMovie);
    }
    const MovieData = {
      movie_name, genre, rating, streaming_link,
    };
    const Movie = await Quries.AddMovie(MovieData);
    return utils.sendResponse(res, STATUS_CODE.CREATED, CONSTANT.MOVIE_ADDED_SUCCESSFULL, Movie);
  } catch (error) {
    console.log('error in AddMovie controller', error);
    return utils.sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, CONSTANT.SOMETHING_WENT_WRONG);
  }
};
exports.UpdateMovie = async (req, res) => {
  try {
    const {body} = req;
    const updateObj = {$set: {}};
    const filter = {movie_name: body?.movie_name};
    updateObj.$set.genre = body?.genre;
    updateObj.$set.rating = body?.rating;
    updateObj.$set.streaming_link = body?.streaming_link;
    await Quries.updateMovie({filter, updateObj});
    const updated_movie = await Quries.findMovie(body.movie_name);

    return utils.sendResponse(res, STATUS_CODE.OK, CONSTANT.Response.MOVIE_UPDATE, updated_movie);
  } catch (error) {
    console.log('error in UpdateMovie controller', error);
    return utils.sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, CONSTANT.SOMETHING_WENT_WRONG);
  }
};
exports.DeleteMovie = async (req, res) => {
  try {
    const id = req.params?.id;
    console.log(typeof id);
    const movie_exist = await Quries.DeleteMovie({_id: new ObjectId(id)});
    if (movie_exist) {
      return utils.sendResponse(res, STATUS_CODE.OK, CONSTANT.MOVIE_DELETED_SUCCESSFULLY);
    }
    return utils.sendResponse(res, STATUS_CODE.OK, CONSTANT.MOVIE_NOT_FOUND);
  } catch (error) {
    console.log('error in DeleteMovie controller', error);
    return utils.sendResponse(res, STATUS_CODE.INTERNAL_SERVER_ERROR, CONSTANT.SOMETHING_WENT_WRONG);
  }
};
