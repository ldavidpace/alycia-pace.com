import cx from 'classnames';
import React from 'react';

import styles from './Radio.module.css';

export type RadioProps = {name: string; checked: boolean; value: string; onChange: (checked:boolean) => void; children: React.ReactNode}

const Radio = ({name, checked, value, onChange, children} : RadioProps) => {
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        onChange(ev.target.checked);
    }
    return <label>{children} <input name={name} value={value} type="radio" checked={checked} onChange={handleChange}/></label>;
}

export default Radio;