import { all, get, insert, update } from '../database';

type Quiz = {
    id: number,
    name: string,
    imageUrl: string,
    userId: string,
    type: string,
};


export const createQuiz = (name:string, imageUrl: string, userId: string) => {
    insert(`Insert into quiz (name, imageUrl, userId)
        values ($name, $imageUrl, $userId)
    `, {name, imageUrl, userId});
}

export const updateQuiz = (id: string, quiz: Quiz) => {
    update(`
        Update QUIZ set 
            name = $name,
            type = $type
        where id = $id
    `, {
        name: quiz.name,
        type: quiz.type,
        id: quiz.id,
    })
}

export const getQuizzes = ():Promise<Array<Quiz>> => {
    return all(`select id, name, imageUrl, userId, type from quiz`);
}

export const getQuizById = (id: string) => {
    return get(`select id, name, imageUrl, userId, type from quiz where id = $id`, {id});
}

