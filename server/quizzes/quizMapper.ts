import { all, get, insert } from '../database';


export const createQuiz = (name:string, imageUrl: string, userId: string) => {
    insert(`Insert into quiz (name, imageUrl, userId)
        values ($name, $imageUrl, $userId)
    `, {name, imageUrl, userId});
}

export const getQuizzes = ():Promise<Array<{
    id: number,
    name: string,
    imageUrl: string,
    userId: string,
}>> => {
    return all(`select id, name, imageUrl, userId from quiz`);
}

export const getQuizById = (id: string) => {
    return get(`select id, name, imageUrl, userId from quiz where id = $id`, {id});
}