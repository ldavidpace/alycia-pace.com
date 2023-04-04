import cx from 'classnames';
import React from 'react';
import {
  Link, useLocation,
} from 'react-router-dom';
import {
  useAppContext,
} from 'Utilities/AppContext';

import styles from './SubHeader.module.css';


export type SubHeaderProps = {}

const SubHeader = ({} : SubHeaderProps) => {
    const context = useAppContext();
    const location = useLocation();
    const indicator = React.useRef<HTMLDivElement>(null);
    const defaultLink = React.useRef<HTMLAnchorElement>(null);

    React.useEffect(() => {
        const activeTab = document.querySelector(`.${styles.active}`);
        if (!indicator.current) return;
        if (activeTab ) {
            const {x, width} = activeTab.getBoundingClientRect();
            indicator.current.style.left = `${x}px`;
            indicator.current.style.width = `${width}px`;
        } else if (defaultLink.current){
            const {x, width} = defaultLink.current.getBoundingClientRect();
            indicator.current.style.left = `${x}px`;
            indicator.current.style.width = `${width}px`;
        }
    }, [location, context.user]);

    if (!context.user) {
        return null;
    }

    return <div role="navigation" className={cx(styles.container)}>
        <Link to="/" className={cx({[styles.active]: location.pathname === '/'})} ref={defaultLink}>Quizzes</Link>
        <Link to="/review" className={cx({[styles.active]: location.pathname === '/review'})}>Review</Link>
        <div className={styles.activeIndicator} ref={indicator}></div>
    </div>
}

export default SubHeader;