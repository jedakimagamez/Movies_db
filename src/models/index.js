const Movie = require("./Movie");
const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");

// Relación entre peliculas y generos
Movie.belongsToMany(Genre, { through: "movieGenres" });
Genre.belongsToMany(Movie, { through: "movieGenres" });

//Relación entre peliculas y actores
Movie.belongsToMany(Actor, { through: "movieActors" });
Actor.belongsToMany(Movie, { through: "movieActors" });

// Relación entre peliculas y directores
Movie.belongsToMany(Director, { through: "movieDirectors" });
Director.belongsToMany(Movie, { through: "movieDirectors" });