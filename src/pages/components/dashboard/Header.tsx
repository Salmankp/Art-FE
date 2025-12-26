import React from 'react';
import styles from '../styles/dashboard/Header.module.scss';
import { dashboardbg, dashboardlogo } from '../../../assets';

const Header: React.FC = () => {
  return (
    <>
      <div
        className={styles.wrap}
        style={{ backgroundImage: `url(${dashboardbg})` }}
      >
        <img src={dashboardlogo} alt="logo" />
      </div>
      <div className={styles.borderbottom} />
    </>
  );
};

export default Header;
