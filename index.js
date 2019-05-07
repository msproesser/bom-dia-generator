
async function printContext(context) {
  console.log('final context', context);
} 

async function generateMainText(context) {
  context.mainText = context.mainText || 'Bom dia!';
}

async function main(options) {
  const context = {
    mainText: options && options.mainText,
    phrase: options && options.phrase,
    url: options && options.bgUrl
  };
/*TODO: resize image bg before compose final image to keep same proportion
implement new display options to text

*/
  const steps = [
    require('./job-steps/background-picker').default,
    require('./job-steps/phrase-generator').default,
    generateMainText,
    require('./job-steps/url-downloader').default,
    require('./job-steps/image-composer').default,
    printContext
  ]

  for (const step of steps) {
    try {
      step && await step(context);
    } catch (error) {
      console.log('error:', error)
    }
  }
}
exports.main = main;
