const { TesseractWorker } = require('tesseract.js');
const path = require('path');

const worker = new TesseractWorker({
  langPath: path.join(__dirname, '..', 'lang-data'), 
});

worker
  .recognize(path.join(__dirname, '..', 'images', 'id.jpg'))
  .progress((info) => {
    console.log(info);
  })
  .then((result) => {
    console.log(result.text);
    process.exit();
  });
