import React, { useState } from 'react';
import { Player } from 'video-react';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styles from '../styles/RiseCrate/Galleries.module.scss';

import {
  galleryimg,
  RiseCrateBanner1,
  RiseCrateBanner2,
  RiseCrateBanner3,
  LatestEverscape,
  risegallerylootcrate,
} from '../../../assets/index';

const Galleries: React.FC = () => {
  const history = useHistory();
  const [showLaunch, setShowLaunch] = useState(false);
  return (
    <>
      <div className={styles.outerMostWrap}>
        <div className={styles.outerwrap}>
          <div className={styles.leftContainer}>
            <div className={styles.textOuterWrap}>
              <div className={styles.firstText}>
                DISPLAY YOUR COLLECTION IN YOUR OWN
                <br />
                PERSONAL VIRTUAL GRAVEYARD GALLERY
              </div>
              <div className={styles.secondText}>COMING VERY SOON!</div>
            </div>
          </div>
          <div className={styles.videowrap}>
            <div className={styles.galleryWrap}>
              <img src={RiseCrateBanner1} className={styles.galleryOne} />
            </div>
            <div className={styles.galleryWrap}>
              <img src={RiseCrateBanner2} className={styles.galleryOne} />
            </div>
            <div className={styles.galleryWrap}>
              <img src={RiseCrateBanner3} className={styles.galleryOne} />
            </div>
          </div>
          <div className={styles.paragraph}>
            Display your collection inside a graveyard gallery you wil be able
            to customise and add to over time.
          </div>
          <div className={styles.borderwrap}>
            <div className={styles.border} />
          </div>
        </div>
        <img
          src={risegallerylootcrate}
          className={styles.risegalleryimg}
          onClick={(_e) => {
            console.log(showLaunch, {
              display: !showLaunch ? 'block' : 'none',
            });
            setShowLaunch(true);
          }}
          style={{ display: !showLaunch ? 'block' : 'none' }}
        />
      </div>
      <iframe
        src="https://rise.artefy.io/"
        title="Rise Graveyard Gallery"
        width="1200px"
        height="730px"
        style={{
          display: showLaunch ? 'block' : 'none',
          border: '0',
          margin: '0 auto',
        }}
      />
    </>
  );
};
export default Galleries;
