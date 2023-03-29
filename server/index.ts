import * as express from 'express';
import runServer from './runServer';


const app = express();

runServer(app);

const port = process.env.PORT || 3000;

export default app.listen(port, () => console.log(`app listening on port ${port}!`));