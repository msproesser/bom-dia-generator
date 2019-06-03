function kv(key: string, value: any) {
  return {key, value}
}

interface PixaBayFilterOptions {
  query: string,
  category: string,
  page: number,
  source?: string
}
function pixabayFilter(options: PixaBayFilterOptions) {
  options.source = 'pixabay';
  return options;
}
interface SourceFilter {
  source: string,
  filter: string
}

const themes: any = {
  backgroundFilters: [
    kv('default', pixabayFilter({query: 'sunrise+landscape', category: 'nature', page: 1})),
    kv('pixabay.bom-dia', pixabayFilter({query: 'sunrise+landscape', category: 'nature', page: 1})),
    kv('pixabay.boa-tarde', pixabayFilter({query: 'sunset', category: 'nature', page: 1})),
    kv('pixabay.boa-noite', pixabayFilter({query: 'night', category: 'nature', page: 1})),
    kv('pixabay.naruto', pixabayFilter({query: 'ninja', category: 'all', page: 1}))
  ]
};
function addTheme(name: string, backgrounds: Array<string>, phrases: Array<SourceFilter>, titles: Array<string>) {
  themes[name] = { backgrounds, phrases, titles };
}
addTheme('default', 
  ['default'], 
  [
    {source: 'opensador', filter: 'frases_de_motivacao:900'},
    {source: 'opensador', filter: 'pensamentos_filosoficos:15'}
  ], 
  ['Bom dia!']
);

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
module.exports = themes;