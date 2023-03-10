import * as express from 'express';
import * as path from 'path';
const app = express();

app.use(express.static(__dirname + '/../build'));


app.get('*', (request, response) => {  
  console.log(`Request for ${request.path} forwarded proto ${request.headers['x-forwarded-proto']}`)
  if (process.env.NODE_ENV != 'development' && request.headers['x-forwarded-proto'] !== 'https') {
    return response.redirect("https://" + request.headers.host + request.url);
 }

  response.sendFile(path.resolve(__dirname,'../build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));