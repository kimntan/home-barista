const knex = require('knex')(require('../../knexfile.js'));

const getAllBeans = async (req, res) => {
  try {
    const beans = await knex
    .select(
      'id',
      'bean_name',
      'brand',
      'image')
    .from('beans')

    res.status(200).json(beans);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve coffee beans.`
    })
  }
}

const getOneBean = async (req, res) => {
  try {
    const beans = await knex
    .select(
      'id',
      'bean_name',
      'brand',
      'roast_type',
      'tasting_notes',
      'product_url',
      'image')
    .from('beans')
    .where({id: req.params.id});

    if (beans.length === 0) {
      return res.status(404).json({
        message: `Could not find bean with ID ${req.params.id}`
      })
    }

    const bean = beans[0]
    res.status(200).json(bean)
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve coffee bean with ID ${req.params.id}`
    })
  }
}

module.exports = {
  getAllBeans,
  getOneBean
}