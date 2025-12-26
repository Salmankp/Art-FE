import React from 'react';
import styles from '../styles/common/Buttons.module.scss';

interface buttonProps {
  className?: string;
  children?: React.ReactChild;
  value?: string;
  name?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;

  onClick?: () => void;
  id?: string | undefined;
}

const PrimaryButton = ({
  className,
  children,
  disabled,
  onClick,

  value,
  type,
  name,
  id,
}: buttonProps): JSX.Element => {
  return (
    <button
      className={`${className} ${disabled ? styles.disabled : ''} ${
        styles.primaryButton
      }  ${styles.baseButton}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
      value={value}
      name={name}
      id={id}
    >
      {children}
    </button>
  );
};

const SecondaryButton = ({
  className,
  children,
  disabled,
  onClick,
  value,
  type,
  name,
  id,
}: buttonProps): JSX.Element => {
  return (
    <button
      className={`${className} ${disabled ? styles.disabled : ''} ${
        styles.secondaryButton
      }  ${styles.baseButton}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
      value={value}
      name={name}
      id={id}
    >
      {children}
    </button>
  );
};

const TernaryButton = ({
  className,
  children,
  disabled,
  onClick,
  value,
  name,
  id,
  ...rest
}: buttonProps): JSX.Element => {
  return (
    <button
      className={`${className} ${disabled ? styles.disabled : ''} ${
        styles.ternaryButton
      } ${styles.baseButton} `}
      disabled={disabled}
      onClick={onClick}
      value={value}
      name={name}
      id={id}
      {...rest}
    >
      {children}
    </button>
  );
};

export { PrimaryButton, SecondaryButton, TernaryButton };
