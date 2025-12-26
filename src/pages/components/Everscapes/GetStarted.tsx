import React from 'react';
import { useHistory } from 'react-router-dom';
import { dropnewbg } from '../../../assets';
import styles from '../styles/Everscapes/GetStarted.module.scss';

const GetStarted: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.border} />
      <div className={styles.getStarted}>
        <div className={styles.imgOverlayWrap}>
          <div>
            <img className={styles.featurebg} src={dropnewbg} />
          </div>
          <div className={styles.overlayNew} />
          <div className={styles.messageContainer}>
            Create your free account now
            <div className={styles.buttonwrap}>
              <button
                onClick={() => {
                  history.push('/auth#register');
                  window.scrollTo(0, 0);
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default GetStarted;
