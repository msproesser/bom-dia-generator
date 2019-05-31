const randomInt = require('../../utils').randomInt;
function t(source, filter, page) { return {source, filter: `${filter}:${page}`} }
function opensador(filter, page) { return t('opensador', filter, page) }
const themes = {}
themes['default'] = [
  opensador('frases_de_moticavao', 900),
]

const filterPicker = require('./phrase-filter-picker')
module.exports = async function(theme) {
  const choosenTheme = themes[theme] || themes['default'];
  const choosenFilter = choosenTheme[randomInt(choosenTheme.length)];
  return filterPicker(choosenFilter.filter, choosenFilter.page);
}