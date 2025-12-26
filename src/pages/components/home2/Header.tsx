import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import styles from '../styles/home2/Header.module.scss';
import { logoNew } from '../../../assets/index';

const StartCollection: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.border} />
      <div className={styles.headerMain}>
        <Container className={styles.containerWrap}>
          <div className={styles.flexWrapper}>
            <div className={styles.welcomeText}>Welcome to</div>
            <div className={styles.artefyLogo}>
              <img className={styles.logoNew} src={logoNew} />
            </div>
          </div>
          <div className={styles.welcomeDesc}>
            Digital collectables are as varied as the passions, lifestyles and
            hobbies from which they come. Find works, and communities that
            relate to you. From fantasy art to music to sport or gaming,
            wherever your passion lives, Artefy has you covered.
          </div>
        </Container>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default StartCollection;
