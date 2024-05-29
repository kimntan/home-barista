const knex = require('knex')(require('../../knexfile.js'));

const getAllBeans = async (req, res) => {
  try {
    const beans = await knex
    .select(
      'id',
      'bean_name',
      'image')
    .from('beans')

    res.status(200).json(beans);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve coffee beans`
    })
  }
}

module.exports = {
  getAllBeans
}