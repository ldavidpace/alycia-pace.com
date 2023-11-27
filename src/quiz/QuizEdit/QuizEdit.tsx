import { updateContext } from 'AppContext';
import cx from 'classnames';
import React from 'react';
import { createQuestion, loadQuizById } from '~service/quizService';
import { useGetQuizById, useGetQuizQuestions } from '~Utilities/AppContext/selectors/QuizSelectors';
import Button from '~Utilities/Button/Button';
import Icon from '~Utilities/Icon/Icon';

import EditQuizConfig from './EditQuizConfig/EditQuizConfig';
import styles from './QuizEdit.module.css';

export type QuizEditProps = { quizId: string };


const quizTypeLabels = {
  WEIGHTED_GROUPING: 'Weighted grouping',
  SUMMED_SCALE: "Summed scale"  
}

const QuizEdit = ({ quizId }: QuizEditProps) => {
  const [currentlyEditting, setCurrentlyEditing] = React.useState(-1);
  React.useEffect(() => {
    loadQuizById(quizId).then((quiz) => {
      updateContext((context) => {
        context.quizzes[quizId] = quiz;
      });
    });
  }, []);

  const quiz = useGetQuizById(quizId);
  const quizQuestions = useGetQuizQuestions(quizId);

  const handleEditClick = (index: number) => {
    setCurrentlyEditing(index);
  };

  const handleAddQuestion = () => {
    createQuestion(quizId, quizQuestions.length).then((question) => {
      console.log(question);
    });
  }

  return (
    <div className={cx(styles.container)}>
      <div className={styles.sideBar}>
        <div className={styles.rows}>
          <div className={styles.row}>
            <div>
              <div className={styles.rowHeader}>Quiz</div>
              <div className={styles.summary}>name: {quiz?.name}</div>
              <div className={styles.summary}>
                <span>icon: </span>
                <img className={styles.quizIcon} src={quiz?.icon} />
              </div>
              <div className={styles.summary}>type: {quizTypeLabels[quiz?.type]}</div>
            </div>
            <div className={styles.action}>
              <Button variant={"icon"} onClick={() => handleEditClick(-1)}>
                <Icon name={"pencil"}></Icon>
              </Button>
            </div>
          </div>
          {quizQuestions.map((question) => {
            return <div className={styles.row}>
              {question.questionText}
            </div>
          })}
        </div>
        <Button onClick={handleAddQuestion}>+ Add Question</Button>
      </div>
      <div className={styles.body}>
        {currentlyEditting === -1 && <EditQuizConfig quizId={quizId} />}
      </div>
    </div>
  );
};

export default QuizEdit;
