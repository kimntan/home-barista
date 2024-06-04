const knex = require('knex')(require('../../knexfile.js'));

const getAllMethods = async (req, res) => {
  try {
    const methods = await knex('methods')
      .select(
        'id',
        'brew_method',
        'image')

    res.status(200).json(methods);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve methods.`
    })
  }
}

const getCoffeeMethods = async (req, res) => {
  const beanId = req.params.beanId;
  try {
    const methods = await knex
    .select(
      'recipes.method_id',
      'methods.brew_method',
      'methods.image',
      'recipes.id')
    .from('recipes')
    .where({'bean_id': beanId})
    .join('methods', 'recipes.method_id', 'methods.id')

    res.status(200).json(methods)
  } catch (error) {
    res.status(500).json({
      message: `Unable to get methods for bean with ID ${beanId}`
    })
  }
}

const getOtherCoffeeMethods = async (req, res) => {
  const beanId = req.params.beanId;
  try {
    const existingMethods = await knex
      .select('recipes.method_id')
      .from('recipes')
      .where({'bean_id': beanId})
      .join('methods', 'recipes.method_id', 'methods.id')
    
    const existingMethodsId = existingMethods.map(method => method.method_id)

    const otherMethods = await knex('methods')
    .select(
      'id',
      'brew_method',
      'image')
    .whereNotIn('id', existingMethodsId)
    
    res.status(200).json(otherMethods);
  } catch (error) {
    res.status(500).json({
      message: `Unable to get other methods for bean with ID ${beanId}`
    })
  }
}

module.exports = {
  getAllMethods,
  getCoffeeMethods,
  getOtherCoffeeMethods
}