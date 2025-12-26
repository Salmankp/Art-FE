import React from 'react';
import styles from '../styles/Login/Header.module.scss';
import { loginHeader, loginheadermobile } from '../../../assets';

const Header = () => {
  return (
    <>
      <div className={styles.headerWrap}>
        <img src={loginHeader} className={styles.loginHeader} />
        <img src={loginheadermobile} className={styles.loginHeaderMobile} />
      </div>
      <div className={styles.border} />
    </>
  );
};

export default Header;
