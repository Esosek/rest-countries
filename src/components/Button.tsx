import type { ReactNode } from 'react';

import styles from './Button.module.css';

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  isLink?: boolean;
  href?: string;
};

export default function Button({
  children,
  onClick,
  href,
  isLink = false,
}: ButtonProps) {
  return isLink ? (
    <a href={href} className={styles.link}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
