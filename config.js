const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  }),
  defaultMeta: 'bom-dia-gen',
  transports: [ new winston.transports.Console() ]
})
module.exports = {
  logger: logger,
  pixabay : { 
    key: '2731329-87a8629b0d58340da0ce5289b'
  },
  host: 'http://35.243.180.5:3000'
} 
