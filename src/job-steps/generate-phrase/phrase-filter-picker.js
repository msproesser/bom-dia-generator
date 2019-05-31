const phraseFilters = {};
phraseFilters['opensador'] = require('./pickers/opensador')
module.exports = function(filterName, source = 'opensador') {
  const [name, pages] = filterName.split(':')
  if (phraseFilters[source]) {
    return phraseFilters[source]({
      name: name || 'frases_de_motivacao', 
      pages: pages || 900
    })();
  }
  return phraseFilters['opensador']({name: 'frases_de_motivacao', pages: 900})();
}