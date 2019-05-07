const axios = require('axios');
const cheerio = require('cheerio');
const randomInt = require('../utils').randomInt;

exports.default = async function generatePhrase(context) {
  if (context.phrase) return;
  
  const pageReponse = await axios.get('https://www.pensador.com/frases_de_motivacao/'+randomInt(900));
  const page = cheerio.load(pageReponse.data);
  const phrases = page('div.thought-card p.frase').get();
  context.phrase = phrases[randomInt(phrases.length)].children.reduce((sum, child) => child.type == 'text' ? sum + child.data : sum , '')
}
