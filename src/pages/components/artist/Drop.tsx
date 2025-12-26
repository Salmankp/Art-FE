import React from 'react';
import { drop, smallcircle } from '../../../assets';
import styles from '../styles/artist/Drop.module.scss';

export const Drop = ({ live, time }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={drop} alt="Drop" />
        </div>
        <div className={styles.drop}>
          <div className={styles.live}>
            {live && <p className={styles.heading}>DROP LIVE</p>}
            {!live && (
              <button className={styles.time}>
                DROPPING IN
                <span>
                  {time.days}
                  Days
                </span>
                <span />
                <span />
                <span />
              </button>
            )}
            <div className={styles.upper}>
              <div className={styles.name}>Frank Frazetta</div>
              <div className={styles.collection}> Warriors Collection</div>
              <p>
                The first version of this painting appeared on the cover of the
                paperback, 'Conan The Buccaneer.’ Once Lancer returned the
                artwork to Frazetta, he repainted Conan in a alternative stance
                with an axe.
              </p>
            </div>
          </div>
          <div className={styles.middle}>
            <div className={live ? styles.tagline : styles.tagline1}>
              <hr />
              10 SUPER RARE NFTs, 80 EDITIONS EACH
            </div>
            <hr />
            <div className={styles.price}>
              <div>$350</div>
              <div className={styles.last}>HURRY, 2 LEFT!</div>
            </div>
            <hr />
          </div>

          <div className={styles.lower}>
            {live && (
              <>
                <button className={styles.buy}>BUY NOW</button>
                <button className={styles.view}> VIEW COLLECTION</button>
              </>
            )}
            {!live && (
              <>
                <button className={styles.coming}>
                  Don’t miss the drop. Add to callendar
                  <img src={smallcircle} className={styles.image} alt="arrow" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
