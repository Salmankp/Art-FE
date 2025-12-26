import React from 'react';
import styles from '../styles/home2/Join.module.scss';
import { whitediscordlogo, bgjoin } from '../../../assets';

const Join: React.FC = () => {
  return (
    <>
      <div className={styles.border} />
      <div
        className={styles.outerwrap}
        style={{
          backgroundImage: `url(${bgjoin})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.wrap}>
          <div className={styles.content}>
            Be the first to know about new releases.
            <br />
            Join the community on Discord
          </div>
          <div className={styles.button}>
            <button
              onClick={() =>
                window.open('https://discord.com/invite/WvsK5nwAxV', '_blank')
              }
            >
              Join Now
            </button>
          </div>
          <div className={styles.logo}>
            <img src={whitediscordlogo} alt="logo" />
          </div>
        </div>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default Join;
