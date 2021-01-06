const knex = require("knex");
module.exports = (app) => {
  const { existsOrError} = app.api.validation;
  const save = (req, res) => {
    const product = { ...req.body };
    if (req.params.id) product.id = req.params.id;
    try {
      existsOrError(product.title, "empty product name");
      existsOrError(product.imageUrl, "Mandatory product image");
      existsOrError(product.userId, "store or seller not informed");
      existsOrError(product.price, "value not informed");
      existsOrError(product.categoryId, "categoria nâo informada");
    } catch (msg) {
      res.status(400).send(msg);
    }
    if (product.id) {
      app
        .db("products")
        .update(product)
        .where({ product_id: product.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("products")
        .insert(product)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };
  const remove = async (req, res) => {
    try {
      const rowsDelete = await app
        .db("products")
        .where({ product_id: req.params.id })
        .del();
      try {
        existsOrError(rowsDelete, "Product not found");
      } catch (msg) {
        return res.status(400).send(msg);
      }
      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  const limit = 10;
  const getPagination = async (req, res) => {
    const page = req.query.page || 1;

    const result = await app.db("products").count("product_id").first();
    const count = parseInt(result.count);

    app
      .db("products")
      .select(
        "product_id",
        "title",
        "imageUrl",
        "price",
        "userId",
        "categoryId"
      )
      .limit(limit)
      .offset(page * limit - limit)
      .then((products) => res.json({ data: products, count, limit }))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    const { productid } = req.params;
    app
      .db("products")
      .where({ product_id: productid })
      .innerJoin("categories", "products.categoryId", "categories.category_id ")
      .first()
      .then((products) => {
        products.title = products.title.toString();
        return res.json(products);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };

  const getbyName = (req, res) => {
    const { name } = req.params;

    app
      .db("products")
      .where("title", "LIKE", `%${name}%`)
      .select(
        "product_id",
        "title",
        "imageUrl",
        "price",
        "userId",
        "rating",
        "categoryId"
      )
      .then((products) => res.json({ data: products }))
      .catch((err) => res.status(500).send(err));
  };
  const getbyCategory = (req, res) => {
    const { categories } = req.params;
    app
      .db("products")
      .innerJoin("categories", "categories.category_id", "products.categoryId")
      .innerJoin("users", "users.user_id", "products.userId")
      .select(
        "product_id",
        "title",
        "imageUrl",
        "price",
        "userId",
        "name_user",
        "name_category"
      )
      .where("name_category", "=", `${categories}`)
      .then((data) => {
        res.json({ data: data });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };

  return { save, remove, getById, getPagination, getbyName, getbyCategory };
};
