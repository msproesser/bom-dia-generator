import { drawTextImage as drawPhraseImage } from '../commons/image-utils';


function pickTitle(context) {
  if (context.title) return context.title;
  return "Bom dia!";
}

export default async function generateTitle(context) {
  const title = pickTitle(context);
  await drawPhraseImage(title, 'title', context.uuid, {gravity: 'center', size:'465x', textType: 'label'});
}