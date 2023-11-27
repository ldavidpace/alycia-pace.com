import cx from 'classnames';
import React from 'react';
import { getQuizzes } from '~service/quizService';
import { Quiz } from '~Utilities/AppContext/quizTypes';

import { updateContext, useAppContext } from '../Utilities/AppContext';
import AddQuiz from './AddQuiz';
import styles from './Quizzes.module.css';

export type QuizzesProps = {}

const Quizzes = ({} : QuizzesProps) => {
    const context = useAppContext();

    React.useEffect(() => {
      getQuizzes().then( (quizzes: void | Quiz[]) =>  {
        if (quizzes) {
          updateContext((context) => {
            context.quizzes = quizzes.reduce((agg: {[key: string]: Quiz}, quiz) => {
              agg[quiz.id] = quiz;
              return agg;
            }, {});
          })
        }
      });
    }, []);
    
    return <div className={cx(styles.container)}>
        {context.user && <AddQuiz />}
        {Object.values(context.quizzes)?.map((quiz) => <a href={`/quiz/${quiz.id}`} className={styles.quiz} key={quiz.id}>
          <div >{quiz.name}</div>
          <div
            className={styles.icon}
          ><img src={quiz.icon}></img></div>
        </a>)
        }
    </div>
}

export default Quizzes;