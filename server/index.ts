
import type {Express} from 'express';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

import createQuestionAdminEndpoints from './admin/admin';
import createAuthEndpoints from './auth/auth';
import {
  AUTH_HEADER, validateSession,
} from './auth/sessionUtils';
import createQuestionsEndpoints from './questions/questionsEndpoints';
import createQuizzesEndpoints from './quizzes/quizzes';


var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const runServer = (app: Express) => {
    // for parsing application/json
    app.use(bodyParser.json()); 

    // for parsing application/xwww-
    app.use(bodyParser.urlencoded({ extended: true })); 
    //form-urlencoded

    // for parsing multipart/form-data
    app.use(upload.any()); 

    app.use(cookieParser());

    app.use(express.static('public'));

    app.use(async (request, response, next) => {
        if (request.cookies[AUTH_HEADER]) {
            try {
                const session = await validateSession(request.cookies[AUTH_HEADER]); 
                request.session = session;
            } catch(err) {}
        }
        next();
    })


    createQuestionAdminEndpoints(app);
    createAuthEndpoints(app);
    createQuizzesEndpoints(app);
    createQuestionsEndpoints(app);

    app.use(express.static(__dirname + '/../dist/'));


    app.use((request, response, next) => {
        if (process.env.NODE_ENV != 'development' && request.headers['x-forwarded-proto'] !== 'https') {
            return response.redirect("https://" + request.headers.host + request.url);
        }
        return next();
    });

    const sendHTMLFile = (req: typeof express.request, response, next) => {
        if (!req.headers.accept?.includes('text/html')) return next();
        console.log('Recieved a request to server req.hostname  -  ' + req.hostname);
        if (req.hostname.includes('quiz.')) {
            response.sendFile(path.resolve(__dirname, '../dist/quiz/index.html'));
        } else {
            response.sendFile(path.join(path.resolve(__dirname,'../dist/portfolio/index.html')));
        }
    };

    app.get('*', sendHTMLFile);
    app.post('*', sendHTMLFile);


}


const app = express();

runServer(app);

const port = process.env.PORT || 3000;

export default app.listen(port, () => console.log(`app listening on port ${port}!`));