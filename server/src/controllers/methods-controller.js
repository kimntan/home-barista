const knex = require('knex')(require('../../knexfile.js'));

const getAllMethods = async (req, res) => {
  try {
    const methods = await knex
      .select(
        'id',
        'brew_method',
        'image')
      .from('methods')

    res.status(200).json(methods);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve methods.`
    })
  }
}

module.exports = {
  getAllMethods
}