var jimp = require('jimp');

module.exports = (filePath, outFilePath) => {
  return jimp.read(filePath).then((j) => {
    const thumb = j.clone();
    thumb.cover(295, 295)
    .quality(60)
    .write(outFilePath);
  });
}