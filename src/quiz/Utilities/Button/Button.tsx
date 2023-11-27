import cx from 'classnames';
import React from 'react';

import styles from './Button.module.css';

export type ButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "default" | "icon" | "tight";
  className?: string;
} & ({
  onClick?: (ev: React.SyntheticEvent<HTMLButtonElement>) => void;
  as?: 'button' | undefined;
} | {
  onClick?: undefined;
  as: 'div';
});


const Button = ({as: As = 'button', children, className, variant, onClick }: ButtonProps) => {
  if (As !== 'button') {
    return <As
      className={cx(styles.button, variant && styles[variant], className)}>
        {children}
    </As>
  }
  return (
    <As
      className={cx(styles.button, variant && styles[variant], className)}
      onClick={onClick}
    >
      {children}
    </As>
  );
};

export default Button;
