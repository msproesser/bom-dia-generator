const axios = require('axios');
const randomInt = require('../utils.js').randomInt;
const config = require('../config.js');

const parameters = {
  q: 'sunrise+landscape',
  per_page: 200,
  orientation: 'horizontal',
  category: 'nature',
  key: config.pixabay.key
};

function objectToQuery(obj) {
  return Object.entries(parameters).reduce((sum, [key, value]) => sum + `${key}=${value}&`, '?')
}

exports.default = async function searchBackground(context) {
  if(context.url) return;
  
  parameters.page = randomInt(2) + 1;
  const props = objectToQuery(parameters);
  const url = `https://pixabay.com/api/${props}`;
  console.log(url);
  const imgList = (await axios.get(url)).data.hits;
  const imgPicked = imgList[randomInt(imgList.length)].largeImageURL;
  context.url = imgPicked;
}