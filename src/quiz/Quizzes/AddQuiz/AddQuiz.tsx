import cx from 'classnames';
import React from 'react';
import {
  openModal,
} from 'Utilities/ModalService';

import CreateQuizModal from '../CreateQuizModal';
import styles from './AddQuiz.module.css';


export type AddQuizProps = {}

const AddQuiz = ({} : AddQuizProps) => {
    const handleAddClick = () => {
        openModal((props) => <CreateQuizModal {...props}/>)
    }

    return <button className={cx(styles.container)} onClick={handleAddClick}>
    <span>Add Quiz</span>
    <span className={styles.plus}>+</span>
</button>
}

export default AddQuiz;