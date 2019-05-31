const pickBackgroundByFilter = require('./background-filter-picker');
const pickBackgroundByTheme = require('./background-theme-picker');
const downloadImage = require('../commons/url-downloader');

async function pickUrl(context) {
  if (context.background) return context.background;
  if (context.backgroundFilter) return await pickBackgroundByFilter(context.backgroundFilter);
  if (context.theme) return await pickBackgroundByTheme(context.theme);
  return await pickBackgroundByTheme('default')
}

module.exports = async function generateBackground(context) {
  context.background = await pickUrl(context);
  await downloadImage(context.background, 'background', context.uuid);
}
