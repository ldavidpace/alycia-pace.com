import type { Express } from "express";
import { v4 as uuid } from 'uuid';

import {
  getObject, putFile,
} from '../s3/s3Client';
import {
  createQuiz, getQuizById, getQuizzes,
} from './quizMapper';


export default (app: Express) => {


    app.post('/quizzes', async (req, res, next) => {
        if (!req.session) {
            res.statusCode = 403;
            res.send("Unauthorized to access this resource");
        }

        const body = req.body;
        const files = (req as any).files;

        const iconUuid = uuid()
        const filename = `icons/${iconUuid}.jpeg`;

        try {
            await putFile(filename, files[0], 'image/jpeg');
            const lastId = await createQuiz(body.name, filename, req.session.user.userId.toString());
            res.send({
                id: lastId,
                name: body.name,
                userId: req.session.user.userId,
            })
        } catch(err) {
            console.error(err);
            res.statusCode = 500;
            res.send("Something went wrong trying to create your quiz please try again.");
        }
        
    });

    app.get('/quizzes', async (req, res, next) => {
        const files = await getQuizzes();
        res.send(files.map((quiz) => ({
            id: quiz.id,
            name: quiz.name,
            icon: `/quizzes/${quiz.id}/icon.jpeg`,
        })));
        return;
    });

    app.get('/quizzes/:id/icon.jpeg', async (req, res) => {
        try {
            const quiz = await getQuizById(req.params.id);
            const file = await getObject(quiz.imageUrl);

            const byteArray = await file.Body.transformToByteArray();
            res.setHeader('Content-Type', `${file?.ContentType}`);
            const blob = Buffer.from(byteArray);
            res.send(blob);
        } catch(err) {
            console.log(err);
        }
    })
 };