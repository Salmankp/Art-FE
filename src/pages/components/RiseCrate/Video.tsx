import React, { useRef, useState } from 'react';
import Player from 'react-player';
import styles from '../styles/RiseCrate/Video.module.scss';
import { thumbnail, video, playButton2 } from '../../../assets/index';

const Video: React.FC = () => {
  const [hideButton, setHideButton] = useState(false);
  const play = useRef<any>({});
  return (
    <div className={styles.outerwrap}>
      <div className={styles.wrap}>
        <div className={styles.videowrap} style={{ position: 'relative' }}>
          <Player
            url={video}
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
      <div className={styles.videoBottomText}>
        COLLECT THE FIRST 50 PIECES NOW
      </div>
    </div>
  );
};
export default Video;
