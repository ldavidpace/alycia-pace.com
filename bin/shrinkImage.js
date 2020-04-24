var jimp = require('jimp');

module.exports = (filePath, outFilePath) => {
  console.log(filePath, "to", outFilePath);
  return jimp.read(filePath).then((j) => {
    const thumb = j.clone();
    thumb.cover(295, 295)
    .deflateLevel(8)
    .write(outFilePath);
  });
}