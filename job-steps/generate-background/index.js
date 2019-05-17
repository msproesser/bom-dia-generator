const pickRandomImage = require('./background-picker').default;
const downloadImage = require('../commons/url-downloader');
module.exports = async function generateBackground(context) {
  context.background = await pickUrl(context);
  await downloadImage(context.background, 'background', context.uuid);
}

async function pickUrl(context) {
  if (context.background) return context.url;
  if (context.backgroundFilter) return await pickBackgroundByFilter(context.backgroundFilter);
  if (context.theme) return await pibkBackgroundByTheme(context.theme);

  return await pickRandomImage(context)
}