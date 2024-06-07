const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const beansController = require('../controllers/beans-controller');

router
  .route('/')
  .get(beansController.getAllBeans)
  .post(upload.single('image'), beansController.postOneBean)

router
  .route('/:beanId')
  .get(beansController.getOneBean)
  .delete(beansController.deleteOneBean)

module.exports = router;