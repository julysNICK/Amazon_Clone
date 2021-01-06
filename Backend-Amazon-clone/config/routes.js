module.exports = (app) => {
  app.post("/users/register", app.api.users.save);
  app.post("/users/login", app.api.auth.signin);
  app.post("/validationToken", app.api.auth.validateToken);
  app
    .route("/users")
    .post(app.api.users.save)
    .get(app.config.verifyJwt.validateToken, app.api.users.getUsers);
  app.route("/category").post(app.api.category.save);
  app
    .route("/products")
    .get(app.api.product.getPagination)
    .post(app.api.product.save);
  app.route("/categories").get(app.api.category.getCategory);
  app
    .route("/products/:productid")

    .get(app.api.product.getById)
    .put(app.api.product.save)
    .delete(app.api.product.remove);
  app.get("/productsSearch/search=:name", app.api.product.getbyName);
};
