import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import styles from '../styles/Everscapes/CreateAccount.module.scss';

const Signup: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.border} />
      <div className={styles.Signup}>
        <Container className={styles.innerwrap}>
          <div className={styles.messageContainer}>
            Start your collection today
            <div className={styles.buttonwrap}>
              <button
                onClick={() => {
                  history.push('/auth#register');
                  window.scrollTo(0, 0);
                }}
              >
                Create an Account
              </button>
            </div>
          </div>
          <div className={styles.mobileMessage}>
            Start your collection today
            <div className={styles.buttonwrap}>
              <button onClick={() => history.push('/auth#register')}>
                Create an Account
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default Signup;
