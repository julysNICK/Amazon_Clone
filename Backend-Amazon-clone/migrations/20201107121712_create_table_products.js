exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("title").notNull();
    table.string("imageUrl", 1000).notNull();
    table.decimal("price").notNull();
    table.integer("rating");
    table.integer("userId").references("id").inTable("users").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
