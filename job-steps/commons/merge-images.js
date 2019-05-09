const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async function(context) {
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
  
    //reduce the shit size
    await exec(`convert ./atmp/${context.uuid}-final.png -resize 600x ./atmp/${context.uuid}-final.png`)
    console.log(`merged images for ${context.uuid}`);
}