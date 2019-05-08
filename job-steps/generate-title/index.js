const drawPhraseImage = require('../commons/draw-text-image');

module.exports = async function generateTitle(context) {
  if (!context.title) {
    context.title = 'Bom dia!';
  }
  await drawPhraseImage(context.title, 'title', context.uuid, {gravity: 'center', size:'465x'});
}