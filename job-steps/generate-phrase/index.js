const pickRandomPhrase = require('./phrase-generator').default;
const drawPhraseImage = require('../commons/image-utils').drawTextImage;

module.exports = async function generatePhrase(context) {
  if (!context.phrase) {
    context.phrase = await pickRandomPhrase(context);
  }
  await drawPhraseImage(context.phrase, 'phrase', context.uuid, {gravity: 'west', size:'600x600'});
}