import supertest from "supertest";

import app from "../../src/app";

import databaseClient from "../../database/client";

import type { Result, Rows } from "../../database/client";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("GET /api/offers", () => {
  it("should fetch offers successfully", async () => {
    const rows = [] as Rows;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    const response = await supertest(app).get("/api/offers");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

describe("GET /api/offers/:id", () => {
  it("should fetch a single offer successfully", async () => {
    const rows = [{}] as Rows;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    const response = await supertest(app).get("/api/offers/1");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should fail on invalid id", async () => {
    const rows = [] as Rows;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    const response = await supertest(app).get("/api/offers/0");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

describe("POST /api/offers", () => {
  it("should add a new offer successfully", async () => {
    const result = { insertId: 5 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    const fakeOffer = {
      title: "foo",
      city: "paris",
      background: "http://blabla.com",
      description: "il fait beau",
      salary: 1000000,
      profile: "junior wcs avec 12 ans d'XP pour un stage payant",
      work_condition_id: 1,
      company_id: 1,
      contract_id: 2,
    };

    const response = await supertest(app).post("/api/offers").send(fakeOffer);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });

  it("should fail on invalid request body", async () => {
    const result = { insertId: 5 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    const fakeOffer = {
      title: "foo",
      city: "paris",
      background: "http://blabla.com",
      description: "il fait beau",
      salary: 1000000,
      profile: "junior wcs avec 12 ans d'XP pour un stage payant",
      work_condition_id: "présentiel",
    };
    const response = await supertest(app).post("/api/offers").send(fakeOffer);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });
});

describe("PUT /api/offers/:id", () => {
  it("should update an existing item successfully", async () => {
    const result = { affectedRows: 1 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    const fakeOffer = {
      id: 1,
      title: "foo",
      city: "paris",
      background: "http://blabla.com",
      description: "il fait beau",
      salary: 1000000,
      profile: "junior wcs avec 12 ans d'XP pour un stage payant",
      work_condition_id: 1,
      company_id: 1,
      contract_id: 2,
    };
    const response = await supertest(app).put("/api/offers/1").send(fakeOffer);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid request body", async () => {
    const result = { affectedRows: 1 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    const fakeOffer = {
      id: 1,
      title: "foo",
      city: "paris",
      background: "http://blabla.com",
      description: "",
      salary: "ghkhgcj",
      profile: "junior wcs avec 12 ans d'XP pour un stage payant",
      work_condition_id: 1,
      company_id: "bloublou",
      contract_id: 2,
    };
    const response = await supertest(app).put("/api/offers/1").send(fakeOffer);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    const result = { affectedRows: 0 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    const fakeOffer = {
      id: -10,
      title: "foo",
      city: "paris",
      background: "http://blabla.com",
      description: "il fait beau",
      salary: 1000000,
      profile: "junior wcs avec 12 ans d'XP pour un stage payant",
      work_condition_id: 1,
      company_id: 1,
      contract_id: 2,
    };

    const response = await supertest(app).put("/api/offers/1").send(fakeOffer);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

describe("DELETE /api/offers/:id", () => {
  it("should delete an existing offer successfully", async () => {
    const result = { affectedRows: 1 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    const response = await supertest(app).delete("/api/offers/1");

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    const result = { affectedRows: 0 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    const response = await supertest(app).delete("/api/items/43");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});
