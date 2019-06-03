import pickPhraseByFilter from './phrase-filter-picker';
import pickPhraseByTheme from './phrase-theme-picker';
import { drawTextImage as drawPhraseImage } from '../commons/image-utils';


async function pickPhrase(context) {
  if (context.phrase) return context.phrase;
  if (context.phraseFilter) return await pickPhraseByFilter(context.phraseFilter, context.phraseSource);
  if (context.theme) return await pickPhraseByTheme(context.theme);
  return await pickPhraseByTheme('default')
}
export default async function generatePhrase(context) {
  context.phrase = await pickPhrase(context);
  await drawPhraseImage(context.phrase, 'phrase', context.uuid, {gravity: 'west', size:'600x600'});
}