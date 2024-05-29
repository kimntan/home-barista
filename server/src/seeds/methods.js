const data = require('../seed-data/methods.js');

exports.seed = async function(knex) {
  await knex('methods').del()
  await knex('methods').insert(data);
};
