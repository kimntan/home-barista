const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const beansController = require('../controllers/beans-controller');

router
  .route('/')
  .get(beansController.getAllBeans)
  .post(upload.none(), beansController.postOneBean)

router
  .route('/:beanId')
  .get(beansController.getOneBean)
  .delete(beansController.deleteOneBean)

module.exports = router;