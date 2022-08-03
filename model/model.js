const db = require("../db/index");

exports.fetchUsers = () => {
  queryString = `SELECT * FROM users`;

  return db.query(queryString).then(({ rows }) => {
    return rows;
  });
};

exports.fetchUsersByUsername = (username) => {
  queryString = `SELECT * FROM users WHERE username = '${username}'`;

  return db.query(queryString).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 400, msg: "user doesn't exist!!" });
    }
    return rows[0];
  });
};

exports.updateUser = (user_id, body) => {
  const { username, avatar, status } = body;

 // const validStatus = ["true", "True", "false", "False"];

  if (status) {
    return db
      .query("UPDATE users SET status=$1 WHERE user_id=$2 RETURNING *", [
        status,
        user_id,
      ])
      .then(({ rows }) => {
        return rows[0];
      });
  }

  if (username && avatar) {
    return db
      .query(
        "UPDATE users SET username=$1, avatar=$2 WHERE user_id=$3 RETURNING *",
        [username, avatar, user_id],
      )
      .then(({ rows }) => {
        return rows[0];
      });
  } else if (username) {
    return db
      .query("UPDATE users SET username=$1 WHERE user_id=$2 RETURNING *", [
        username,
        user_id,
      ])
      .then(({ rows }) => {
        return rows[0];
      });
  } else if (avatar) {
    return db
      .query("UPDATE users SET avatar=$1 WHERE user_id=$2 RETURNING *", [
        avatar,
        user_id,
      ])
      .then(({ rows }) => {
        return rows[0];
      });
  }
};
