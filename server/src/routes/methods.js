const router = require('express').Router();
const methodsController = require('../controllers/methods-controller');

router
  .route('/')
  .get(methodsController.getAllMethods)

router
  .route('/:beanId')
  .get(methodsController.getCoffeeMethods)

router
  .route('/:beanId/other-methods')
  .get(methodsController.getOtherCoffeeMethods)


module.exports = router;