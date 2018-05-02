const fs = require('fs');
const imagesFolder = './src/images'; 
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
    output += '\n{';
    output += '\nname: \'' + file + '\',';
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
    
    if(imgStats[0].name.toLowerCase() !== 'small.jpg'){
      console.log('brokend', file);
    }
    console.log(imgStats);
    output += '\nthumbnail: require(\'./' + parentFile + '/' + imgStats[0].url.substr(2) + '\'),';
    output += '\nimages: [' + imgStats.filter((imgStat,index) => index !== 0).map(imgStat => '\nrequire(\'./' + parentFile + '/' + imgStat.url.substr(2) + '\')').join() + '\n]',
    output += '\n},';
  }
  return output;
}