import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Player from 'react-player';
import styles from '../styles/VulcanVerse/SilverWarrior.module.scss';

import {
  Silverwarriorfrenzy,
  GreenMed,
  Number20,
  SilverMed,
  BronzeMed,
  BlueMed,
  GoldMed,
  Number100,
  Number250,
  Number500,
  Number1000,
  TrailorVideo,
  SweverScapesVideo,
  playButton2,
} from '../../../assets/index';

const SilverWarrior: React.FC = () => {
  const history = useHistory();
  const [hideButton, setHideButton] = useState(false);
  const play = useRef<any>({});
  return (
    <div className={styles.Signup}>
      <div className={styles.innerwrap}>
        <div className={styles.warriorimg}>
          <div className={styles.wrap}>
            <div className={styles.videowrap}>
              <Player
                url={SweverScapesVideo}
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
        <div className={styles.EnterDraw}>
          <div className={styles.heading}>How to Enter the Draw:</div>
          <div className={styles.gridSystem}>
            <div className={styles.gridItem}>
              <div className={styles.gridHead}>
                <span className={styles.steps}>Step 1</span>
                <span className={styles.stepbuy}>Buy</span>
              </div>
              <div className={styles.description}>
                Enter the draw by purchasing a Silver Warrior Medallion
                exclusively from EverScapes.io during the Silver Warrior Drop
              </div>
            </div>
            <div className={styles.gridItem}>
              <div className={styles.gridHead}>
                <span className={styles.steps}>Step 2</span>
                <span className={styles.stepbuy}>Win</span>
              </div>
              <div className={styles.description}>
                Winners announced live on By The Fire Twitch Tuesday 23rd
                November, 7pm GMT
              </div>
            </div>
            <div className={styles.gridItem}>
              <div className={styles.gridHead}>
                <span className={styles.steps}>Step 3</span>
                <span className={styles.stepbuy}>Claim</span>
              </div>
              <div className={styles.description}>
                All winners will be emailed with instructions to claim their
                prizes
              </div>
            </div>
            <div className={styles.gridItem}>
              <div className={styles.gridHead}>
                <span className={styles.steps}>Step 4</span>
                <span className={styles.stepbuy}>Enjoy</span>
              </div>
              <div className={styles.description}>
                Use your prizes in game, display in your virtual gallery or list
                for sale on the open marketplace
              </div>
            </div>
          </div>
          <div className={styles.gridButton}>
            <Button
              onClick={() => history.push('/drop/silver-warrior-medallion')}
              className={styles.drawButton}
              style={{
                backgroundColor: '#ef0000',
              }}
              disabled
            >
              Drop Ended
            </Button>
          </div>
        </div>
        <div className={styles.gridMain}>
          <div className={styles.vulcanNft}>
            <div className={styles.vulcanNftgrid}>
              <div className={styles.gridImg}>
                <img src={GreenMed} alt="" />
              </div>
              <div className={styles.medDetails}>
                <img src={Number20} alt="" />
                <span className={styles.medName}>GREEN MEDALLION</span>
                <Button
                  onClick={() => history.push('/drop/silver-warrior-medallion')}
                  className={styles.drawButton}
                  style={{
                    fontSize: '18px',
                    backgroundColor: '#ef0000',
                  }}
                  disabled
                >
                  Drop Ended
                </Button>
                <span className={styles.medentry}>Receive 1 entry</span>
                <span className={styles.medavailable}>3000 Available </span>
              </div>
            </div>
            <div className={styles.vulcanNftgrid}>
              <div className={styles.gridImg}>
                <img src={BlueMed} alt="" />
              </div>
              <div className={styles.medDetails}>
                <img src={Number100} alt="" />
                <span className={styles.medName}>BLUE MEDALLION</span>
                <Button
                  onClick={() => history.push('/drop/silver-warrior-medallion')}
                  className={styles.drawButton}
                  style={{
                    fontSize: '18px',
                    backgroundColor: '#ef0000',
                  }}
                  disabled
                >
                  Drop Ended
                </Button>
                <span className={styles.medentry}>Receive 7 entries</span>
                <span className={styles.medavailable}>2000 Available </span>
              </div>
            </div>
          </div>
          <div className={styles.vulcanNft}>
            <div className={styles.vulcanNftgrid}>
              <div className={styles.gridImg}>
                <img src={BronzeMed} alt="" />
              </div>
              <div className={styles.medDetails}>
                <img src={Number250} alt="" />
                <span className={styles.medName}>BRONZE MEDALLION</span>
                <Button
                  onClick={() => history.push('/drop/silver-warrior-medallion')}
                  className={styles.drawButton}
                  style={{
                    fontSize: '18px',
                    backgroundColor: '#ef0000',
                  }}
                  disabled
                >
                  Drop Ended
                </Button>
                <span className={styles.medentry}>Receive 20 entries</span>
                <span className={styles.medavailable}>500 Available </span>
              </div>
            </div>
            <div className={styles.vulcanNftgrid}>
              <div className={styles.gridImg}>
                <img src={SilverMed} alt="" />
              </div>
              <div className={styles.medDetails}>
                <img src={Number500} alt="" />
                <span className={styles.medName}>SILVER MEDALLION</span>
                <Button
                  onClick={() => history.push('/drop/silver-warrior-medallion')}
                  className={styles.drawButton}
                  style={{
                    fontSize: '18px',
                    backgroundColor: '#ef0000',
                  }}
                  disabled
                >
                  Sold Out
                </Button>
                <span className={styles.medentry}>Receive 50 entries</span>
                <span
                  className={styles.medavailable}
                  style={{ textDecoration: 'line-through' }}
                >
                  300 Available
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.goldRow}>
          <div className={styles.imgGold}>
            <img src={GoldMed} alt="" />
          </div>
          <div className={styles.goldDetail}>
            <img src={Number1000} alt="" />
            <span className={styles.medName}>Gold MEDALLION</span>
            <Button
              onClick={() => history.push('/drop/silver-warrior-medallion')}
              className={styles.drawButton}
              style={{
                fontSize: '18px',
                backgroundColor: '#ef0000',
              }}
              disabled
            >
              Sold Out
            </Button>
            <span
              className={styles.medavailable}
              style={{ textDecoration: 'line-through' }}
            >
              10 Available
            </span>
          </div>
          <div className={styles.medentry}>
            <span className={styles.entrymed}>
              Receive
              <br />
              200
              <br />
              entries
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SilverWarrior;
