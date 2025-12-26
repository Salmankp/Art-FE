import React, { useState } from 'react';
import { getArtistBio } from 'utils/helpers';
import styles from '../styles/MarketPlaceStatic/Tabs.module.scss';

const Tabs: React.FC<{
  aboutTheArtWork: string;
  aboutTheNFT: string;
  aboutTheArtist: string;
  aboutTheCollection: string;
}> = ({
  aboutTheArtWork = '',
  aboutTheNFT = '',
  aboutTheArtist = '',
  aboutTheCollection,
}) => {
  const [active, setActive] = useState(1);
  return (
    <div className={styles.tabswrap}>
      <div className={styles.tabheader}>
        <div
          className={active === 1 ? styles.tabheadactive : styles.tabhead}
          onClick={() => setActive(1)}
        >
          <div>About the Artwork</div>
        </div>
        {/* Hide this tab for now */}
        {/* <div
          className={active === 2 ? styles.tabheadactive : styles.tabhead}
          onClick={() => setActive(2)}
        >
          <div>
            <span>
              About
              <br />
              the
            </span>{' '}
            NFT
          </div>
        </div> */}
        <div
          className={active === 3 ? styles.tabheadactive : styles.tabhead}
          onClick={() => setActive(3)}
        >
          <div>About the Artist</div>
        </div>
        {/* <div
          className={active === 4 ? styles.tabheadactive : styles.tabhead}
          onClick={() => setActive(4)}
        >
          <div>{'About the Collection'}</div>
        </div> */}
      </div>
      <div className={styles.body}>
        <div
          className={active === 1 ? styles.tabcontentactive : styles.tabcontent}
        >
          {aboutTheArtWork}
        </div>
        {/* Hide this tab for now */}
        {/* <div
          className={active === 2 ? styles.tabcontentactive : styles.tabcontent}
        >
          {aboutTheNFT}
        </div> */}
        <div
          className={active === 3 ? styles.tabcontentactive : styles.tabcontent}
        >
          {getArtistBio(aboutTheArtist, false)}
        </div>
        {/*  Hide this tab for now 
        <div
          className={active === 4 ? styles.tabcontentactive : styles.tabcontent}
        >
          {aboutTheCollection}
        </div> */}
      </div>
    </div>
  );
};

export default Tabs;
