const knex = require('knex')(require('../../knexfile.js'));
const {missingRecipeFieldValidator} = require('../utils/validators.js');

const getOneRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const recipes = await knex
      .select(
        'recipes.id',
        'recipes.bean_id',
        'beans.image',
        'recipes.method_id',
        'methods.brew_method',
        'recipes.dose',
        'recipes.output',
        'recipes.time',
        'recipes.water',
        'recipes.temp',
        'recipes.grind_size')
      .from('recipes')
      .where({'recipes.id': recipeId})
      .join('methods', 'recipes.method_id', 'methods.id')
      .join('beans', 'recipes.bean_id', 'beans.id')
    
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

const editOneRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;

  const fieldValidation = missingRecipeFieldValidator(req);
  if (!fieldValidation.valid) {
    return res.status(fieldValidation.status).json({
      message: fieldValidation.message
    })
  }

  try {
    await knex('recipes')
      .where({id: recipeId})
      .update(req.body)

    const editedRecipe = await knex
      .select(
        'recipes.id',
        'recipes.bean_id',
        'beans.image',
        'recipes.method_id',
        'methods.brew_method',
        'recipes.dose',
        'recipes.output',
        'recipes.time',
        'recipes.water',
        'recipes.temp',
        'recipes.grind_size')
      .from('recipes')
      .where({'recipes.id': recipeId})
      .join('methods', 'recipes.method_id', 'methods.id')
      .join('beans', 'recipes.bean_id', 'beans.id')
      .first();
    
    res.status(200).json(editedRecipe);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update recipe with ID ${recipeId}`
    })
  }
}

const deleteOneRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    const recipe = await knex('recipes')
      .where({id: recipeId})

    if (recipe.length === 0) {
      return res.status(404).json({
        message: `Could not find recipe with ID ${recipeId}`
      })
    }
    
    await knex('recipes').where({id: recipeId}).del();

    res.status(204).json({
      message: `Successfully deleted recipe with ID ${recipeId}`
    })
  } catch (error) {
    res.status(500).json({
      message: `Error deleting recipe with ID ${recipeId}`
    })
  }
}

const postOneRecipe = async (req, res) => {
  const fieldValidation = missingRecipeFieldValidator(req);
  if (!fieldValidation.valid) {
    return res.status(fieldValidation.status).json({
      message: fieldValidation.message
    })
  }

  try {
    const addRecipe = await knex('recipes')
      .insert(req.body);
    const newRecipeId = addRecipe[0];

    const newRecipe = await knex('recipes')
      .where({id: newRecipeId})
      .first();

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({
      message: `Unable to post new recipe`
    })
  }
}

module.exports = {
  getOneRecipe,
  editOneRecipe,
  deleteOneRecipe,
  postOneRecipe
}