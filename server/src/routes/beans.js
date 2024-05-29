const router = require('express').Router();
const beansController = require('../controllers/beans-controller');

router
  .route('/')
  .get(beansController.getAllBeans)

module.exports = router;