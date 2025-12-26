import React, { useState } from 'react';
import { Container, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styles from '../styles/VulcanVerse/HeaderMain.module.scss';
import {
  verselogo,
  everscapesverse,
  frazettalogo,
  silverwarriortext,
  redvv,
  silverwarriorimg,
} from '../../../assets/index';

const HeaderMain: React.FC = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState<any>(
    localStorage.getItem('authToken'),
  );

  return (
    <>
      <div className={styles.HeaderMain}>
        <Container>
          <Box className={styles.headerLogoSection}>
            <div>
              <img src={verselogo} className={styles.verselogo} />
            </div>
            <div>
              <img src={everscapesverse} className={styles.escapelogo} />
            </div>
            <div className={styles.frazettaWrap}>
              <img src={frazettalogo} className={styles.frazettalogo} />
            </div>
          </Box>
          <Box className={styles.flexWrapper}>
            <div className={styles.leftWrapper}>
              <div className={styles.silverTextWrap}>
                <span className={styles.text}>Frank Frazetta's</span>
                <div>
                  <img src={silverwarriortext} className={styles.silertext} />
                </div>
                <span className={styles.text}>is coming to</span>
              </div>
              <div className={styles.redvvWrap}>
                <img src={redvv} className={styles.redvvImg} />
              </div>
              <span className={styles.vulcanMainText}>
                Vulcan Verse has partnered with Frazetta Girls and EverScapes in
                a Silver Warrior Drop with over 300 prizes to be won simply by
                purchasing a Silver Warrior Medallion.
              </span>
              <Button
                onClick={() => {
                  history.push('/drop/silver-warrior-medallion');
                }}
                className={styles.drawButton}
                disabled
                style={{ backgroundColor: 'rgb(239, 0, 0)' }}
              >
                Drop Finished
              </Button>
            </div>
            <div className={styles.rightWrapper}>
              <img src={silverwarriorimg} className={styles.silverwarriorimg} />
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default HeaderMain;
