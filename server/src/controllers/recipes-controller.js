const knex = require('knex')(require('../../knexfile.js'));

const getOneRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const recipes = await knex
      .select(
        'id',
        'dose',
        'output',
        'time',
        'water',
        'temp',
        'grind_size')
      .from('recipes')
      .where({id: recipeId})
    
    if (recipes.length === 0) {
      return res.status(404).json({
        message: `Could not find recipe with ID ${recipeId}`
      })
    }

    const recipe = recipes[0];
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: `Unable to get recipe with ID ${recipeId}`
    })
  }
}

module.exports = {
  getOneRecipe
}