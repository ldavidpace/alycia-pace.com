import type { Express } from "express"
import {
  requireAuth,
} from '../auth/createAuthedEndpoint';
import {
  createQuestion, getQuestionsForQuiz,
} from './questionMapper';


const createQuestionsEndpoints = (app: Express) => {

    app.get(`/quizzes/:id/questions`, async (req, res) => {
        const questions = await getQuestionsForQuiz(req.params.id);
        res.send(questions);
    });

    app.post(`/quizzes/:id/questions`, requireAuth('USER', async( req, res) => {
        const question = req.body;
        if (question.quizId && req.params.id !== question.quizId) {
            res.statusCode = 404;
            res.send("Quiz Id and Question.QuizId need to match");
        }
        console.log(req.params.id, question);
        const lastId = await createQuestion(req.params.id, question);
        res.send({
            id: lastId,
            quizId: req.params.id,
            ...question
        })
    }));

}

export default createQuestionsEndpoints;