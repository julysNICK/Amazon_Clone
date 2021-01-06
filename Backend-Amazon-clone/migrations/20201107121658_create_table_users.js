exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.string("email").notNull().unique();
    table.string("password").notNull();
    table.boolean("admin").notNull().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
