const {
  fetchUsers,
  fetchUsersByUsername,
  updateUser,
} = require("../model/model");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUsersByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchUser = (req, res, next) => {
  const { user_id } = req.params;
  const body = req.body;
  updateUser(user_id, body)
    .then((user) => {
      console.log(user);
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
