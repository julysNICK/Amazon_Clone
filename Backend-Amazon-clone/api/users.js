const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authSecret } = require("../.env");
module.exports = (app) => {
  const {
    existsOrError,
    notExistOrError,
    equalOrError,
    validationEmail,
  } = app.api.validation;
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };
  const save = async (req, res) => {
    const user = { ...req.body };
    if (req.params.id) user.Id = req.params.id;
    if (!req.originalUrl.startsWith("/users")) user.admin = false;
    if (!req.user || req.user.admin) user.admin = false;

    try {
      existsOrError(user.name_user, "Name not provided");
      existsOrError(user.email, "Email not informed");
      validationEmail(user.email, "invalid email");
      existsOrError(user.password, "Password not entered");
      existsOrError(user.confirmPassword, "Invalid password confirmation");
      equalOrError(
        user.password,
        user.confirmPassword,
        "Passwords do not match"
      );
      const userFromDb = await app
        .db("users")
        .where({ email: user.email })
        .first();
      if (!user.id === undefined) {
        notExistOrError(userFromDb, "user already registered");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }
    user.password = encryptPassword(req.body.password);
    delete user.confirmPassword;

    if (user.id) {
      app
        .db("users")
        .update(user)
        .where({ user_id: user.id })
        .whereNull("deleteAt")
        .then((_) => res.status(204))
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      app
        .db("users")
        .insert(user)
        .then((_) => res.status(204).send())
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  };
  const getUsers = (req, res) => {
    app
      .db("users")
      .select("user_id", "name_user", "email", "admin")
      .then((users) => res.json({ users }))
      .catch((err) => res.status(500).send(err));
  };
  return { save, getUsers };
};
