import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/VulcanVerse/RegisterVulcan.module.scss';
import { newdroplogo } from '../../../assets';

const RegisterVulcan: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.outerwrap}>
        <div className={styles.wrap}>
          <div className={styles.logo}>
            <div className={styles.txt}>
              Register now
              <br />
              and get started for free.
            </div>
          </div>
          <div className={styles.txtbtn}>
            <div className={styles.btn}>
              <button onClick={() => history.push('/auth#register')}>
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterVulcan;
