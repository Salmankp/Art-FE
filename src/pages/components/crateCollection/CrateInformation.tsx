import { Box, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import styles from '../styles/CrateSolo/Header.module.scss';
import {
  cratesoloheader,
  cratesoloimg,
  incredible1,
  incredible2,
} from '../../../assets/index';
import { rarityLogo, rarityColor } from '../../../utils/helpers';
import PurchaseCrateCard from './PurchaseCrateCard';
import RewardPopup from './RewardPopup';

interface CrateInformationProps {
  name: string;
  description: string;
  numOfTotalCollectables?: number;
  numOfCollectedCrates?: number;
  groupedPaintings: any;
  backgroundImage: string;
  artists: Array<any> | undefined;
  crateData: any;
  isLoading?: boolean | false;
  showRevealModalHandler: (show: boolean, mints: any) => void;
}
const CrateInformation = ({
  name,
  numOfTotalCollectables,
  groupedPaintings,
  backgroundImage,
  artists,
  crateData,
  isLoading,
  showRevealModalHandler,
}: CrateInformationProps) => {
  const [popup, setPopup] = useState<boolean>(false);
  return (
    <div className={styles.mainwrap}>
      <RewardPopup
        popupData={{
          popup,
          setPopup,
        }}
      />
      <div className={styles.wrap}>
        <div className={styles.heading}>8 INCREDIBLE NFTs PER CRATE</div>

        <div className={styles.desc}>
          <div className={styles.imgandcontent}>
            <div>
              <div className={styles.imgg}>
                <img src={incredible1} alt="incredible1" />
              </div>
            </div>
            <div>
              <div className={styles.imgg}>
                <img src={incredible2} alt="incredible2" />
              </div>
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.detailtitle}>
              DISCOVER THE COMPLETE COLLECTION
            </div>
            <ul>
              <li>
                <span>
                  {crateData?.lootCrateContainer?.paintings?.length}
                  &nbsp;Collectables across 5 tiers of rarity
                </span>
              </li>
              <li>
                {console.log(artists)}
                <span>
                  Featuring incredible NFT collectibles torn from the pages of
                  this horrifying story.
                </span>
              </li>
            </ul>
            <div className={styles.list}>
              {typeof groupedPaintings === 'object' &&
                Object.keys(groupedPaintings)?.map((rarity) => {
                  const colorForRarity = rarityColor(rarity);
                  return (
                    <div key={rarity} className={styles.item}>
                      <span>{groupedPaintings?.[rarity]?.length}</span>
                      <img src={rarityLogo(rarity)} alt="logo" />
                      <span style={{ color: colorForRarity }}>
                        {rarity?.toLocaleUpperCase()}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.crateCard}>
        <div className={styles.cardWrap}>
          <PurchaseCrateCard
            showRevealModalHandler={showRevealModalHandler}
            isLoading={isLoading}
            collectionName={crateData?.lootCrateContainer?.name}
            crate={crateData?.lootCrates?.[0]}
            disabled={crateData?.lootCrateContainer?.availableCrates === 0}
          />
        </div>
        <div className={styles.textWrap}>
          <div
            className={styles.topText}
            style={{ cursor: 'pointer' }}
            onClick={() => setPopup(true)}
          >
            <span className={styles.redText}>Find out more here</span>
            <br />
            about rewards and
            <br />
            incentives for collecting
            <br />
            from this set.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrateInformation;
