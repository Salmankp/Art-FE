import React from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import styles from '../styles/MasterGalleries/GTheme.module.scss';
import {
  UserGalery,
  Forrest,
  Station,
  Hellscape,
  Classic,
  Abbey,
  Graveyard,
} from '../../../assets/index';

const GalleryTheme = () => {
  return (
    <>
      <div className={styles.launchGalleryWrap}>
        <Container className={styles.currateWrapper}>
          <div className={styles.exploreGalleryText}>
            Our Gallery Themes
            <div className={styles.borderBottom} />
          </div>
          <Box className={styles.themeImages}>
            <div className={styles.currateImgBox}>
              <div className={styles.waveImages}>
                <div className={styles.waveInnerimage}>
                  <Typography className={styles.gallerPictext}>
                    Hidden Forest
                  </Typography>
                  <img src={Forrest} className={styles.waveimg} />
                </div>
              </div>
            </div>
            <div className={styles.currateImgBoxsecond}>
              <div className={styles.waveImages}>
                <div className={styles.waveInnerimage}>
                  <Typography className={styles.gallerPictext}>
                    Space Station
                  </Typography>
                  <img src={Station} className={styles.waveimg} />
                </div>
              </div>
            </div>
          </Box>
          <Box className={styles.themeImages}>
            <div className={styles.currateImgBox}>
              <div className={styles.waveImages}>
                <div className={styles.waveInnerimage}>
                  <Typography className={styles.gallerPictext}>
                    Abandoned Abbey
                  </Typography>
                  <img src={Abbey} className={styles.waveimg} />
                </div>
              </div>
            </div>
            <div className={styles.currateImgBoxsecond}>
              <div className={styles.waveImages}>
                <div className={styles.waveInnerimage}>
                  <Typography className={styles.gallerPictext}>
                    Hellscape
                  </Typography>
                  <img src={Hellscape} className={styles.waveimg} />
                </div>
              </div>
            </div>
          </Box>
          <Box className={styles.themeImages}>
            <div className={styles.currateImgBox}>
              <div className={styles.waveImages}>
                <div className={styles.waveInnerimage}>
                  <Typography className={styles.gallerPictext}>
                    Classic
                  </Typography>
                  <img src={Classic} className={styles.waveimg} />
                </div>
              </div>
            </div>
            <div className={styles.currateImgBoxsecond}>
              <div className={styles.waveImages}>
                <div className={styles.waveInnerimage}>
                  <Typography className={styles.gallerPictext}>
                    Graveyard
                  </Typography>
                  <img src={Graveyard} className={styles.waveimg} />
                </div>
              </div>
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default GalleryTheme;
