import React, { useState, useRef } from 'react';
import Player from 'react-player';
import styles from '../styles/VulcanVerse/Price.module.scss';
import {
  Prize1,
  Prize2,
  Prize3,
  Prize4,
  Prize5,
  Prize6,
  Prize7,
  PrizeVideo8,
  playButton2,
} from '../../../assets/index';

const Price: React.FC = () => {
  const [hideButton, setHideButton] = useState(false);
  const play = useRef<any>({});
  return (
    <div className={styles.Signup}>
      <div className={styles.innerwrap}>
        <div className={styles.headingText}>
          <h2>
            <span>Prizes</span>
            <br />
            Over 300 To Be Won!
          </h2>
        </div>
        <div className={styles.gridprice}>
          <div className={styles.gridItem}>
            <div className={styles.gridinner}>
              <h3>1st Prize</h3>
              <img src={Prize1} alt="" />
              <p className={styles.gridDescription}>
                Silver Warrior Playable NFT! The 2nd ever video game appearance
                of any of Frazetta’s legendary characters
              </p>
              <span className={styles.availble}>
                Available to win: 1
                <br />
                Editions: 1
              </span>
            </div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.gridinner}>
              <h3>2nd Prize</h3>
              <img src={Prize2} alt="" />
              <p className={styles.gridDescription}>
                One lot of VulcanVerse land in the Mountains of Boreas. Exlusive
                NFT ownership of this land
              </p>
              <span className={styles.availble}>
                Available to win: 1
                <br />
                Editions: 1
              </span>
            </div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.gridinner}>
              <h3>3rd Prize</h3>
              <img src={Prize3} alt="" />
              <p className={styles.gridDescription}>
                Mountains of Boreas Aelio Vulcanite NFT
              </p>
              <span className={styles.availble}>
                Available to win: 1
                <br />
                Editions: 200
              </span>
            </div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.gridinner}>
              <h3>4th Prize</h3>
              <img src={Prize4} alt="" />
              <p className={styles.gridDescription}>
                Silver Warrior Armour in game item
              </p>
              <span className={styles.availble}>
                Available to win: 10
                <br />
                Editions: 10
              </span>
            </div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.gridinner}>
              <h3>5th Prize</h3>
              <img src={Prize5} alt="" />
              <p className={styles.gridDescription}>
                Silver Warrior Sword in game item
              </p>
              <span className={styles.availble}>
                Available to win: 10
                <br />
                Editions: 10
              </span>
            </div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.gridinner}>
              <h3>6th Prize</h3>
              <img src={Prize6} alt="" />
              <p className={styles.gridDescription}>
                Silver Warrior Helmet in game item
              </p>
              <span className={styles.availble}>
                Available to win: 10
                <br />
                Editions: 10
              </span>
            </div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.gridinner}>
              <h3>7th Prize</h3>
              <img src={Prize7} alt="" />
              <p className={styles.gridDescription}>
                Silve Warrior NFT as created by Jimmi X Including physical
                poster
              </p>
              <span className={styles.availble}>
                Available to win: 50
                <br />
                Editions: 50
              </span>
            </div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.gridinner}>
              <h3>8th Prize</h3>
              <div
                className={styles.videowrap}
                style={{ position: 'relative' }}
              >
                <Player
                  url={PrizeVideo8}
                  height="330px"
                  width="100%"
                  autoplay
                  ref={play}
                  onStart={() => setHideButton(true)}
                />
                {!hideButton && (
                  <img
                    onClick={() => {
                      setHideButton(true),
                        play.current && play?.current.player?.player?.play();
                    }}
                    style={{
                      position: 'absolute',
                      top: '37.5%',
                      left: '35%',
                      width: '80px',
                      height: '80px',
                    }}
                    src={playButton2}
                    className={styles.playerIconButton}
                  />
                )}
              </div>
              <p className={styles.gridDescription}>
                Silver Warrior Animated NFT
              </p>
              <span className={styles.availble}>
                Available to win: 250
                <br />
                Editions: 250
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
