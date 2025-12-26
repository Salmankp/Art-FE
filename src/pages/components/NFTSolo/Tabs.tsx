import React, { useState } from 'react';
import { getArtistBio } from 'utils/helpers';
import styles from '../styles/NFTSolo/Tabs.module.scss';

const Tabs = (props) => {
  const [active, setActive] = useState(1);
  return (
    <div className={styles.tabswrap}>
      <div className={styles.tabheader}>
        {props?.nftDetail?.paintingID?.about && (
          <div
            className={active === 1 ? styles.tabheadactive : styles.tabhead}
            onClick={() => setActive(1)}
          >
            <div>
              <span>
                About
                <br />
                the
              </span>
              Artwork
            </div>
          </div>
        )}
        {props?.nftDetail?.paintingID?.aboutNFT && (
          <div
            className={active === 2 ? styles.tabheadactive : styles.tabhead}
            onClick={() => setActive(2)}
          >
            <div>
              <span>
                About
                <br />
                the
              </span>
              NFT
            </div>
          </div>
        )}
        {props?.nftDetail?.paintingID?.artists.length > 0 && (
          <div
            className={active === 3 ? styles.tabheadactive : styles.tabhead}
            onClick={() => setActive(3)}
          >
            <div>
              <span>
                About
                <br />
                the
              </span>
              Artist
            </div>
          </div>
        )}
        {props?.nftDetail?.paintingID?.collection?.description && (
          <div
            className={active === 4 ? styles.tabheadactive : styles.tabhead}
            onClick={() => setActive(4)}
          >
            <div>
              <span>
                About
                <br />
                the
              </span>
              Collection
            </div>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div
          className={active === 1 ? styles.tabcontentactive : styles.tabcontent}
        >
          {props?.nftDetail?.paintingID?.about}
        </div>
        <div
          className={active === 2 ? styles.tabcontentactive : styles.tabcontent}
        >
          {props?.nftDetail?.paintingID?.aboutNFT}
        </div>
        <div
          className={active === 3 ? styles.tabcontentactive : styles.tabcontent}
        >
          <p>
            {getArtistBio(props?.nftDetail?.paintingID?.artists || [], true)}
          </p>
        </div>
        <div
          className={active === 4 ? styles.tabcontentactive : styles.tabcontent}
        >
          {props?.nftDetail?.paintingID?.collection?.description}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
