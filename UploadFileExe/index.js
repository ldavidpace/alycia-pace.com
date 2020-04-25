const fs = require('fs');
const ncp = require('ncp').ncp;
const path = require('path');
const readline = require('readline');
var {exec} = require("child_process");
var genImageFile = require('..\\bin\\picGen');

const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

var deleteFolderRecursive = async function(folder, leaveDir) {
  console.log('checking for folder', folder);
  
  if (fs.existsSync(folder)) {
    console.log('deleteing folder');
    fs.readdirSync(folder).forEach(async (file, index) => {
      const curPath = path.join(folder, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        await deleteFolderRecursive(curPath);
      } else { // delete file
        await new Promise((resolve) => fs.unlink(curPath, () => resolve()))
      }
    });
    if (!leaveDir) {
      return new Promise( resolve => fs.rmdir(folder, () => resolve()));
    }
  }
};

module.exports = async (destinationPath) => {
  if (!destinationPath) {
    destinationPath = path.resolve(__dirname, '..');
  }
  const imgeFolderDest = path.resolve(destinationPath, 'src/images');
  let folderOfImages = '';
  if (process.argv[2]) {
    folderOfImages = process.argv[2]
  } else {
    folderOfImages = await askQuestion("This only works if you drag and drop and image.");
  }
  console.log(folderOfImages);
  console.log(imgeFolderDest);
  console.log(destinationPath);
  try {

    await deleteFolderRecursive(imgeFolderDest);

    await new Promise((resolve) => ncp(process.argv[2], imgeFolderDest, (err) => {
      if (err) { 
        console.error(err);
        return;
      }
      resolve();
    }));
  
    genImageFile(imgeFolderDest);
    
    const answer = await askQuestion("We are finished. Just press enter and wait for the window to close");
    console.log(answer);
  } catch(err) {
    console.log(err);
    const answer = await askQuestion("We have failed. Just press enter");
    console.log(answer);
  }

  }