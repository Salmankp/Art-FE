import 'react-multi-carousel/lib/styles.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { useAppSelector } from '../../../redux/hooks';
import styles from '../styles/Everscapes/WelcomeMarketplace.module.scss';
import { mpicon, mpscreen, nowLive } from '../../../assets/index';

const WelcomeMarketplace: React.FC = () => {
  const history = useHistory();
  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );
  return (
    <>
      <div className={styles.mpWrapper}>
        <Container>
          <div className={styles.mainFlexWrap}>
            <div
              style={
                loggedIn
                  ? { padding: '4rem 1rem' }
                  : { padding: '0rem 1rem', marginTop: '-4rem' }
              }
            >
              <img className={styles.mpScreen} src={mpscreen} />
            </div>
            <div style={{ padding: '0rem 1rem' }}>
              <img className={styles.mpIcon} src={mpicon} />

              <div className={styles.buttonwrap2}>
                <img className={styles.nowLive} src={nowLive} />
              </div>
              <div className={styles.buttonwrap}>
                <button onClick={() => history.push('/marketplace')}>
                  Explore Marketplace
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default WelcomeMarketplace;
