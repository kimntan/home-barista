const data = require('../seed-data/recipes.js');

exports.seed = async function(knex) {
  await knex('recipes').del()
  await knex('recipes').insert(data);
};
