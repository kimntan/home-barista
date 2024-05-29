const router = require('express').Router();
const beansController = require('../controllers/beans-controller');

router
  .route('/')
  .get(beansController.getAllBeans)

router
  .route('/:beanId')
  .get(beansController.getOneBean)

// router
//   .route('/:beanId/method/:methodId')
//   .get(beansController.getOneRecipe)

module.exports = router;