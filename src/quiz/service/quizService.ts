import type {
    Question,
  Quiz,
} from '~Utilities/AppContext/quizTypes';

import { state } from 'AppContext';

export const getQuizzes = (): Promise<Quiz[]> => {
    return fetch(`/quizzes`).then((response) => response.json());
}

    
export const createQuiz = (name: string, icon: Blob | File) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', icon, 'blob');
    return fetch(`/quizzes`, {
        method: 'POST',
        body: formData,
    }).then((response) => {
        const contentLength = response.headers.get('Content-Length');
        if (contentLength && parseInt(contentLength) > 2) {
            return response.json();
        }
        return;
    })
}

export const updateQuiz = (quiz: Quiz, icon?: File| Blob) => {
    const formData = new FormData();
    formData.append('name', quiz.name);
    formData.append('type', quiz.type);
    if (icon) {
        formData.append('image', icon);
    }
    return fetch(`/quizzes/${quiz.id}`, {
        method: 'PUT',
        body: formData,
    }).then((response) => {
        const contentLength = response.headers.get('Content-Length');
        if (contentLength && parseInt(contentLength) > 2) {
            return response.json();
        }
        return;
    })

}

export const loadQuizById = (id: string): Promise<Quiz> => {
    if (state.quizzes[id]) return Promise.resolve(state.quizzes[id]);
    return fetch(`/quizzes/${id}`).then((response) => response.json());
}

export const createQuestion = (quizId: string, order: number): Promise<Question> => {
    const newQuestion: Omit<Question, 'id'| 'responses'> = {
        questionText: "What do you wan to ask?",
        questionOrder: order,
        quizId,
    };

    return fetch(`/quizzes/${quizId}/questions`, {
        method: 'POST',
        body: JSON.stringify(newQuestion),
        headers: {
            'accept': 'application/json'
        }
    }).then( async (response) => {
        if (response.status !== 200) {
            throw new Error(await response.text());
        }
        return response.json()
    })
}