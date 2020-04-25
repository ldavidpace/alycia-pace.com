
const fs = require('fs');
const shrink = require('./shrinkImage');



module.exports = (imagesFolder) => {

let output = 'export default [';
const files = fs.readdirSync(imagesFolder);




files.forEach((file) => {
  const folderPath = imagesFolder + '/' + file; 
  const stat = fs.statSync(folderPath);
  if (stat.isDirectory()){
    output += '\n{';
    output += '\nname: \'' + file + '\',';
    output += '\ncontents: [';
    const tabFiles = fs.readdirSync(folderPath);
    tabFiles.forEach((tFile) => {
      output += getStructForImageFolder(file, tFile);
    });
    output += '\n]},\n'
  }
  output += getStructForImageFolder(file)  
});

output += '\n];';

fs.writeFile(imagesFolder + '/javascriptGenImages.ts', output, (error) => {
  if(!error){
    console.log('success');
  }
});

function getStructForImageFolder(parentFile, file) {
  if(!parentFile || !file) return '';
  let output = '';
  const folderPath = imagesFolder + '/' + parentFile + '/' + file; 
  const stat = fs.statSync(folderPath);
  if(stat.isDirectory()) {
    imgFiles = fs.readdirSync(folderPath);
    const imgStats = imgFiles.map(imgFile => {
      return {
        name: imgFile,
        url: './' + file + '/' + imgFile,
        ...fs.statSync(folderPath + '/' + imgFile),
      }
    });
    imgStats.sort((a,b) => {
      if(a.name.toLowerCase() === 'small.jpg'){
        return -1;
      }
      if(b.name.toLowerCase() === 'small.jpg') {
        return 1;
      }
      return a.size - b.size;
    });

    if (!imgStats.length) return '';
    
    if(imgStats[0].name.toLowerCase() !== 'small.jpg'){
      console.log('brokend', file);
    }
    
    output += '\n{';
    output += '\nname: \'' + file + '\',';

    shrink(folderPath + '/' + imgStats[0].name, folderPath + '/' + 'thumbnail.jpg').then(() => {process.stdout.write('.')}).catch(() => {console.log('Something went wrong writing', file)});
    output += '\nthumbnail: require(\'./' + parentFile + '/' + file +'/thumbnail.jpg\'),';
    output += '\nimages: [' + imgStats.filter(image => !image.name.toLowerCase().includes('small')).map(imgStat => '\nrequire(\'./' + parentFile + '/' + imgStat.url.substr(2) + '\')').join() + '\n]',
    output += '\n},';
  }
  return output;
}
}

