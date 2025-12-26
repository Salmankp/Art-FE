import React from 'react';
import { Typography } from '@material-ui/core';
import styles from '../styles/Everscapes/Header.module.scss';
import { headerLogosEverscapes } from '../../../assets';

const Header = () => {
  return (
    <>
      <div className={styles.headerWrap} style={{ position: 'relative' }}>
        <div className={styles.headerContainer}>
          <Typography className={styles.headerText}>
            Collect Licensed Digital Artwork from the Masters of Fantasy, Sci-Fi
            & Horror
          </Typography>
          <img src={headerLogosEverscapes} className={styles.headerLogos} />
        </div>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default Header;
