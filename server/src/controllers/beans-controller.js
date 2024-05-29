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
  const beanId = req.params.id;
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
    .where({id: beanId});

    if (beans.length === 0) {
      return res.status(404).json({
        message: `Could not find bean with ID ${beanId}`
      })
    }

    const bean = beans[0]
    const methods = await knex
      .select(
        'methods.id',
        'methods.brew_method',
        'methods.image')
      .from('recipes')
      .where({'bean_id': beanId})
      .join('methods', 'recipes.method_id', 'methods.id')

    res.status(200).json({
      bean: bean,
      methods: methods
    })
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve coffee bean with ID ${beanId}`
    })
  }
}

module.exports = {
  getAllBeans,
  getOneBean
}