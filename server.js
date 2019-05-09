const app = require('express')();
const bomDiaGenerator = require('./bom-dia-generator');
const fs = require('fs');

app.get('/bom-dia', (req, res) => {
  console.log('new request received', req.query);

  bomDiaGenerator(req.query).then((context) => {
    console.log('request processed');
    res.setHeader('Content-Type', 'image/png');
    res.end(fs.readFileSync(`./final-imgs/${context.uuid}-final.jpg`), 'binary');
  })
})

app.listen(3000);