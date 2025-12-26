import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import styles from '../styles/home2/Explore.module.scss';
import { frame1, explorebg, explore } from '../../../assets/index';

const StartCollection: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.mainWrap}>
        <Container style={{ padding: '2rem 0rem 1rem 0rem' }}>
          <div className={styles.imgContainer}>
            <img className={styles.frameImage} src={frame1} />
          </div>
        </Container>
        <div className={styles.relativeWrap}>
          <div className={styles.videoContainer}>
            <img src={explorebg} className={styles.exploreBg} />
          </div>
          <div className={styles.nftContainer}>
            <video
              width="340"
              // height="500"
              autoPlay
              muted
              loop
              className={styles.card}
              style={{ border: '0.5rem solid #000' }}
            >
              <source src={explore} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <Container className={styles.resText}>
          The world’s greatest Fantasy, Sci-Fi and Horror artists are on
          EverScapes, the revolutionary new digital art platform from Artefy.
          Packed with amazing art, virtual display galleries and themed
          collections you can discover and own authentic, limited edition NFTs
          all backed by Polygon’s environmentally friendly blockchain.
          <br />
          <br />
          Featuring works from Frank Frazetta, Heavy Metal Magazine, Ciruelo,
          Sanjulián, Juan Giménez, Richard Hescox & many more.
        </Container>
        <div className={styles.buttonwrap}>
          <button onClick={() => history.push('/everscapes')}>
            Explore Everscapes
          </button>
        </div>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default StartCollection;
