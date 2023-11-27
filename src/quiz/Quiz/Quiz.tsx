import { updateContext } from 'AppContext';
import cx from 'classnames';
import React from 'react';
import { loadQuizById } from '~service/quizService';
import { Quiz } from '~Utilities/AppContext/quizTypes';
import { useGetQuizById } from '~Utilities/AppContext/selectors/QuizSelectors';
import { useCurrentUser } from '~Utilities/AppContext/selectors/UserSelectors';

import styles from './Quiz.module.css';
import QuizManagementOptions from './QuizManagementOptions';

export type QuizProps = {
    quizId: string
};

const Quiz = ({quizId} : QuizProps) => {
    const currentUser = useCurrentUser();
    const quiz = useGetQuizById(quizId);
  
    React.useEffect(() => {
      loadQuizById(quizId).then((quiz) => {
        updateContext((context) => {
          context.quizzes[quizId] = quiz;
        })
      });
    }, []);

    return <div>
        {currentUser?.userId === quiz?.ownerId && <QuizManagementOptions quizId={quizId}/>}
        <div><img src={quiz?.icon}/></div>
        <div>{quiz?.name}</div>
    </div>;
}

export default Quiz;