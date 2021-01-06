const body_parse = require("body-parser");
const cors = require("cors");
const consign = require("consign");

module.exports = (app) => {
  app.use(body_parse.json());
  app.use(cors());
};
