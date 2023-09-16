import { drawTextImage } from '../commons/image-utils';
import { randomItem } from '../../utils';
import { pickTheme } from '../../theme-setup';

//TODO: extract the phraseFilteSources to theme-setup
const phraseFiltersSources: Record<string, Function> = {};
phraseFiltersSources['opensador'] = require('./pickers/opensador')
phraseFiltersSources['oberlo'] = require('./pickers/oberlo')

function pickPhraseByFilter(filterName: string, source: string) {
  const [name, pages] = filterName.split(':')
  if (phraseFiltersSources[source]) {
    return phraseFiltersSources[source]({ 
      name: name || 'frases_de_motivacao', 
      pages: pages || 900
    })();
  }
  return phraseFiltersSources['opensador']({name: 'frases_de_motivacao', pages: 900})();
}

async function pickPhraseByTheme(theme: string) {
  const choosenTheme = pickTheme(theme).phrases;
  const choosenFilter = randomItem(choosenTheme);
  return pickPhraseByFilter(choosenFilter.filter, choosenFilter.source);
}

async function pickPhrase(context: any) {
  if (context.phrase) return context.phrase;
  if (context.phraseFilter) return await pickPhraseByFilter(context.phraseFilter, context.phraseSource);
  if (context.theme) return await pickPhraseByTheme(context.theme);
  return await pickPhraseByTheme('default')
}

export default async function generatePhrase(context: any) {
  context.phrase = await pickPhrase(context);
  await drawTextImage(context.phrase, 'phrase', context.uuid, {gravity: 'west', size:'600x600'});
}