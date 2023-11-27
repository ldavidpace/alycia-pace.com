import React from 'react';

import { useAppContext } from '../AppContext';

export const useGetQuizById = (quizId: string) => {
    const context = useAppContext();
    React.useDebugValue(context.quizzes[quizId]);
    return context.quizzes[quizId];
}

export const useGetQuizQuestions = (quizId: string) => {
    const context = useAppContext();
    React.useDebugValue(context.quizQuestions[quizId] || []);
    return context.quizQuestions[quizId] || [];
}