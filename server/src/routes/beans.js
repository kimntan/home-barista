const router = require('express').Router();
const upload = require('../utils/multer-config');
const beansController = require('../controllers/beans-controller');

router
  .route('/')
  .get(beansController.getAllBeans)
  .post(upload.single('image'), beansController.postOneBean)

router
  .route('/:beanId')
  .get(beansController.getOneBean)
  .delete(beansController.deleteOneBean)
  .put(beansController.editBean)

module.exports = router