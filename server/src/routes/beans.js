const router = require('express').Router();
const beansController = require('../controllers/beans-controller');

router
  .route('/')
  .get(beansController.getAllBeans)
  .post(beansController.postOneBean)

router
  .route('/:beanId')
  .get(beansController.getOneBean)
  .delete(beansController.deleteOneBean)

module.exports = router;