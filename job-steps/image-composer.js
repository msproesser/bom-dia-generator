const gm = require('gm').subClass({ imageMagick: true });
const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.default = async function(context) {

  //do title
  await exec(`convert \\
  -background transparent \\
  -fill white \
  -font 'Fawn-Script' \\
  -size 465x \\
  -gravity center \\
  label:'${context.mainText}' \\
  \\( +clone \\
  -background black \\
  -shadow 200x10+2+2 \\) +swap \\
  -background transparent \\
  -layers merge \\
  ./atmp/title.png `);

  //do phrase
  await exec(`convert \\
  -background transparent \\
  -fill white \
  -font 'Fawn-Script' \\
  -size 600x600 \\
  -gravity west \\
  caption:'${context.phrase}' \\
  \\( +clone \\
  -background black \\
  -shadow 200x10+2+2 \\) +swap \\
  -background transparent \\
  -layers merge \\
  ./atmp/prhase.png `);

  //concat the phrase to background 
  await exec(`composite \\
  -compose atop \\
  -gravity West \\
  -dissolve 92 \\
  ./atmp/prhase.png \\
  ./atmp/background.jpg \\
  ./atmp/final.png
  `);

  //concat the title to pre-final(background) 
  await exec(`composite \\
  -compose atop \\
  -gravity SouthEast \\
  -dissolve 68 \\
  ./atmp/title.png \\
  ./atmp/final.png \\
  ./atmp/final.png
  `);

  //reduce the shit size
  await exec(`convert ./atmp/final.png -resize 600x ./atmp/final.png`)
}