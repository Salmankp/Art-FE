import React, { useRef, useState } from 'react';
import Player from 'react-player';
import styles from '../styles/Everscapes/Video.module.scss';
import {
  LatestEverscape,
  playButton2,
  everscapesHead,
} from '../../../assets/index';

const Video: React.FC = () => {
  const [hideButton, setHideButton] = useState(false);
  const play = useRef<any>({});
  return (
    <div className={styles.outerwrap}>
      <div className={styles.wrap}>
        <div className={styles.headingwrap}>
          <div className={styles.heading}>
            <img src={everscapesHead} />
          </div>
          <div className={styles.content}>
            The world’s greatest Fantasy, Sci-Fi and Horror artists are on
            EverScapes.
          </div>
        </div>
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
  );
};
export default Video;
