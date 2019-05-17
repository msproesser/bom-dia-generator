const app = require('express')();
const bomDiaGenerator = require('./bom-dia-generator');
const fs = require('fs');

app.get('/generate', (req, res) => {
  console.log('new request received', req.query);

  bomDiaGenerator(req.query).then((context) => {
    console.log('request processed');
    res.setHeader('Content-Type', 'image/jpg');
    res.setHeader('original-background', context.background);
    res.setHeader('choosen-phrase', context.phrase);
    res.setHeader('choosen-title', context.title);
    
    res.end(fs.readFileSync(`./final-imgs/${context.uuid}-final.jpg`), 'binary');
  })
})

app.get('/bom-dia', (req, res) => {
  res.setHeader('Content-Type', 'image/jpg');
  res.end(fs.readFileSync(`./final-imgs/${req.query.id}-final.jpg`), 'binary');
})

app.listen(3000);