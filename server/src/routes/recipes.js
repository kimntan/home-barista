const router = require('express').Router();
const recipesController = require('../controllers/recipes-controller');

router 
  .route('/:recipeId')
  .get(recipesController.getOneRecipe)
  .put(recipesController.editOneRecipe)
  .delete(recipesController.deleteOneRecipe)

router
  .route('/')
  .post(recipesController.postOneRecipe)

module.exports = router;