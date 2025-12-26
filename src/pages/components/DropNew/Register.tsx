import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/DropNew/Register.module.scss';
import { newdroplogo } from '../../../assets';

const Register: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.outerwrap}>
        <div className={styles.wrap}>
          <div className={styles.logo}>
            <img src={newdroplogo} alt="logo" />
          </div>
          <div className={styles.txtbtn}>
            <div className={styles.txt}>Register now to buy!</div>
            <div className={styles.btn}>
              <button onClick={() => history.push('/auth#register')}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
