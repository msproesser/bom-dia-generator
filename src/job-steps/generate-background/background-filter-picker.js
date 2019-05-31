const backgroundFilters = {};
backgroundFilters['default'] = require('./pickers/pixabay')({ query: 'sunrise+landscape', category: 'nature', page:1 });

module.exports = function(filterName) {
  const choosenFilter = backgroundFilters[filterName] || backgroundFilters['default'];
  return choosenFilter();
}
