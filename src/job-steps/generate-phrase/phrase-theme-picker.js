import { randomInt } from '../../utils';
function t(source, filter, page) { return {source, filter: `${filter}:${page}`} }
function opensador(filter, page) { return t('opensador', filter, page) }
const themes = {}
themes['default'] = [
  opensador('frases_de_moticavao', 900),
  opensador('pensamentos_filosoficos', 10)
];

themes['ninja'] = [
  opensador('naruto', 8)
];

import filterPicker from './phrase-filter-picker';

export default async function(theme) {
  const choosenTheme = themes[theme] || themes['default'];
  const choosenFilter = choosenTheme[randomInt(choosenTheme.length)];
  return filterPicker(choosenFilter.filter, choosenFilter.page);
}