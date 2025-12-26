import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from '@material-ui/core';
import Player from 'react-player';
import styles from '../styles/VulcanVerse/DiscoverWorld.module.scss';
import {
  Discover,
  LogoVV,
  WhatNFT,
  ForgeThumbnailvulcan,
  ForgeThumbnail,
  SweverScapesVideo,
  TrailorVideo,
  playButton2,
} from '../../../assets';

const DiscoverWorld: React.FC = () => {
  const [hideButton, setHideButton] = useState(false);
  const play = useRef<any>({});
  return (
    <>
      <div className={styles.outerwrap}>
        <div className={styles.wrap}>
          <div className={styles.Maindiv}>
            <div className={styles.topHead}>
              <div className={styles.discover}>
                <img src={Discover} alt="" className={styles.Dlogo} />
                <img src={LogoVV} alt="" className={styles.vlogo} />
              </div>
            </div>
            <div className={styles.wVulcano}>
              <div className={styles.textDetail}>
                <h3>What Is VulcanVerse</h3>
                <p>
                  VulcanVerse is an open-world massive multiplayer online
                  role-playing game (MMORPG) with lore written by fighting
                  fantasy authors. Inside VulcanVerse, players can truly own
                  assets in the form of Non-Fungible Tokens (NFTs).
                </p>
                <p>
                  In VulcanVerse, create your own quests and adventures, forage
                  for NFTs, and battle against other Vulcanites. The native
                  token for VulcanVerse, $PYR, is used as a settlement, staking,
                  and gaming token.
                </p>
                <span>We Sleep. We Dream. We Fade into Eternity.</span>
                <Link>https://vv.vulcanforged.com</Link>
              </div>
              <div className={styles.whatNftimg}>
                <img src={WhatNFT} />
              </div>
            </div>
            <div className={styles.forgevideo}>
              <div className={styles.wrap}>
                <div
                  className={styles.videowrap}
                  style={{ position: 'relative' }}
                >
                  <Player
                    url={TrailorVideo}
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
                        top: '40%',
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
        </div>
      </div>
    </>
  );
};

export default DiscoverWorld;
