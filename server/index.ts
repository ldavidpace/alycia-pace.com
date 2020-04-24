import * as express from 'express';
import * as path from 'path';
const app = express();


app.use(express.static(__dirname + '/../build'));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'../build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));