/*TODO:
implement new display options to text
implement new parametrizations to input
implement senders
add logs to steps
*/
const uuid = require('uuid/v4')
const generateBackground = require('./job-steps/generate-background');
const generatePhrase = require('./job-steps/generate-phrase');
const generateTitle = require('./job-steps/generate-title');
const mergeImages = require('./job-steps/commons/image-utils').mergeImages;
const tagFinalImage = require('./job-steps/commons/image-utils').tagFinalImage;

module.exports = function generate(context) {
  context.uuid = uuid();
  return Promise.all([
    generateBackground(context),
    generatePhrase(context),
    generateTitle(context)
  ])
  .then(() => mergeImages(context))
  .then(() => tagFinalImage(context))
  .catch((e) => console.log('error is', e))
  .then(() => cleanup(context))
  .then(() => shareImage(context))
  .then(() => context)
}

async function cleanup(context) {
  const util = require('util');
  const exec = util.promisify(require('child_process').exec);
  await exec(`rm ./atmp/${context.uuid}*`)
}

async function shareImage(context) {
  await require('./senders')(context)
}