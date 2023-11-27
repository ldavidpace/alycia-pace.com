import type { Express } from "express";
import { v4 as uuid } from 'uuid';

import {
  getQuestionsForQuiz,
} from '../questions/questionMapper';
import {
  getObject, putFile,
} from '../s3/s3Client';
import {
  createQuiz, getQuizById, getQuizzes, updateQuiz,
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

    app.put(`/quizzes/:id`, async (req, res) => {
        const quiz = await getQuizById(req.params.id);

        const files = (req as any).files;
        if (files?.length) {
            await putFile(quiz.imageUrl, files[0], 'image/jpeg');
        }

        const body = req.body;

        const updatedQuiz = {
            ...quiz,
            name: body.name,
            type: body.type, 
        };

        await updateQuiz(req.params.id, updatedQuiz);
        res.send({
            updatedQuiz,
        });

    });

    app.get('/quizzes', async (req, res, next) => {
        const files = await getQuizzes();
        res.send(files.map((quiz) => ({
            id: quiz.id,
            name: quiz.name,
            ownerId: quiz.userId,
            icon: `/quizzes/${quiz.id}/icon.jpeg`,
        })));
        return;
    });


    app.get('/quizzes/:id', async (req, res) => {
        try {
            const quiz = await getQuizById(req.params.id);
            res.send({
                id: quiz.id,
                name: quiz.name,
                ownerId: quiz.userId,
                icon: `/quizzes/${quiz.id}/icon.jpeg`,
                type: quiz.type,
                questions: await getQuestionsForQuiz(req.params.id)
            })
        } catch(err) {
            console.log(err);
        }
    })

    
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