const app = require('express')();
const bomDiaGenerator = require('./index.js').main;
const fs = require('fs');

app.get('/bom-dia', (req, res) => {
  bomDiaGenerator().then(() => {
    res.setHeader('Content-Type', 'image/png');
    res.end(fs.readFileSync('./atmp/final.png'), 'binary');
  })
})

app.listen(3000);