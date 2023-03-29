import type {Express} from 'express';
import * as express from 'express';

import * as path from 'path';
import * as fs from 'fs';

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

import createQuestionAdminEndpoints from './admin/admin';
import createAuthEndpoints from './auth/auth';
import { validateSession, AUTH_HEADER } from './auth/sessionUtils';


import cookieParser from "cookie-parser";

const runServer = (app: Express) => {
    // for parsing application/json
    app.use(bodyParser.json()); 

    // for parsing application/xwww-
    app.use(bodyParser.urlencoded({ extended: true })); 
    //form-urlencoded

    // for parsing multipart/form-data
    app.use(upload.array()); 

    app.use(cookieParser());

    app.use(express.static('public'));

    app.use(async (request, response, next) => { 
        if (request.cookies['X_SMMOG_AUTHENTICATION']) {
            try {
                const session = await validateSession(request.cookies['X_SMMOG_AUTHENTICATION']); 
                request.session = session;
            } catch(err) {}
        }
        next();
    })

    app.use((request, response, next) => {
        if (process.env.NODE_ENV != 'development' && request.headers['x-forwarded-proto'] !== 'https') {
            return response.redirect("https://" + request.headers.host + request.url);
        }
        return next();
    });

    createQuestionAdminEndpoints(app);
    createAuthEndpoints(app);

    app.use(express.static(__dirname + '/../dist/'));

    const sendHTMLFile = (request, response, next) => {
    if (request.hostname.includes('quiz.')) {
        response.sendFile(path.resolve(__dirname, '../dist/quiz/index.html'));
    } else {
        response.sendFile(path.join(path.resolve(__dirname,'../dist/portfolio/index.html')));
    }
    };
    app.get('*', sendHTMLFile);
    app.post('*', sendHTMLFile);




}

export default runServer;