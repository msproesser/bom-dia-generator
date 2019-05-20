const phraseFilters = {};
phraseFilters['default'] = require('./pickers/opensador')({name: 'frases_de_motivacao', pages: 900});

module.exports = function(filterName) {
  const choosenFilter = phraseFilters[filterName] || phraseFilters['default'];
  return choosenFilter();
}