import cx from 'classnames';
import React from 'react';

import styles from './ModalBody.module.css';


export type ModalBodyProps = {children: React.ReactNode}

const ModalBody = ({children} : ModalBodyProps) => {
    return <div className={cx(styles.container)}>
        {children}
    </div>
}

export default ModalBody;