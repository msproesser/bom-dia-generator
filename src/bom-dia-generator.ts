/*TODO:
implement new display options to text
implement new parametrizations to input
implement better error handlers
implement senders (email)
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
import uuid from 'uuid/v4';
import generateBackground from './job-steps/generate-background';
import generatePhrase from './job-steps/generate-phrase';
import generateTitle from './job-steps/generate-title';
import {mergeImages} from './job-steps/commons/image-utils';
import {tagFinalImage} from './job-steps/commons/image-utils';
import senders from './senders';

interface Context {
  uuid: string;
  bla: string;
}

module.exports = async function generate(context: Context) {
  context.uuid = uuid();
  await handleError(Promise.all([
    handleError(generateBackground(context), 'generateBackground'),
    handleError(generatePhrase(context), 'generatePhrase'),
    handleError(generateTitle(context), 'generateTitle'),
  ]), 'Promise.all imageGeneration');
  await handleError(mergeImages(context), 'mergeImages');
  await handleError(tagFinalImage(context), 'tagFinalImage');
  await handleError(cleanup(context), 'cleanup');
  await handleError(senders(context), 'senders');

  return context
}

function handleError(promise: Promise<any>, location: String) {
  return promise
  .then(details => console.log(`[STEP:  ${location} ]: finished`, details || ''))
  .catch(error => {
    const message = `[ ${location} ]:ERROR IS>: ${error.message}`;
    console.log(message);
    throw new Error(message);
  });
}

async function cleanup(context: Context) {
  const util = require('util');
  const exec = util.promisify(require('child_process').exec);
  await exec(`rm ./atmp/${context.uuid}*`)
}
