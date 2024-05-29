const data = require('../seed-data/beans');

exports.seed = async function(knex) {
  await knex('beans').del()
  await knex('beans').insert(data);
};
