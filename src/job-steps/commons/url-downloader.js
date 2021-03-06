const axios = require('axios');
const fs = require('fs');

module.exports = async function(url, filename, prefix) {
  const imgResponse = await axios.get(url, {responseType: 'arraybuffer'});
  fs.writeFileSync(`./atmp/${prefix}-${filename}.jpg`, imgResponse.data);
  return `${filename} downloaded`;
}