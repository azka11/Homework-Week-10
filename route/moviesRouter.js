const express = require('express');
const route = express.Router();

const moviesController = require('../controllers/moviesController.js');

route.get('/', moviesController.getMoviesAll);

route.route('/create')
.post(moviesController.createMovies)
.get(moviesController.showCreateMovie);

route.route('/:id/edit')
.put(moviesController.updateMovies)
.get(moviesController.showUpdateMovie);

route.delete('/:id/delete', moviesController.deleteMovies);


module.exports = route;