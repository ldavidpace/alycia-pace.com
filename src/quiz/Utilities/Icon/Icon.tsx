import cx from 'classnames';
import React from 'react';

import styles from './Icon.module.css';

export type IconProps = {
    name: keyof typeof styles
    size?: 'md';
}

const Icon = ({
    name,
    size = 'md'
} : IconProps) => {
    return <i className={cx(styles[name], styles[size])} aria-label={name}/>
}

export default Icon;