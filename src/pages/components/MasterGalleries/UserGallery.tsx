import React from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import styles from '../styles/MasterGalleries/UserGallery.module.scss';
import { UserGalery } from '../../../assets/index';

const UserGallery = () => {
  return (
    <>
      <div className={styles.launchGalleryWrap}>
        <Container className={styles.currateWrapper}>
          <div className={styles.exploreGalleryText}>
            User Galleries
            <div className={styles.borderBottom} />
          </div>
          <div className={styles.currateImgBox}>
            <div className={styles.waveImages}>
              <div className={styles.waveInnerimage}>
                <img src={UserGalery} className={styles.waveimg} />
                <div className={styles.userGallerytext}>
                  <Typography variant="h3">COMING SOON</Typography>
                </div>
              </div>
            </div>
            <div className={styles.currateTextWrapper}>
              <Typography className={styles.textInner}>
                Art is made to be shown off and displayed not hidden inside an
                account. Curate your digital collectables in your own virtual
                art gallery. Choose from incredible different themes, or create
                your own layouts. Add your collectables and special items to
                give it your own personal style.
              </Typography>
              <Typography className={styles.textInner}>
                Show off your collection to friends, invite other fans to check
                it out.
              </Typography>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserGallery;
