const pickRandomPhrase = require('./phrase-generator').default;
const drawPhraseImage = require('../commons/image-utils').drawTextImage;


async function pickPhrase(context) {
  if (context.phrase) return context.phrase;
  if (context.phraseFilter) return await pickPhraseByFilter(context.phraseFilter);
  if (context.theme) return await pickPhraseByTheme(context.theme);
  return await pickPhraseByTheme('default')
}
module.exports = async function generatePhrase(context) {
  context.phrase = pickPhrase(context);
  await drawPhraseImage(context.phrase, 'phrase', context.uuid, {gravity: 'west', size:'600x600'});
}