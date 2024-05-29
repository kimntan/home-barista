const router = require('express').Router();
const beansController = require('../controllers/beans-controller');

router
  .route('/')
  .get(beansController.getAllBeans)

router
  .route('/:beanId')
  .get(beansController.getOneBean)

module.exports = router;