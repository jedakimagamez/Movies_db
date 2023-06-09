const request = require("supertest");
const app = require("../app.js");

let genreId;

test("POST /genres should create genre", async () => {
  const genre = {
    name: "Action",
  };
  const res = await request(app).post("/genres").send(genre);
  genreId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /genres should get all genres", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /genres/:id should updated genre", async () => {
  const updatedGenre = {
    name: "Action updated",
  };
  const res = await request(app).put(`/genres/${genreId}`).send(updatedGenre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedGenre.name);
});

test("DELETE /genres/:id should delete genre", async () => {
  const res = await request(app).delete(`/genres/${genreId}`);
  expect(res.status).toBe(204);
});