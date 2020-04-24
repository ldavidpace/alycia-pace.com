const ncp = require('ncp').ncp;
const path = require('path');
const readline = require('readline');
var cmd = require('node-cmd');

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

module.exports = async (destinationPath) => {
  if (!destinationPath) {
    destinationPath = path.resolve(__dirname, '..');
  }
  let folderOfImages = '';
  if (process.argv[2]) {
    folderOfImages = process.argv[2];
  } else {
    const answer = await askQuestion("This only works if you drag and drop and image.");
  }

  await new Promise((resolve) => ncp(process.argv[2], path.resolve(destinationPath, 'src/images'), (err) => {
    if (err){ 
      console.error(err);
      return;
    }
    resolve();
  }));

  cmd.get(`cd ${destinationPath}`);
  console.log("Current Directory", __dirname);

  const answer = await askQuestion("We are finished. Just press enter");
  console.log(answer);
}