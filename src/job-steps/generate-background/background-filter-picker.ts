const backgroundFilters: any = {};

import pixabayPicker from './pickers/pixabay';

backgroundFilters['default'] = pixabayPicker({ query: 'sunrise+landscape', category: 'nature', page:1 });
backgroundFilters['pixabay.sunrise'] = pixabayPicker({ query: 'sunrise+landscape', category: 'nature', page:1 });
backgroundFilters['pixabay.sunset'] = pixabayPicker({ query: 'sunset', category: 'nature', page:1 });
backgroundFilters['pixabay.night'] = pixabayPicker({ query: 'night', category: 'nature', page:1 });
backgroundFilters['pixabay.naruto'] = pixabayPicker({ query: 'ninja', category: 'all', page: 1 })

module.exports = function(filterName: string) {
  const choosenFilter = backgroundFilters[filterName] || backgroundFilters['default'];
  return choosenFilter();
}
