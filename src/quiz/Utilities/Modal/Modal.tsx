import cx from 'classnames';
import React from 'react';
import useMergeRefs from '~Utilities/mergeRefs/useMergeRefs';
import OnClickOutside from '~Utilities/OnClickOutside';
import useOnEscape from '~Utilities/onEscape/useOnEscape';

import styles from './Modal.module.css';


export type ModalProps = {
    className?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    open: boolean;
    onRequestClose: () => void;
    onExited: () => void;
}

const Modal = ({children, size = 'sm', open, onRequestClose, onExited} : ModalProps) => {
    const modalBody = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const onEndAnimation = () => {
            onExited?.();
        };
        if (!open) {
            modalBody.current?.addEventListener('animationend', onEndAnimation);
        }
        return () => {
            modalBody.current?.removeEventListener('animationEnd', onEndAnimation);
        }
    })

    useOnEscape({
        callback: onRequestClose
    });
    const mergeRefs = useMergeRefs();
    
    return <div className={cx(styles.background)}>
        {/* <OnClickOutside onClick={onRequestClose}>{({ref: clickOutsideRef}) =>  */}
            <div ref={mergeRefs(modalBody/*, clickOutsideRef*/)} className={cx(styles.container, styles[size], {[styles.leaving]: !open})}>
                {children}
            </div>
        {/* }</OnClickOutside> */}
    </div>
}

export default Modal;