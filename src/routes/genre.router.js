const { getAll, create, getOne, remove, update,setGenreMovies } = require('../controllers/genre.controller');
const express = require('express');

const genreRouter = express.Router();

genreRouter.route('/')
    .get(getAll)
    .post(create);

genreRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

genreRouter.route('/:id/movies')
    .post(setGenreMovies);

module.exports = genreRouter;