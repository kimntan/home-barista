const knex = require('knex')(require('../../knexfile.js'));

const missingRecipeFieldValidator = (req) => {
  const missingFields = [];
  
  if (req.body.method_id === 1) {
    for (const key in req.body) {
      if (key !== 'water') {
        if (!req.body[key]) {
          missingFields.push(key);  
        }
      } else {
        req.body.water = '';
      }
    }
  } else {
    for (const key in req.body) {
      if (key !== 'output') {
        if(!req.body[key]) {
          missingFields.push(key);
        }
      } else {
        req.body.output = ''
      }
    }
  }
  
  if (missingFields.length > 0) {
    return {
      valid: false,
      status: 400,
      message: `Please provide a value for ${missingFields.join(', ')}`
    }
  }

  return {
    valid: true
  }
}

module.exports = {
  missingRecipeFieldValidator
}