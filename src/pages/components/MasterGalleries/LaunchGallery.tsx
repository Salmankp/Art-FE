import React, { useState } from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import { useParams } from 'react-router';
import styles from '../styles/MasterGalleries/LaunchGallery.module.scss';
import { waveimg } from '../../../assets';

const LaunchGallery = () => {
  const [showLaunch, setShowLaunch] = useState(false);
  const authToken = localStorage.getItem('authToken');

  const show = useParams();

  const params = window.location.search.split('?').join('').split('=');

  const paramObj = {
    [params[0]]: params[1],
  };

  const getGalleryUrl = () => {
    if (paramObj.show === 'gallery2' && authToken) {
      // ? `https://user-gallery.artefy.io/?jwt-token=${authToken}`
      return `https://user-gallery.artefy.io/?jwt-token=${authToken}`;
    }
    if (authToken) {
      return `https://themedgalleries.s3.ap-southeast-2.amazonaws.com/index.html?jwt-token=${authToken}`;
    }
    return 'https://themedgalleries.s3.ap-southeast-2.amazonaws.com/index.html';
  };

  return (
    <>
      <div className={styles.launchGalleryWrap}>
        <Container className={styles.currateWrapper}>
          <div className={styles.currateImgBox}>
            <div className={styles.waveImages}>
              <img src={waveimg} className={styles.waveimg} />
            </div>
            <div className={styles.currateTextWrapper}>
              <Typography className={styles.textOne}>
                <span className={styles.firstTextWrap}>
                  Curate your NFT collection into
                  <br />
                  incredible virtual galleries
                </span>
                <div className={styles.borderBottom} />
              </Typography>
              <Typography className={styles.textOne}>
                <span className={styles.firstTextWrap}>
                  Choose from multiple different
                  <br />
                  themes, frames and assets
                </span>
                <div className={styles.borderBottom} />
              </Typography>
              <Typography className={styles.textOne}>
                <span className={styles.firstTextWrap}>
                  Share your art collection with
                  <br />
                  the world
                </span>
              </Typography>
            </div>
          </div>
          <div className={styles.exploreGalleryText}>
            Explore the EverScapes Gallery
            <div className={styles.borderBottom} />
          </div>
          <div className={styles.galleryWeb}>
            <div
              className={styles.lunchGalleryBg}
              onClick={(_e) => {
                console.log(showLaunch, {
                  display: !showLaunch ? 'block' : 'none',
                });
                setShowLaunch(true);
              }}
              style={{ display: !showLaunch ? 'block' : 'none' }}
            >
              <div className={styles.launchText}>LAUNCH GALLERY</div>
            </div>
            <iframe
              id="unity-3d-view"
              src={getGalleryUrl()}
              title="Artefy Gallery"
              width="1200px"
              height="730px"
              style={{
                display: showLaunch ? 'block' : 'none',
                border: '0',
                margin: '0 auto',
              }}
            />
          </div>
          <div className={styles.launchGalleryBottomText}>
            Walk through and explore the EverScapes gallery, filled with
            upcoming art from future drops. With three wings, each dedicated to
            the three pillars of EverScapes, Fanatasy, Sci-Fi and Horror, this
            is the best way of getting a preview of what is coming soon to
            EverScapes.
          </div>
        </Container>
      </div>
    </>
  );
};

export default LaunchGallery;
