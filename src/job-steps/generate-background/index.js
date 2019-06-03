import pickBackgroundByFilter from './background-filter-picker';
import pickBackgroundByTheme from './background-theme-picker';
import downloadImage from '../commons/url-downloader';

async function pickUrl(context) {
  if (context.background) return context.background;
  if (context.backgroundFilter) return await pickBackgroundByFilter(context.backgroundFilter);
  if (context.theme) return await pickBackgroundByTheme(context.theme);
  return await pickBackgroundByTheme('default')
}

export default async function generateBackground(context) {
  context.background = await pickUrl(context);
  await downloadImage(context.background, 'background', context.uuid);
}
