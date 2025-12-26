import 'react-multi-carousel/lib/styles.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import styles from '../styles/Everscapes/WelcomeRemaster.module.scss';
import {
  remasteredText,
  groupedremaster,
  groupedRemasterMobile,
  comingSoon,
} from '../../../assets/index';

const WelcomeRemaster: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.border} />
      <div className={styles.welcomeWrapper}>
        <Container>
          <div className={styles.headWrapper}>
            Welcome the
            <span className={styles.coloredHeadWrap}>New Classics of</span>
            <div style={{ padding: '1rem 0rem' }}>
              <img className={styles.remasterImage} src={remasteredText} />
            </div>
          </div>
          <img
            style={{ width: '100%' }}
            src={groupedremaster}
            className={styles.groupedremaster}
          />
          <img
            className={styles.mobileRemaster}
            style={{ width: '100%' }}
            src={groupedRemasterMobile}
          />
          <Typography className={styles.descWrapper}>
            Discover an ongoing collection of new stories hidden within
            <br />
            these classic works, brought to life in exciting ways.
          </Typography>
          <div className={styles.buttonwrap}>
            {/* <button onClick={() => history.push('/drop/remastered')}>
              Visit ReMastered
            </button> */}
            <img className={styles.comingSoon} src={comingSoon} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default WelcomeRemaster;
