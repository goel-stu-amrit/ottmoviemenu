const MovieController = require('../controllers/MovieController');
const express = require('express');
const MovieRoute = express.Router();

MovieRoute.get('/movies', MovieController.AllMovies);
MovieRoute.get('/search', MovieController.SearchMovie);
MovieRoute.post('/movies', MovieController.AddMovie);
MovieRoute.put('/movies', MovieController.UpdateMovie);
MovieRoute.delete('/movies/:id', MovieController.DeleteMovie);

module.exports = MovieRoute;
