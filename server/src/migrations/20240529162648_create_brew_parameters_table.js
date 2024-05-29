exports.up = function(knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary();
    table
      .integer('bean_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('beans')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('method_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('methods')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('dose').notNullable();
    table.string('output').nullable();
    table.string('time').notNullable();
    table.string('water').nullable();
    table.string('temp').notNullable();
    table.string('grind_size').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipes');
};
