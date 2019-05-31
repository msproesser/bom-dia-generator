const axios = require('axios');
const host = require('../config').host;
module.exports = async function(context) {
  if (context.send) {
    //googleSender(context)
  }
}

async function googleSender(context) {
  const message = buildGMessage(context);
  const response = await axios.post('https://chat.googleapis.com/v1/spaces/AAAAJ1mYa0U/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=MKyc3vYVE7E5WK17omBBWJ1jF4pwFtJ9SVBt1tGOm8Q%3D', message)
}

function buildGMessage(context) {
  return {
    cards: {
      header: {
        title: context.title,
        imageUrl: "https://images.vexels.com/media/users/3/145134/isolated/preview/46b65a02ff99e7bb4e84d4d3d627a729-sun-sharp-beams-icon-by-vexels.png"
      },
      sections: [
        {
          widgets: [
            {
              image: {
                imageUrl: `${host}/bom-dia?id=${context.uuid}`
              }
            },
            {
              textParagraph: {
                text: context.phrase.replace('\n', '<br>')
              }
            }
          ]
        }
      ]
    }
  }
}