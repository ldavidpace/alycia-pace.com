import React from 'react';
import cx from 'classnames';

import styles from './Quizzes.module.css';

export type QuizzesProps = {}

const Quizzes = ({} : QuizzesProps) => {
    return <div className={cx(styles.container)}>Quizzes</div>
}

export default Quizzes;