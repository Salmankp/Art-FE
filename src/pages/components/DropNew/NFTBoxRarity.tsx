import React from 'react';
import { Typography } from '@material-ui/core';
import styles from '../styles/RemasteredDrop/MasonaryDrop.module.scss';
import {
  redLogo,
  extraordinaryDrop,
  uniqueDrop,
  legendaryDrop,
  classicDrop,
  rareDrop,
  limitedDrop,
  artefyGradientLogo,
  commonDrop,
} from '../../../assets';

const rarityData = {
  Masterpiece: {
    img: redLogo,
    styles: styles.txt2,
  },
  Extraordinary: {
    img: extraordinaryDrop,
    styles: styles.txtExtraordinary,
  },
  Unique: {
    img: uniqueDrop,
    styles: styles.txtUnique,
  },
  Legendary: {
    img: legendaryDrop,
    styles: styles.txtLegendary,
  },
  Classic: {
    img: classicDrop,
    styles: styles.txtClassic,
  },
  Rare: {
    img: rareDrop,
    styles: styles.txtRare,
  },
  Limited: {
    img: limitedDrop,
    styles: styles.txtLimited,
  },
  Common: {
    img: commonDrop,
    styles: styles.txtCommon,
  },
  Special: {
    img: artefyGradientLogo,
    styles: styles.txtClassic,
  },
};

const NFTBoxRarity: React.FC<{
  rarity: any;
}> = ({ rarity }) => {
  if (!rarity)
    return (
      <>
        <Typography component="div" className={styles.rarityBadge}>
          <img src={rarityData.Common.img} className={rarityData.Common.img} />
          <div className={styles.extraordinaryText}>Common</div>
        </Typography>
      </>
    );
  return (
    <>
      <Typography component="div" className={styles.rarityBadge}>
        <img src={rarityData[rarity].img} className={styles.orangeLogo} />
        <div className={styles.extraordinaryText}>{rarity}</div>
      </Typography>
    </>
  );
};

export default NFTBoxRarity;
