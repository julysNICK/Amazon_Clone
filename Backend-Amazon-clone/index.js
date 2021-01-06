const app = require("express")();
const consign = require("consign");
const db = require("./config/db.js");
app.db = db;
consign()
  .include("./config/verifyJwt.js")
  .then("./config/middleware.js")
  .then("./api/validation.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

app.listen(3333, () => {
  console.log(`🚀 servidor rodando`);
});
