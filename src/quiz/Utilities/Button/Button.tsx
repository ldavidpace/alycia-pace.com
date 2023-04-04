import cx from 'classnames';
import React from 'react';

import styles from './Button.module.css';


export type ButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "default";
  onClick?: (ev: React.SyntheticEvent<HTMLButtonElement>) => void;
};

const Button = ({ children, variant, onClick }: ButtonProps) => {
  return (
    <button
      className={cx(styles.button, variant && styles[variant])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
