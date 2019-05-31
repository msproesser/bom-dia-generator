const axios = require('axios');
const randomInt = require('../../../utils.js').randomInt;
const config = require('../../../config.js');

function parameters(options) {
  return {
    q: options.query || 'sunrise+landscape',
    per_page: 200,
    orientation: options.orientation || 'horizontal',
    category: options.category || 'nature',
    key: config.pixabay.key,
    page: options.page || 1
  };
}

function objectToQuery(obj) {
  return Object.entries(obj).reduce((sum, [key, value]) => sum + `${key}=${value}&`, '?')
}

module.exports = function pixabayBackgroundSearch(filterOptions) {
  return async function() {
    filterOptions.page = randomInt(filterOptions.page) + 1;
    const props = objectToQuery(parameters(filterOptions));
    const url = `https://pixabay.com/api/${props}`;
    const imgList = (await axios.get(url)).data.hits;
    const imgPicked = imgList[randomInt(imgList.length)].largeImageURL;
    return imgPicked;
  }
}