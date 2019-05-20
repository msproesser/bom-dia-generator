const randomInt = require('../../utils').randomInt;

const themes = {}
themes['default'] = ['default']

const filterPicker = require('./phrase-filter-picker')
module.exports = async function(theme) {
  const choosenTheme = themes[theme] || themes['default'];
  const choosenFilter = choosenTheme[randomInt(choosenTheme.length)];
  return filterPicker(choosenFilter);
}