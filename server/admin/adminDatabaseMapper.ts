import {get, insert} from '../database';


export const selectQuizes = () => {
    return get(`Select * from quiz`);
}

export const insertQuiz = (quiz) => {
    return insert(
        `Insert into quiz (name) values ($name)`,
        {name: quiz.name}
    );
}