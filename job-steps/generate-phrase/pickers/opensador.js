const axios = require('axios');
const cheerio = require('cheerio');
const randomInt = require('../../utils').randomInt;

exports.default = async function generatePhrase(filterOptions) {
  const filter = filterOptions.name;
  const maxSize = filterOptions.pages || 900;
  const pageReponse = await axios.get('https://www.pensador.com/'+filter+'/'+randomInt(maxSize));
  const page = cheerio.load(pageReponse.data);
  const phrases = page('div.thought-card p.frase').get();
  return phrases[randomInt(phrases.length)].children.reduce((sum, child) => child.type == 'text' ? sum + child.data : sum , '')
}