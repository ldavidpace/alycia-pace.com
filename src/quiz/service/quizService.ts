import type {
  Quiz,
} from '~Utilities/AppContext/quizTypes';


export const getQuizzes = (): Promise<Quiz[]> => {
    return fetch(`/quizzes`).then((response) => response.json());
}

    
export const createQuiz = (name: string, icon: Blob | File) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', icon, 'blob');
    fetch(`/quizzes`, {
        method: 'POST',
        body: formData,
    }).then((response) => {
        console.log(response);
    });
}