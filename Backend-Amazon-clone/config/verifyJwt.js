const jwt = require("jsonwebtoken");
const { authSecret } = require("../.env");
module.exports = (app) => {
  const validateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, authSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  return { validateToken };
};
