const crypto = require('crypto');

exports.randomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

exports.md5Of = function(text) {
  // return crypto.createHash('md5').update(text).digest("hex").substring(0, 10)
  return 'background';
}