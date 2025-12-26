import React from 'react';
import { makeStyles } from '@material-ui/core';
import nftStyles from '../pages/components/styles/dashboard/Grid.module.scss';
import {
  redLogo,
  extraordinaryDrop,
  uniqueDrop,
  legendaryDrop,
  classicDrop,
  rareDrop,
  limitedDrop,
  commonDrop,
} from '../assets';

const useStyles = makeStyles({
  right: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  badge: {
    color: '#fcfcfd',
    fontSize: '20px',
    fontFamily: 'Open Sans',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    maxWidth: '20px !important',
    marginRight: '8px !important',
  },
});

export const rarityData = {
  Masterpiece: {
    img: redLogo,
    styles: nftStyles.txt2,
  },
  Extraordinary: {
    img: extraordinaryDrop,
    styles: nftStyles.txtExtraordinary,
  },
  Unique: {
    img: uniqueDrop,
    styles: nftStyles.txtUnique,
  },
  Legendary: {
    img: legendaryDrop,
    styles: nftStyles.txtLegendary,
  },
  Classic: {
    img: classicDrop,
    styles: nftStyles.txtClassic,
  },
  Rare: {
    img: rareDrop,
    styles: nftStyles.txtRare,
  },
  Limited: {
    img: limitedDrop,
    styles: nftStyles.txtLimited,
  },
  Common: {
    img: commonDrop,
    styles: nftStyles.txtCommon,
  },
};

export const NFTBoxRarity: React.FC<{
  rarity: any;
}> = ({ rarity }) => {
  const classes = useStyles();
  if (!rarity || !rarityData[rarity])
    return (
      <>
        <div className={classes.right}>
          <div className={classes.badge}>
            <img
              className={classes.img}
              src={rarityData.Common.img}
              alt={rarityData.Common.img}
            />
            Common
          </div>
        </div>
      </>
    );
  return (
    <>
      <div className={classes.right}>
        <div className={classes.badge}>
          <img
            className={classes.img}
            src={rarityData[rarity].img}
            alt={rarityData[rarity].img}
          />
          {rarity}
        </div>
      </div>
    </>
  );
};
