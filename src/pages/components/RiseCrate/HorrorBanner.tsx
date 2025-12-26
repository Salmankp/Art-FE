import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/RiseCrate/HorrorBanner.module.scss';
import { horrorbanner } from '../../../assets/index';

const HorrorBanner: React.FC = () => {
  return (
    <>
      <div className={styles.borderwrap}>
        <div className={styles.border} />
      </div>
      <div className={styles.horrorBannerSection}>
        <Link to="/drop/horror-launch">
          <img src={horrorbanner} className={styles.horrorBanner} />
        </Link>
      </div>
    </>
  );
};
export default HorrorBanner;
