import type { Quiz } from './quizTypes';
import type { User } from './userTypes';

export type AppContextStore = {
    user?: User;
    quizzes: Quiz[];
};

