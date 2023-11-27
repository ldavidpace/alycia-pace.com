import cx from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '~Utilities/Button/Button';

import styles from './QuizManagementOptions.module.css';

export type QuizManagementOptionsProps = {quizId: string}

const QuizManagementOptions = ({quizId} : QuizManagementOptionsProps) => {
    return <div className={cx(styles.container)}>
        <Link to={`/quiz/${quizId}/edit`} >Edit</Link>
    </div>
}

export default QuizManagementOptions;