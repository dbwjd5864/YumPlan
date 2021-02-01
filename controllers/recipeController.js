const axios = require('axios');

exports.getRecipes = async (req, res) => {
  const recipes = await axios.get('');
};
