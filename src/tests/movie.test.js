const request = require("supertest");
const app = require("../app.js");
const Actor = require("../models/Actor.js");
const Director = require("../models/Director.js");
const Genre = require("../models/Genre.js");
require("../models");

let movieId;

test("POST /movies should create movie", async () => {
  const movie = {
    name: "The Bad Bach 2",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Star_Wars_-_The_Bad_Batch.svg/220px-Star_Wars_-_The_Bad_Batch.svg.png",
    synopsis:"Clone Force 99, también conocido como Bad Batch, un grupo de soldados clon de élite con mutaciones genéticas que se introdujeron por primera vez en Star Wars: The Clone Wars , emprende audaces misiones mercenarias después de las Guerras Clon .",
    releaseYear: 2021,
  };
  const res = await request(app).post("/movies").send(movie);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /movies should get all movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].genres).toBeDefined();
});

test("PUT /movies/:id should updated movie", async () => {
  const updatedMovie = {
    name: "The Bad Bach 2 updated",
  };
  const res = await request(app).put(`/movies/${movieId}`).send(updatedMovie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedMovie.name);
});

test("POST /movies/:id/actors should set actors to movie", async () => {
  const actor = await Actor.create({
    firstName: "Jesus",
    lastName: "Agamez",
    nationality: "United State",
    image:"https://randomuser.me/api/portraits/men/76.jpg",
    birthday: "1963-06-09",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /:id/directors should set directors to movie", async () => {
  const director = await Director.create({
    firstName: "Jesus",
    lastName: "Agamez",
    nationality: "United State",
    image:"https://randomuser.me/api/portraits/men/76.jpg",
    birthday: "1963-06-09",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /:id/genres should set genres to movie", async () => {
  const genre = await Genre.create({
    name: "Action",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE /movies/:id should delete movie", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});