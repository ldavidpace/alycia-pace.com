import cx from 'classnames';
import React from 'react';

import styles from './ModalHeader.module.css';


export type ModalHeaderProps = {children?: React.ReactNode}

const ModalHeader = ({children} : ModalHeaderProps) => {
    return <div className={cx(styles.container)}>{children}</div>
}

export default ModalHeader;