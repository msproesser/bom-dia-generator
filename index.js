
async function printContext(context) {
  console.log('final context', context);
} 

async function generateMainText(context) {
  context.mainText = context.mainText || 'Bom dia!';
}

async function main() {
  const context = {
    // url: 'https://cdn.pixabay.com/photo/2013/10/02/23/03/dog-190056_960_720.jpg',
    mainText: 'Bom dia!',
    // phrase: 'Capota gostoso que amanhã tem mais, é luta todo dia'
  };
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
