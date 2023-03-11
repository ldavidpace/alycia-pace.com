import {
    selectQuizes,
    insertQuiz
} from './adminDatabaseMapper';
import type {Express} from 'express';

export default (app: Express) => {

    app.get('admin/questions', (request, response, next) => {
        const quizes = selectQuizes();
        response.send(quizes);
        return next();
    });

    app.post('admin/questions', (request, response, next) => {
        const quiz = request.body.json();
        response.send(insertQuiz(quiz));
        return next();
    });

}