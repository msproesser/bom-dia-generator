/*TODO:
reestructure the step flow
implement new display options to text
implement new parametrizations to input
how to opmtimize the operations with idle (background download, html download/render)
make possible the concurrency
implement senders
add logs to steps
*/
const uuid = require('uuid/v4')
const generateBackground = require('./job-steps/generate-background');
const generatePhrase = require('./job-steps/generate-phrase');
const generateTitle = require('./job-steps/generate-title');
const mergeImages = require('./job-steps/commons/merge-images');

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
  .then(() => context)
}

async function tagFinalImage(context) {

}

async function cleanup(context) {
  
}