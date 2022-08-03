exports.handledErrors = (err, req, res, next) => {
  if (err.status && err.msg) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.unhandledErrors = (err, req, res, next) => {
  if (err) res.status(500).send({ msg: err });
};
