import axios from 'axios';
import cheerio from 'cheerio';
import {randomItem} from '../../../utils';

module.exports = function generatePhrase(filterOptions: any) {
  return async function() {
    const pageReponse = await axios.get('https://www.oberlo.com/blog/motivational-quotes');
    const page = cheerio.load(pageReponse.data);
    const phrases = page('div#article-content li > span').get();
    return randomItem(phrases).children.reduce((sum: any, child: { type: string; data: any; }) => child.type == 'text' ? sum + child.data : sum , '')
  }
}