import axios from 'axios';
import cheerio from 'cheerio';
import {randomItem, randomInt} from '../../../utils';

module.exports = function generatePhrase(filterOptions: any) {
  return async function() {
    const filter = filterOptions.name;
    const maxSize = filterOptions.pages || 900;
    const pageReponse = await axios.get('https://www.pensador.com/'+filter+'/'+randomInt(maxSize));
    const page = cheerio.load(pageReponse.data);
    const phrases = page('div.thought-card p.frase').get();
    return randomItem(phrases).children.reduce((sum: any, child: { type: string; data: any; }) => child.type == 'text' ? sum + child.data : sum , '')
  }
}