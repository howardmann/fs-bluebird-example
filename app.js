// Use Bluebird promise library to promisify fs module
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var readableStream = fs.createReadStream('./file.txt');
var data = '';
var writeableStream = fs.createWriteStream('./destination.txt');

// readableStream.pipe(writeableStream)
// Set data as string utf8 format, otherwise is emitted as buffer digits
readableStream.setEncoding('utf8');

readableStream.on('data', function(chunk) {
  writeableStream.write(chunk);
    // data += chunk;
});

readableStream.on('end', function() {
    console.log(data);
});

// FS syncrhonous callback hell. Read file, write it and check it was written
fs.readFile('./destination.txt', 'utf8', function(err, file){
  if (err) {
    console.log(err);
  } else {
    fs.writeFile('./banana.txt', file, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('File written');
        fs.readFile('./banana.txt', 'utf8', function(err, file){
          console.log(file, 'banana');
        })
      }
    });
  }
});

// Promosiy above code
fs.readFileAsync('./destination.txt', 'utf8')
  .then(file => {
    return fs.writeFileAsync('./banana2.txt', file);
  })
  .then(()=> {
    return fs.readFileAsync('./banana2.txt', 'utf8');
  })
  .then((data) => {
    console.log('Banana2:', data);
  })
  .catch(err => console.log(err))
