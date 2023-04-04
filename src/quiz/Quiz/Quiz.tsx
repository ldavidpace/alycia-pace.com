import React from 'react';
import cx from 'classnames';

import styles from './Quiz.module.css';

export type QuizProps = {}

const Quiz = ({} : QuizProps) => {
    return <div className={cx(styles.container)}>Quiz Component</div>
}

export default Quiz;