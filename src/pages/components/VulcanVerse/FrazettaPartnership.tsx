import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Player from 'react-player';
import styles from '../styles/VulcanVerse/FrazettaPartnership.module.scss';
import {
  DarkKingdomGrid,
  Everscapelarge,
  CirueloGrid,
  GimenezGrid,
  GregGrid,
  MetalGrid,
  SanjulianGrid,
  SauerGrid,
  HildeGrid,
  AnnaGrid,
  HescoxGrid,
  LatestEverscape,
  playButton2,
} from '../../../assets/index';

const FrazettaPartnership: React.FC = () => {
  const [hideButton, setHideButton] = useState(false);
  const play = useRef<any>({});
  return (
    <div className={styles.Signup}>
      <div className={styles.innerwrap}>
        <div className={styles.contentInner}>
          <div className={styles.textLine}>
            FRAZETTA PARTNERSHIP AND ADDITIONAL PRIZES BROUGHT TO YOU BY
            <img src={Everscapelarge} alt="" />
          </div>
          <div className={styles.textDetail}>
            The first NFT platform dedicated to Fantasy, Sci-Fi and Horror with
            incredible NFTs history’s greatest artists. Complete themed
            collections, curate virtual galleries and discover mystery crates
            all backed by our environmentally friendly blockchain.
          </div>
          <div className={styles.gradientText}>
            The Masters of Fantasy, Sci-fi & Horror are on EverScapes
          </div>
          <div className={styles.videoEverscap}>
            <div className={styles.wrap}>
              <div className={styles.videowrap}>
                <Player
                  url={LatestEverscape}
                  height="100%"
                  width="100%"
                  autoplay
                  ref={play}
                  onStart={() => setHideButton(true)}
                  controls={hideButton && true}
                />
                {!hideButton && (
                  <img
                    onClick={() => {
                      setHideButton(true),
                        play.current && play?.current.player?.player?.play();
                    }}
                    style={{
                      position: 'absolute',
                      top: '35%',
                      left: '45%',
                      width: '80px',
                    }}
                    src={playButton2}
                    className={styles.playerIconButton}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Nftgrid}>
          <div className={styles.gridItem}>
            <img src={DarkKingdomGrid} alt="" />
            <span className={styles.Nftname}>Frank Frazetta</span>
          </div>
          <div className={styles.gridItem}>
            <img src={CirueloGrid} alt="" />
            <span className={styles.Nftname}>Ciruelo</span>
          </div>
          <div className={styles.gridItem}>
            <img src={GimenezGrid} alt="" />
            <span className={styles.Nftname}>
              Juan
              <br />
              Giménez
            </span>
          </div>
          <div className={styles.gridItem}>
            <img src={SanjulianGrid} alt="" />
            <span className={styles.Nftname}>Sanjulián</span>
          </div>
          <div className={styles.gridItem}>
            <img src={MetalGrid} alt="" />
            <span className={styles.Nftname}>
              Heavy
              <br />
              Metal
            </span>
          </div>
          <div className={styles.gridItem}>
            <img src={HescoxGrid} alt="" />
            <span className={styles.Nftname}>
              Richard
              <br />
              Hescox
            </span>
          </div>
          <div className={styles.gridItem}>
            <img src={GregGrid} alt="" />
            <span className={styles.Nftname}>
              Greg
              <br />
              Hildebrandt
            </span>
          </div>
          <div className={styles.gridItem}>
            <img src={SauerGrid} alt="" />
            <span className={styles.Nftname}>
              Sven
              <br />
              Sauer
            </span>
          </div>
          <div className={styles.gridItem}>
            <img src={HildeGrid} alt="" />
            <span className={styles.Nftname}>
              Brothers
              <br />
              Hildebrandt
            </span>
          </div>
          <div className={styles.gridItem}>
            <img src={AnnaGrid} alt="" />
            <span className={styles.Nftname}>
              Anna
              <br />
              Podedworna
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrazettaPartnership;
