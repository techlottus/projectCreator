const request = require("supertest");
const app = require("src/app");
const { conn } = require("src/adapters");

describe("Test Books URLs", () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  });

  it("Retrive books from empty database", async () => {
    await request(app).get("/api/books").expect(200).expect([]);
  });

  it("Create new book", async () => {
    const body = { title: "new book" };
    const response = await request(app).post("/api/books").send(body);

    const response_body = JSON.parse(response["text"]);
    const response_status = response["status"];
    const response_id = response_body["id"];
    const response_title = response_body["title"];

    expect(response_status).toEqual(201);
    expect(response_id).toEqual(1);
    expect(response_title).toEqual(body["title"]);
  });

  it("Try to create new book with an invalid schema", async () => {
    const body = { invalid_key: "new book" };
    const expected_body = {
      errors: ["title is a required field"],
      inner: [],
      message: "title is a required field",
      name: "ValidationError",
      params: { path: "title" },
      path: "title",
      type: "required",
      value: { invalid_key: "new book" },
    };

    const response = await request(app).post("/api/books").send(body);
    const response_status = response["status"];
    const response_body = JSON.parse(response["text"]);

    expect(response_status).toEqual(400);
    expect(response_body).toEqual(expected_body);
  });

  it("Retrive books from a database with data", async () => {
    const body = { title: "new book 2" };
    const expected_body = [
      { id: 1, title: "new book" },
      { id: 2, title: "new book 2" },
    ];

    await request(app).post("/api/books").send(body);

    const response = await request(app).get("/api/books");
    const response_status = response["status"];
    const response_body = JSON.parse(response["text"]);

    expect(response_status).toEqual(200);

    response_body.map((response_book) => {
      const expected_book = expected_body.find(
        (expected_book) => expected_book["id"] === response_book["id"]
      );
      expect(response_book["id"]).toEqual(expected_book["id"]);
      expect(response_book["title"]).toEqual(expected_book["title"]);
    });
  });

  it("Find book", async () => {
    const expected_body = { id: 2, title: "new book 2" };
    const response = await request(app).get(
      `/api/books/${expected_body["id"]}`
    );
    const response_status = response["status"];
    const response_body = JSON.parse(response["text"]);

    expect(response_status).toEqual(200);
    expect(response_body["id"]).toEqual(expected_body["id"]);
    expect(response_body["title"]).toEqual(expected_body["title"]);
  });

  it("Book not found", async () => {
    const id = 999;
    const response = await request(app).get(`/api/books/${id}`);
    const response_status = response["status"];
    const response_body = JSON.parse(response["text"]);

    expect(response_status).toEqual(404);
    expect(response_body).toEqual(`No se encontro el libro con el id: ${id}`);
  });

  it("Update book", async () => {
    const title = "new book updated";
    const body = { title };
    const expected_body = { id: 1, title };

    const response = await request(app)
      .put(`/api/books/${expected_body["id"]}`)
      .send(body);
    const response_status = response["status"];
    const response_body = JSON.parse(response["text"]);

    expect(response_status).toEqual(200);
    expect(response_body["id"]).toEqual(expected_body["id"]);
    expect(response_body["title"]).toEqual(expected_body["title"]);
  });

  it("Try to update a workbook that does not exist", async () => {
    const title = "new book updated";
    const body = { title };
    const expected_body = { id: 999, title };

    const response = await request(app)
      .put(`/api/books/${expected_body["id"]}`)
      .send(body);
    const response_status = response["status"];
    const response_body = JSON.parse(response["text"]);

    expect(response_status).toEqual(404);
    expect(response_body).toEqual(
      `No se encontro el libro con el id: ${expected_body["id"]}`
    );
  });

  it("Try to update new book with an invalid schema", async () => {
    const body = { invalid_key: "new book" };
    const expected_body = {
      errors: ["title is a required field"],
      inner: [],
      message: "title is a required field",
      name: "ValidationError",
      params: { path: "title" },
      path: "title",
      type: "required",
      value: { invalid_key: "new book" },
    };

    const response = await request(app).put("/api/books/1").send(body);
    const response_status = response["status"];
    const response_body = JSON.parse(response["text"]);

    expect(response_status).toEqual(400);
    expect(response_body).toEqual(expected_body);
  });

  it("Delete book", async () => {
    const id = 1;
    await request(app)
      .delete(`/api/books/${id}`)
      .expect(200)
      .expect(`Libro con id ${id} fue eliminado`);
  });

  it("Try to delete a workbook that does not exist", async () => {
    const id = 999;
    const response = await request(app).delete(`/api/books/${id}`);
    const response_status = response["status"];
    const response_body = JSON.parse(response["text"]);

    expect(response_status).toEqual(404);
    expect(response_body).toEqual(`No se encontro el libro con el id: ${id}`);
  });

  afterAll(async () => {
    await conn.close();
  });
});