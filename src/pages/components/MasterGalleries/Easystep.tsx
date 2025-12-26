import React from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import styles from '../styles/MasterGalleries/Easystep.module.scss';
import {
  Number1,
  Number2,
  Number3,
  ArtMain,
  Art,
  Share,
  Theme,
  ShareImg,
  Picktheme,
} from '../../../assets/index';

const Easystep = () => {
  return (
    <>
      <div className={styles.launchGalleryWrap}>
        <Container className={styles.currateWrapper}>
          <div className={styles.exploreGalleryText}>
            3 EASY STEPS TO BUILD YOUR GALLERY
            <div className={styles.borderBottom} />
          </div>
          <Box className={styles.themeImages}>
            <div className={styles.currateImgBox}>
              <div className={styles.waveImages}>
                <img src={Number1} className={styles.numimg} />
                <img src={Theme} className={styles.wordimg} />
              </div>
            </div>
            <div className={styles.currateImgBoxsecond}>
              <div className={styles.waveImages}>
                <div className={styles.waveInnerimage}>
                  <img src={Picktheme} className={styles.waveimg} />
                </div>
              </div>
            </div>
          </Box>
          <Box className={styles.themeImages}>
            <div className={styles.currateImgBox}>
              <div className={styles.waveImages}>
                <img src={Number3} className={styles.numimg} />
                <img src={Art} className={styles.artimg} />
              </div>
            </div>
            <div className={styles.currateImgBoxsecond}>
              <div className={styles.waveImages}>
                <div className={styles.waveInnerimage}>
                  <img src={ArtMain} className={styles.waveimg} />
                </div>
              </div>
            </div>
          </Box>
          <Box className={styles.themeImages}>
            <div className={styles.currateImgBox}>
              <div className={styles.waveImages}>
                <img src={Number2} className={styles.numimg} />
                <img src={Share} className={styles.shareimg} />
              </div>
            </div>
            <div className={styles.currateImgBoxsecond}>
              <div className={styles.waveImages}>
                <div className={styles.waveInnerimage}>
                  <img src={ShareImg} className={styles.waveimg} />
                </div>
              </div>
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Easystep;
