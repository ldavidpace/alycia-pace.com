
export type Quiz = {
    id: string,
    name: string,
    icon: string,
    ownerId: string,
    type: 'SUMMED_SCALE' | 'WEIGHTED_GROUPING',
}

export type Question = {
    id: string,
    questionOrder: number,
    questionText: string,
    responses: Answer[],
    quizId: string,
}

export type Answer = {
    id: string;
    answerText: string,
}