const fs = require('fs');
const path = require('path');


fs.writeFileSync(path.resolve(__dirname, 'dist/bin.js'), `
  const uploadFiles = require('..');

  uploadFiles("${path.resolve(__dirname, '..')}");

`);