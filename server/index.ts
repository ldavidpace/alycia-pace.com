import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

import createQuestionAdminEndpoints from './admin/admin';

const app = express();

app.use((request, response, next) => {
    if (process.env.NODE_ENV != 'development' && request.headers['x-forwarded-proto'] !== 'https') {
      return response.redirect("https://" + request.headers.host + request.url);
   }
   return next();
});

app.use(express.static(__dirname + '/../dist/'));
app.get('*', (request, response) => {
  if (request.hostname.includes('quiz.')) {
    response.sendFile(path.resolve(__dirname, '../dist/quiz/index.html'));
  } else {
    response.sendFile(path.join(path.resolve(__dirname,'../dist/portfolio/index.html')));
  }
});

createQuestionAdminEndpoints(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));