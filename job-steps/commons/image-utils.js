const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.mergeImages = async function(context) {
    console.log('starting merge');
    await exec(`convert -resize 1200x ./atmp/${context.uuid}-background.jpg ./atmp/${context.uuid}-final.png`)

    //concat the phrase to background 
    await exec(`composite \\
    -compose atop \\
    -gravity West \\
    -dissolve 90 \\
    ./atmp/${context.uuid}-phrase.png \\
    ./atmp/${context.uuid}-final.png \\
    ./atmp/${context.uuid}-final.png
    `);
  
    //concat the title to pre-final(background) 
    await exec(`composite \\
    -compose atop \\
    -gravity SouthEast \\
    -dissolve 68 \\
    ./atmp/${context.uuid}-title.png \\
    ./atmp/${context.uuid}-final.png \\
    ./atmp/${context.uuid}-final.png
    `);
    console.log(`merged images for ${context.uuid}`);
}

exports.drawTextImage = async function(text, filename, prefix, {gravity = 'center', size, textType = 'caption'}) {
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

exports.tagFinalImage = async function(context) {
  await exec(`convert ./atmp/${context.uuid}-final.png -resize 600x ./atmp/${context.uuid}-final.png`)
  await exec(`convert -strip -interlace Plane -quality 85% ./atmp/${context.uuid}-final.png ./final-imgs/${context.uuid}-final.jpg`)
}