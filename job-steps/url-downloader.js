const axios = require('axios');
const fs = require('fs');

exports.default = async function(context) {
  const imgResponse = await axios.get(context.url, {responseType: 'arraybuffer'});
  fs.writeFileSync(`./atmp/background.jpg`, imgResponse.data);
}
