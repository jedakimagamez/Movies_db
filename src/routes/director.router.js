const { getAll, create, getOne, remove, update, setDirectorMovies} = require('../controllers/director.controller');
const express = require('express');

const directorRouter = express.Router();

directorRouter.route('/')
    .get(getAll)
    .post(create);

directorRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

directorRouter.route('/:id/movies')
    .post(setDirectorMovies);
    
module.exports = directorRouter;