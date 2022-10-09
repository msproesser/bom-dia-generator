import downloadImage from '../commons/url-downloader';
import { randomItem } from '../../utils';
import { pickTheme, pickBackgroundFilter } from '../../theme-setup';

const backgroundFilterSources: any = {
  default: require('./pickers/pixabay'),
  pixabay: require('./pickers/pixabay'),
}

function pickBackgroundByTheme(theme: string) {
  const choosenTheme = pickTheme(theme).backgrounds;
  const choosenFilter = randomItem(choosenTheme);
  return filterPicker(choosenFilter);
}

function filterPicker(filterName: string) {
  const backgroundFilter = pickBackgroundFilter(filterName).value;
  const filterSource = backgroundFilterSources[backgroundFilter.source] || backgroundFilterSources['default']
  return filterSource(backgroundFilter)()
}

async function pickUrl(context: any) {
  if (context.background) return context.background;
  if (context.backgroundFilter) return await filterPicker(context.backgroundFilter);
  if (context.theme) return await pickBackgroundByTheme(context.theme);
  return await pickBackgroundByTheme('default')
}

export default async function generateBackground(context: any) {
  context.background = await pickUrl(context);
  await downloadImage(context.background, 'background', context.uuid);
}