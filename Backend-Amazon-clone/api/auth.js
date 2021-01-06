const bcrypt = require("bcrypt");
const jwtt = require("jwt-simple");
const jwt = require("jsonwebtoken");
const { authSecret } = require("../.env");
module.exports = (app) => {
  const {
    validationEmail,
  } = app.api.validation;
  const signin = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).send("enter email and password");
      }
      validationEmail(req.body.email, "invalid email");

      const user = await app
        .db("users")
        .where({ email: req.body.email })
        .first();

      if (!user) return res.status(400).send("User not found");

      const isEqual = bcrypt.compareSync(req.body.password, user.password);
      if (!isEqual) return res.status(401).send("wrong password");
      const now = Math.floor(Date.now() / 1000);
      const payload = {
        user: {
          id: user.user_id,
          name: user.name_user,
          email: user.email,
          admin: user.admin,
        },
        iat: now,
        exp: now + 60 * 60 * 24 * 3,
      };
      return res.json({ ...payload, token: jwtt.encode(payload, authSecret) });
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const validateToken = async (req, res) => {
    const { authorization } = req.headers || null;

    try {
    } catch (error) {}
    if (authorization != undefined) {
      const bearer = authorization.split(" ");

      const token = bearer[1];
      jwt.verify(token, authSecret, (err, data) => {
        if (err) {
          res.status(401);
          res.json({ isTokenValid: false, user: undefined });
        } else {
          res.status(200);
          res.json({ isTokenValid: true, user: data, token: token });
        }
      });
    } else {
      res.status(401);
      res.send(false);
    }
  };
  return { signin, validateToken };
};
