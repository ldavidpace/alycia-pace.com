import cx from 'classnames';
import React from 'react';

import styles from './Input.module.css';

export type InputProps = { value: string; onChange: (name: string) => void, placeholder?: string };

const Input = ({ value, onChange, placeholder}: InputProps) => {
  return (
    <input
      className={cx(styles.container)}
      value={value}
      onChange={(ev) => {
        console.log('Name Change');
        onChange(ev.target.value);
      }}
      placeholder={placeholder}
    />
  );
};

export default Input;
