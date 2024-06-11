const knex = require('knex')(require('../../knexfile.js'));

const searchBeans = async (req) => {
  const reqInput = req.query.s;
  const searchInput = req.query.s + '%';
  if(reqInput) {
    const response = await knex
      .select(
        'id',
        'bean_name',
        'brand',
        'image')
      .from('beans')
      .where({'user_id': req.user.id})
      .whereILike('bean_name', searchInput)
      .orWhereILike('brand', searchInput)
    
    if (response.length === 0) {
      return {
        status: 404,
        message: `Search input ${searchInput} was not found`
      }
    }

    return {
      status: 200,
      message: response
    }
  }
  return false;
}

module.exports = { searchBeans }