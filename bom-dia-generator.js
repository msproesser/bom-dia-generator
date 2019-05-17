/*TODO:
use dependency injection?
implement new display options to text
implement new parametrizations to input
implement better error handlers
implement senders
add logs (winston) to steps
how to swagger
optimize CI/CD
  docker image
  container auto update on push
*/

/**
 * ways to pick a image/phrase/title by priority
 * 1. manual input (choose what you want using parameters url/phrase/title)
 * 2. by custom filter (ex: image-filter=sunset+paradise or phrase-filter=clarisse_lispector)
 * 3. by theme (ex: theme=bom-dia or theme=positivity)
 * 
 * DEFAULT: theme = bom dia generator
 * 
 */
const uuid = require('uuid/v4')
const generateBackground = require('./job-steps/generate-background');
const generatePhrase = require('./job-steps/generate-phrase');
const generateTitle = require('./job-steps/generate-title');
const mergeImages = require('./job-steps/commons/image-utils').mergeImages;
const tagFinalImage = require('./job-steps/commons/image-utils').tagFinalImage;

module.exports = async function generate(context) {
  context.uuid = uuid();
  try {
    await Promise.all([
      generateBackground(context),
      generatePhrase(context),
      generateTitle(context)
    ])
    await mergeImages(context)
    await tagFinalImage(context)
    await cleanup(context)
    await shareImage(context)
  } catch(e) {
    console.log('error is', e)
  }
  return context
}

async function cleanup(context) {
  const util = require('util');
  const exec = util.promisify(require('child_process').exec);
  await exec(`rm ./atmp/${context.uuid}*`)
}

async function shareImage(context) {
  await require('./senders')(context)
}