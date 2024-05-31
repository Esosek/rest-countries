import type { ReactNode } from 'react';

import styles from './Button.module.css';

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
