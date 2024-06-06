exports.up = function(knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
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
    table.string('grind').notNullable();
    table.string('ratio').nullable();
    table.string('notes').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('recipes');
};
