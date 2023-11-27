import { all, get, insert } from '../database';


type Question = {
    questionOrder: number,
    questionText: string,
};

export const getQuestionsForQuiz = async (quizId: string) => {
    return await all(`SELECT id, questionOrder, quiz_id as quizId, questionText from question where quiz_id=$quizId`, {quizId});
}

export const createQuestion = (quizId: string, question: Question) => {
    return insert(`INSERT into question ( questionOrder, questionText, quiz_id ) values ( $order, $question, $quizId )`, {
        order: question.questionOrder,
        question: question.questionText,
        quizId,
    });
}
