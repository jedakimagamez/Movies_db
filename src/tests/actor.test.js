const request = require("supertest");
const app = require("../app.js");

let actorId;

test("POST /actors should create actor", async () => {
  const actor = {
    firstName: "Jesus",
    lastName: "Agamez",
    nationality: "United State",
    image:"https://randomuser.me/api/portraits/men/76.jpg",
    birthday: "1963-06-09",
  };
  const res = await request(app).post("/actors").send(actor);
  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /actors should get all actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /actors/:id should updated actor", async () => {
  const updatedActor = {
    firstName: "Jesus updated",
  };
  const res = await request(app).put(`/actors/${actorId}`).send(updatedActor);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedActor.firstName);
});

test("DELETE /actors/:id should delete actor", async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);
});