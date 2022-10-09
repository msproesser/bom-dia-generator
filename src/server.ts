const app = require('express')();
import bomDiaGenerator from './bom-dia-generator';
import fs from 'fs';

app.get('/generate', (req: any, res: any) => {
  console.log('new request received');
  console.log(JSON.stringify(req.query, null, 2) + '\n');
  bomDiaGenerator(req.query).then((context: any) => {
    console.log('request processed ok\n###################\n');
    res.setHeader('Content-Type', 'image/jpg');
    //res.setHeader('original-background', context.background);
    //res.setHeader('choosen-phrase', context.phrase);
    //res.setHeader('choosen-title', context.title);
    
    res.end(fs.readFileSync(`./final-imgs/${context.uuid}-final.jpg`), 'binary');
  }).catch((error:any) => {
    res.status(500).send('<pre>' + JSON.stringify({message: error.message, stack: error.stack}, null, 3).split('\\n').join('<br>') + '</pre>');
  })
})

app.get('/bom-dia', (req: any, res: any) => {
  res.setHeader('Content-Type', 'image/jpg');
  res.end(fs.readFileSync(`./final-imgs/${req.query.id}-final.jpg`), 'binary');
})

app.listen(3000);