const { getAll, create, getOne, remove, update, setActorMovies } = require('../controllers/actor.controller');
const express = require('express');

const actorRouter = express.Router();

actorRouter.route('/')
    .get(getAll)
    .post(create);

actorRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

actorRouter.route('/:id/movies')
    .post(setActorMovies);

module.exports = actorRouter;