module.exports = (app) => {
  const save = (req, res) => {
    const {
      existsOrError,
    } = app.api.validation;
    const category = { ...req.body };
    try {
      existsOrError(category.name_category, "name not informed");
    } catch (msg) {
      return res.status(400).send(msg);
    }
    if (category.id) {
      app
        .db("categories")
        .update(category)
        .where({ category_id: category.id })
        .then((_) => res.status(204).send())
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      app
        .db("categories")
        .insert(category)
        .then((_) => res.status(204).send())
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  };

  const getCategory = (req, res) => {
    app
      .db("categories")
      .select("name_category")
      .then((categories) => res.json({ categories }))
      .catch((err) => res.status(500).send(err));
  };
  return { save, getCategory };
};
