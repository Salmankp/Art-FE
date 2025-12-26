import React from 'react';
import { Paper, Container } from '@material-ui/core';
import styles from '../styles/RiseCrate/Banner.module.scss';
import { RiseCrowd, riseText2 } from '../../../assets/index';
import PurchaseCrateCard from './PurchaseCrateCard';

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

const Item: React.FC<{
  image: string;
  crateData: any;
  isLoading?: boolean;
  showRevealModalHandler: (show: boolean, mints: any) => void;
}> = ({ image, crateData, isLoading, showRevealModalHandler }) => {
  return (
    <>
      <Paper
        style={{
          background: `url(${image}) no-repeat`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          boxShadow: 'none',
          textAlign: 'center',
          position: 'relative',
          paddingBottom: '1rem',
        }}
        className={styles.paperStyle}
      >
        <div className={styles.HeavyMetalContainer}>
          <div className={styles.imgContainer}>
            <img src={riseText2} className={styles.RiseText} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PurchaseCrateCard
            showRevealModalHandler={showRevealModalHandler}
            isLoading={isLoading}
            collectionName={crateData?.lootCrateContainer?.name}
            crate={crateData?.lootCrates[0]}
            disabled={crateData?.lootCrateContainer?.availableCrates === 0}
          />
        </div>
      </Paper>
      <div className={styles.mainContainer}>
        <Container
          className={styles.bannerBottomTextContainer}
          style={{ textAlign: 'center' }}
        >
          <h1 style={{ color: '#ED2425' }}>
            COLLECT THE FULL SPINE TINGLING SET
          </h1>
          <p>
            The film Night of the Living Dead changed popular culture forever,
            and now George C. Romero, the son of legendary film director George
            A. Romero, tells the story before the worst Night on Earth. Learn
            about the death, destruction, and tragedy that led to the birth of
            the modern zombie in this prequel horror saga to the most
            significant and influential horror film franchise in history!
          </p>
          <span className={styles.bannerBottomSecondHead}>
            THE RISE - NFT COLLECTION
          </span>
          <p>
            Now you can immerse yourself in this terrifying saga through an
            authorised, limited edition NFT collection that includes rare art,
            3D digital sculpts and incredible animated pieces.
          </p>
        </Container>
      </div>
    </>
  );
};

const BannerItem: React.FC<{
  crateData: any;
  isLoading?: boolean;
  showRevealModalHandler: (show: boolean, mints: any) => void;
}> = ({ crateData, isLoading, showRevealModalHandler }) => {
  return (
    <>
      <div className={styles.BannerContainer}>
        {[RiseCrowd].map((img, index) => (
          <Item
            showRevealModalHandler={showRevealModalHandler}
            isLoading={isLoading}
            image={img}
            key={index}
            crateData={crateData}
          />
        ))}
      </div>
    </>
  );
};

export default BannerItem;
