const request = require("supertest");
const app = require("../app");

const db = require("../db/index");
const seed = require("../db/seed");
const testData = require("../db/data/test-data");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  db.end();
});

describe("GET", () => {
  test("GET /api/users should get status 200 and replies with all data from users table", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
        expect(users).toHaveLength(5);

        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              user_id: expect.any(Number),
              status: expect.any(Boolean),
              username: expect.any(String),
              avatar: expect.any(String),
            }),
          );
        });
      });
  });

  test("GET /api/users/:username should get status 200 and replies with all data of the given user", () => {
    const usern = "Manita";

    return request(app)
      .get(`/api/users/${usern}`)
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(user).toBeInstanceOf(Object);
        expect(user).toEqual({
          user_id: 1,
          username: "Manita",
          avatar:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          status: false,
        });
      });
  });
  test("GET /api/users/:username should get status 400 when username doesn't exist", () => {
    const usern = "Mani";

    return request(app)
      .get(`/api/users/${usern}`)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("user doesn't exist!!");
      });
  });
});

describe("PATCH /api/users/:user_id", () => {
  test("responds with status:200, responds with the updated user when both username and avatar is passed in body", () => {
    const userUpdates = {
      username: "Chessington",
      avatar: "hello",
    };
    return request(app)
      .patch("/api/users/1")
      .send(userUpdates)
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual({
          user_id: 1,
          username: "Chessington",
          avatar: "hello",
          status: false,
        });
      });
  });

  test("responds with status:200, responds with the updated user when only username is passed in body", () => {
    const userUpdates = {
      username: "Manita",
    };
    return request(app)
      .patch("/api/users/1")
      .send(userUpdates)
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual({
          user_id: 1,
          username: "Manita",
          avatar:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          status: false,
        });
      });
  });

  test("responds with status:200, responds with the updated user when only avatar is passed in body", () => {
    const userUpdates = {
      avatar: "Manita",
    };
    return request(app)
      .patch("/api/users/1")
      .send(userUpdates)
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual({
          user_id: 1,
          username: "Manita",
          avatar: "Manita",
          status: false,
        });
      });
  });

  test("responds with status:200, responds with the updated user when only username is passed in body", () => {
    const userUpdates = {
      status: true,
    };
    return request(app)
      .patch("/api/users/1")
      .send(userUpdates)
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual({
          user_id: 1,
          username: "Manita",
          avatar:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          status: true,
        });
      });
  });

  //
});
