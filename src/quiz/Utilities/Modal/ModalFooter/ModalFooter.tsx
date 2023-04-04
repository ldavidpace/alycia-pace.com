import cx from 'classnames';
import React from 'react';

import styles from './ModalFooter.module.css';


export type ModalFooterProps = {children: React.ReactNode}

const ModalFooter = ({children} : ModalFooterProps) => {
    return <div className={cx(styles.container)}>
        {children}
    </div>
}

export default ModalFooter;