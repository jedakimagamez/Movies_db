const request = require("supertest");
const app = require("../app.js");

let directorId;

test("POST /directors should create director", async () => {
  const director = {
    firstName: "Jesus",
    lastName: "Agamez",
    nationality: "United State",
    image:"https://randomuser.me/api/portraits/men/76.jpg",
    birthday: "1963-06-09",
  };
  const res = await request(app).post("/directors").send(director);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /directors should get all directors", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /directors/:id should updated director", async () => {
  const updatedDirector = {
    firstName: "Jhonny updated",
  };
  const res = await request(app)
    .put(`/directors/${directorId}`)
    .send(updatedDirector);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedDirector.firstName);
});

test("DELETE /directors/:id should delete director", async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);
});