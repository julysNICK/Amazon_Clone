exports.up = function (knex) {
  return knex.schema.alterTable("products", (table) => {
    table
      .integer("categoryId")
      .references("id")
      .inTable("categories")
      .notNull();
  });
};

exports.down = function (knex) {
  return knex.schma.alterTable("products", (table) => {
    table.dropColumn("categoryId");
  });
};
