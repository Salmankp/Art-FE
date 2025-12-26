import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Container, Dialog, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styles from '../styles/Everscapes/GalleryBanner.module.scss';
import {
  remasteredText,
  buildGallery,
  exploreGallery,
  GroupBannerImage,
} from '../../../assets';

const GalleryBanner: React.FC = () => {
  const history = useHistory();
  const [showModal, toggleModal] = useState(false);
  const authToken = localStorage.getItem('authToken');

  const params = window.location.search.split('?').join('').split('=');

  const paramObj = {
    [params[0]]: params[1],
  };

  const galleryClick = () => {
    toggleModal(true);
  };

  return (
    <>
      <div className={styles.galleryWrap}>
        <img src={GroupBannerImage} className={styles.galleryImage} />
        <div className={styles.Textwrape}>
          <div className={styles.headWrapper}>
            EverScapes
            <span className={styles.coloredHeadWrap}>Virtual Galleries</span>
          </div>
          <div className={styles.lowertext}>Art as it's meant to be seen</div>
        </div>
        <div className={styles.imagewrape}>
          <img
            src={buildGallery}
            className={styles.buttonImage1}
            onClick={galleryClick}
          />
          <img
            src={exploreGallery}
            className={styles.buttonImage2}
            onClick={() => history.push('/master-galleries')}
          />
        </div>

        <Dialog
          fullScreen
          open={showModal}
          onClose={() => toggleModal(false)}
          style={{ margin: '1%' }}
        >
          <Box>
            <Box right={0} position="absolute">
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => toggleModal(false)}
                aria-label="close"
              >
                <Close />
              </IconButton>
            </Box>
            <Box display="flex">
              <iframe
                id="unity-3d-view"
                src={
                  paramObj.show === 'gallery2' && authToken
                    ? `https://user-gallery.artefy.io/?jwt-token=${authToken}`
                    : authToken
                    ? `https://galleries.artefy.io/?jwt-token=${authToken}`
                    : 'https://galleries.artefy.io/'
                }
                title="Artefy Gallery"
                width="1200px"
                height="730px"
                style={{
                  // display: showLaunch ? 'block' : 'none',
                  border: '0',
                  margin: '0 auto',
                }}
              />
            </Box>
          </Box>
        </Dialog>
      </div>
    </>
  );
};
export default GalleryBanner;
