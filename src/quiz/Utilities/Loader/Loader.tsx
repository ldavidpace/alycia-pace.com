import cx from 'classnames';
import React from 'react';

import styles from './Loader.module.css';


export type LoaderProps = {}

const Loader = ({} : LoaderProps) => {
    return <div className={cx(styles.container)}>
        <img src={"https://media.giphy.com/media/iyBYN4F6WnhVfuCgFK/giphy.gif"}></img>
    </div>
}

export default Loader;