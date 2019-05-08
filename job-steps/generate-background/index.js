const pickRandomImage = require('./background-picker').default;
const downloadImage = require('../commons/url-downloader');
module.exports = async function generateBackground(context) {
  if (!context.url) {
    context.url = await pickRandomImage(context); 
  }
  await downloadImage(context.url, 'background', context.uuid);
}