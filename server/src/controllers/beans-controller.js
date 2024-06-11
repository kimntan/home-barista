const knex = require('knex')(require('../../knexfile.js'));
const upload = require('../utils/multer-config');
const cloudinary = require('cloudinary').v2;
const { missingCoffeeFieldValidator } = require('../utils/validators.js');
const { searchBeans } = require('../utils/search.js')

cloudinary.config({
  cloud_name: 'dns9asy5j',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const getAllBeans = async (req, res) => {
  try {
    const beans = await knex
    .select(
      'id',
      'bean_name',
      'brand',
      'image')
    .from('beans')
    .where({'user_id': req.user.id})

    const searchData = await searchBeans(req);
    if(searchData) {
      return res
        .status(searchData.status)
        .json(searchData.message)
    }

    res.status(200).json(beans);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Unable to get coffee beans.`
    })
  }
}

const getOneBean = async (req, res) => {
  const beanId = req.params.beanId;
  try {
    const beans = await knex
    .select(
      'id',
      'bean_name',
      'brand',
      'roast_type',
      'tasting_notes',
      'product_url',
      'image')
    .from('beans')
    .where({'user_id': req.user.id})
    .andWhere({id: beanId});

    if (beans.length === 0) {
      return res.status(404).json({
        message: `Could not find bean with ID ${beanId}`
      })
    }

    const bean = beans[0];
    res.status(200).json(bean);
  } catch (error) {
    res.status(500).json({
      message: `Unable to get coffee bean with ID ${beanId}`
    })
  }
}

const postOneBean = async (req, res) => {
  const fieldValidation = missingCoffeeFieldValidator(req);
  if (!fieldValidation.valid) {
    return res.status(fieldValidation.status).json({
      message: fieldValidation.message
    })
  }

  try {
    req.body.user_id = req.user.id;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataUri = 'data:' + req.file.mimetype + ';base64,' + b64;
      const result = await cloudinary.uploader.upload(dataUri);
      req.body.image = result.secure_url;
    }

    if (req.body.image) {
      const result = await cloudinary.uploader.upload(req.body.image);
      req.body.image = result.secure_url;
    }

    const addBean = await knex('beans')
      .insert(req.body);
    const newBeanId = addBean[0];

    const newBean = await knex('beans')
      .where({id: newBeanId})
      .first();

    res.status(201).json(newBean);
  } catch (error) {
    res.status(500).json({
      message: `Unable to post new bean`
    })
  }
}

const deleteOneBean = async (req, res) => {
  const beanId = req.params.beanId;
  try {
    const bean = await knex('beans')
      .where({'user_id': req.user.id})
      .andWhere({id: beanId});
    
    if (bean.length === 0) {
      return res.status(404).json({
        message: `Could not find bean with ID ${beanId}`
      })
    }

    await knex('beans').where({'user_id': req.user.id}).andWhere({id: beanId}).del();
    
    res.status(204).json({
      message: `Successfully deleted bean with ID ${beanId}`
    })
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete bean with ID ${beanId}`
    })
  }
}

module.exports = {
  getAllBeans,
  getOneBean,
  postOneBean,
  deleteOneBean
}