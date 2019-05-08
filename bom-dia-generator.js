/*TODO:
reestructure the step flow
implement new display options to text
implement new parametrizations to input
how to opmtimize the operations with idle (background download, html download/render)
make possible the concurrency
implement senders
*/
const uuid = require('uuid/v4')
module.exports = async function generate(context) {
  context.uuid = uuid();
  await Promise.all([
    //process and prepare background image
    generateBackground(context),
    //process and prepare phrase image
    generatePhrase(context),
    //process and prepare title image
    generateTitle(context)
  ])
  .then(() => mergeImages(context))
  .then(() => tagFinalImage(context))
  .finally(() => cleanup(context))
  .then(() => context)
}

async function generateBackground(context) {

}

async function generatePhrase(context) {

}

async function generateTitle(context) {

}

async function mergeImages(context) {

}

async function tagFinalImage(context) {

}

async function cleanup(context) {
  
}