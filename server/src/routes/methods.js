const router = require('express').Router();
const methodsController = require('../controllers/methods-controller');

router
  .route('/')
  .get(methodsController.getAllMethods)

module.exports = router;