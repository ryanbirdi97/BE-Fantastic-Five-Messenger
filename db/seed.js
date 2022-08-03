const db = require("./index.js");
//const { userData } = require("./data/dev-data/index");
const format = require("pg-format");
const seed = ({ userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
      return db.query(`
     CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(25) NOT NULL,
        avatar VARCHAR(255) NOT NULL,
        status BOOLEAN NOT NULL
      );`);
    })
    .then(() => {
      const queryString = format(
        `INSERT INTO users(username, avatar, status) VALUES %L RETURNING *`,
        userData.map((user) => {
          return [user.username, user.avatar, user.status];
        }),
      );
      return db.query(queryString);
    });
};

module.exports = seed;
