import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@material-ui/core';
import styles from '../styles/RemasteredDrop/NftView.module.scss';
import { NFTbg, GreenDragonPatronBadge } from '../../../assets/index';
import { AuthenticationStateActions } from '../../../redux/slices/AuthenticationState';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { DropCardSmallInter } from '../../../utils/interfaces';

const NftView = () => {
  const scrollDiv = useRef(null);

  const { dropPaintings } = useAppSelector(
    (state) => state.AuthenticationState,
  );

  const videoId = useAppSelector(
    (state) => state.AuthenticationState.dropVideoSrc,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    window.onbeforeunload = function () {
      dispatch(AuthenticationStateActions.set_dropVideoSrc(''));
    };
  }, [dropPaintings, videoId]);

  return (
    <>
      <Container className={styles.wrap}>
        <div
          ref={scrollDiv}
          id="3d-display"
          className={styles.NFTWrap}
          style={{ backgroundImage: `url(${NFTbg})` }}
        >
          {!videoId && !location?.hash ? (
            <>
              <div className={styles.scifiText}>
                <span className={styles.coloredText}>SELECT YOUR</span>
                <br />
                NFT BELOW TO
                <div className={styles.coloredText}>VISUALIZE IT IN</div>
                <div className={styles.text2}>REAL TIME 3D</div>
              </div>
              <div className={styles.img}>
                <img src={GreenDragonPatronBadge} alt="videoId" />
              </div>
            </>
          ) : (
            <iframe
              title={videoId}
              height="100%"
              width="100%"
              src={
                !videoId && location?.hash === '#3d-display'
                  ? `https://player.artefy.io/?media-id=616e6d2911530700143ffb88`
                  : `https://player.artefy.io/?media-id=${videoId}`
              }
            />
          )}
        </div>
      </Container>
    </>
  );
};

export default NftView;
