import { drawTextImage as drawPhraseImage } from '../commons/image-utils';
import {pickTheme} from '../../theme-setup';
import {randomInt} from '../../utils'
function pickTitle(context: any) {
  if (context.title) return context.title;
  if(context.theme) {
    const {titles} = pickTheme(context.theme)
    if (titles.length > 0) {
      return titles[randomInt(titles.length)]
    }
  }
  return "Bom dia!";
}

export default async function generateTitle(context: any) {
  const title = pickTitle(context);
  await drawPhraseImage(title, 'title', context.uuid, {gravity: 'center', size:'465x', textType: 'label'});
}