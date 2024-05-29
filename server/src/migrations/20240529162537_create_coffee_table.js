exports.up = function(knex) {
  return knex.schema.createTable('beans', (table) => {
    table.increments('id').primary();
    table.string('bean_name').notNullable();
    table.string('brand').notNullable();
    table.string('roast_type').nullable();
    table.string('tasting_notes').nullable();
    table.string('product_url').nullable();
    table.string('image').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('beans');
};
