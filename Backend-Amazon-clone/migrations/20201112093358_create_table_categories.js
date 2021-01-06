exports.up = function (knex) {
  return knex.schema.createTable("categories", (table) => {
    table.increments("idCetegoties").primary();
    table.string("name").notNull();
    table.integer("parentId").references("id").inTable("categories");
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("categories");
};
