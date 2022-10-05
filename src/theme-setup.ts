function kv(key: string, value: any) {
  return {key, value}
}

interface FilterOptions {
  query: string,
  category: string,
  page: number,
  source?: string
}

interface Theme {
  key: string,
  backgrounds: Array<string>,
  phrases: Array<SourceFilter>,
  titles: Array<string>,
}

interface SourceFilter {
  source: string,
  filter: string
}
function pixabayFilter(options: FilterOptions) {
  options.source = 'pixabay';
  return options;
}

const defaultBackgroundFilter = kv('default', pixabayFilter({query: 'sunrise+landscape', category: 'nature', page: 1}));

const backgroundFilters = [
  defaultBackgroundFilter,
  kv('pixabay.bom-dia', pixabayFilter({query: 'sunrise+landscape', category: 'nature', page: 1})),
  kv('pixabay.boa-tarde', pixabayFilter({query: 'sunset', category: 'nature', page: 1})),
  kv('pixabay.boa-noite', pixabayFilter({query: 'night', category: 'nature', page: 1})),
  kv('pixabay.naruto', pixabayFilter({query: 'ninja', category: 'all', page: 1}))
]

const themes: Array<Theme> = [];
function addTheme(name: string, backgrounds: Array<string>, phrases: Array<SourceFilter>, titles: Array<string>) {
  themes.push({ key: name, backgrounds, phrases, titles });
}

const defaultTheme: Theme = {
  key: 'default',
  backgrounds: ['default'],
  phrases: [
    {source: 'opensador', filter: 'frases_de_motivacao:900'},
    {source: 'opensador', filter: 'pensamentos_filosoficos:15'}
  ],
  titles: ['Bom dia!']
}
themes.push(defaultTheme);

addTheme('bom-dia', 
  ['pixabay.sunrise'],
  [
    {source: 'opensador', filter: 'frases_de_motivacao:900'},
    {source: 'opensador', filter: 'pensamentos_filosoficos:15'}
  ],
  ['Bom dia!']
);

addTheme('boa-tarde', 
  ['pixabay.sunset'],
  [
    {source: 'opensador', filter: 'frases_de_motivacao:900'},
    {source: 'opensador', filter: 'pensamentos_filosoficos:15'}
  ],
  ['Boa tarde!']
);

addTheme('boa-noite', 
  ['pixabay.night'],
  [
    {source: 'opensador', filter: 'frases_de_motivacao:900'},
    {source: 'opensador', filter: 'pensamentos_filosoficos:15'}
  ],
  ['Boa noite!']
);

function pickTheme(themeName: string) : Theme {
  const theme: Theme = themes.filter(theme => theme.key === themeName)[0]
  return theme || defaultTheme;
}

function pickBackgroundFilter(filterName: string) {
  return backgroundFilters.filter(filter => filter.key === filterName)[0] || defaultBackgroundFilter;
}
export {pickTheme, pickBackgroundFilter};