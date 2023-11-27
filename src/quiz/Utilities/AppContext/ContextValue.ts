import type { Quiz, Question } from './quizTypes';
import type { User, Session } from './userTypes';

export type AppContextStore = {
    session?: Session;
    user?: User;
    quizzes: {
        [key: string]: Quiz,
    }
    quizQuestions: {
        [quizId: string]: Question[],
    }
};

