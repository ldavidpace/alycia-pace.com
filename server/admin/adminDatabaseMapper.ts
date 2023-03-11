import pool from '../database';


export const selectQuizes = () => {
    return pool.query({
        text: `Select * from quiz`
    })
}

export const insertQuiz = (quiz) => {
    return pool.query({
        text: `Insert into quiz (name)`,
        values: [quiz.name]
    });
}