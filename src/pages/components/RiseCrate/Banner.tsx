import React from 'react';
import { Paper, Container } from '@material-ui/core';
import styles from '../styles/RiseCrate/Banner.module.scss';
import {
  RiseCrowd,
  MetalText,
  RiseGrave,
  Risetext,
} from '../../../assets/index';

const DataArray: string[] = [
  `The digital home of
  Fantasy, Sci-Fi & Horror
  Collectables`,
  `The digital home of
  Fantasy, Sci-Fi & Horror
  Collectables`,
  `The digital home of
  Fantasy, Sci-Fi & Horror
  Collectables
`,
];

const Item: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Paper
      style={{
        background: `url(${image}) no-repeat`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        boxShadow: 'none',
        textAlign: 'center',
        position: 'relative',
      }}
      className={styles.paperStyle}
    >
      <div className={styles.HeavyMetalContainer}>
        <div className={styles.imgContainer}>
          <img src={Risetext} className={styles.RiseText} />
        </div>
      </div>
      <Container className={styles.bannerBottomTextContainer}>
        <h1>COLLECT THE FULL SPINE TINGLING SET</h1>
        <p>
          The film Night of the Living Dead changed popular culture forever, and
          now George C. Romero, the son of legendary film director George A.
          Romero, tells the story before the worst Night on Earth. Learn about
          the death, destruction, and tragedy that led to the birth of the
          modern zombie in this prequel horror saga to the most significant and
          influential horror film franchise in history!
        </p>
        <span className={styles.bannerBottomSecondHead}>
          THE RISE - NFT COLLECTION
        </span>
        <p>
          Now you can immerse yourself in this terrifying saga through an
          authorised, limited edition NFT collection that includes rare art, 3D
          digital sculpts and incredible animated pieces.
        </p>
      </Container>
    </Paper>
  );
};

const BannerItem: React.FC = () => {
  return (
    <>
      <div className={styles.BannerContainer}>
        {[RiseCrowd].map((img, index) => (
          <Item image={img} key={index} />
        ))}
      </div>
    </>
  );
};

export default BannerItem;
