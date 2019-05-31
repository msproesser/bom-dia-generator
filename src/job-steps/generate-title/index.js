const drawPhraseImage = require('../commons/image-utils').drawTextImage;

module.exports = async function generateTitle(context) {
  if (!context.title) {
    context.title = 'Bom dia!';
  }
  await drawPhraseImage(context.title, 'title', context.uuid, {gravity: 'center', size:'465x', textType: 'label'});
}