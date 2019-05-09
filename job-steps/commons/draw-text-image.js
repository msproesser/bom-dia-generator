const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async function(text, filename, prefix, {gravity = 'center', size, textType = 'caption'}) {
  const sizeSetting = size ? `-size ${size}` : '';

  await exec(`convert \\
  -background transparent \\
  -fill white \
  -font 'Fawn-Script' \\
  ${sizeSetting} \\
  -gravity ${gravity} \\
  ${textType}:'${text}' \\
  \\( +clone \\
  -background black \\
  -shadow 200x10+2+2 \\) +swap \\
  -background transparent \\
  -layers merge \\
  ./atmp/${prefix}-${filename}.png `);
  console.log(`${filename} drawn`)
}