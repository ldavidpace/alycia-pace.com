const fs = require('fs');
const imagesFolder = './src/images'; 
let output = 'export default [';
const files = fs.readdirSync(imagesFolder);
files.forEach((file) => {
  const folderPath = imagesFolder + '/' + file; 
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
    output += '\nthumbnail: require(\'' + imgStats[0].url + '\'),';
    output += '\nimages: [' + imgStats.filter((imgStat,index) => index !== 0).map(imgStat => '\nrequire(\''+ imgStat.url + '\')').join() + '\n]',
    output += '\n},';
  }
});

output += '\n];';

fs.writeFile(imagesFolder + '/javascriptGenImages.ts', output, (error) => {
  if(!error){
    console.log('success');
  }
});