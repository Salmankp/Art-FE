import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  logoNew,
  everscape,
  frame,
  first,
  stadium,
  comingsoon,
  vision,
} from '../../../assets';
import styles from '../styles/home2/Features.module.scss';

const Features: React.FC = () => {
  // triggers inView if 33% in viewport
  const [width, setWidth] = useState(window.innerWidth);
  const isComing = true;
  const history = useHistory();

  // triggers inView if 25% in viewport

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  // Use to call "updateWidth" everytime width changes
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  });

  if (width <= 1185) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.upper}>
          <div className={styles.heading}>
            Powered by &nbsp;
            <img
              src={logoNew}
              alt="logoNew"
              style={{ width: '122px', height: '48px' }}
            />
          </div>
          <div className={styles.text}>
            Digital collectables are as varied as the passions, lifestyles and
            hobbies from which they come. Find works, and communities that
            relate to you. From fantasy art to music to sport or gaming,
            wherever your passion lives, Artefy has you covered.
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.middle_img}>
            <img src={everscape} alt="Everscape" />
          </div>
          <div className={styles.everscape}>
            <img src={frame} alt="Everscape" />
            <p>
              The world’s greatest Fantasy, Sci-Fi and Horror artists are on
              EverScapes, the revolutionary new digital art platform from
              Artefy. Packed with amazing art, virtual display galleries and
              themed collections you can discover and own authentic, limited
              edition NFTs all backed by Polygon’s environmentally friendly
              blockchain.
            </p>
            <p>
              Featuring works from Frank Frazetta, Heavy Metal Magazine,
              Ciruelo, Sanjulián, Juan Giménez, Richard Hescox &amp; many more.
            </p>
            <div className={styles.btnContainer}>
              <button
                className={styles.button}
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    left: 0,
                  });
                  history.push('/everscapes');
                }}
              >
                Explore EverScapes
              </button>
            </div>
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.first}>
            <img src={first} alt="logo" />
            <h3> Classick. Club</h3>
            <p style={{ fontSize: '20px' }}>
              Music Collectables done differently
              <br />
              <span>Coming Q4 2021</span>
            </p>
          </div>
          <div className={styles.second}>
            {isComing && (
              <img
                src={comingsoon}
                alt="coming soon"
                className={styles.topImage}
              />
            )}
            <img
              src={vision}
              alt="logo"
              style={{
                filter: 'grayscale(100%)',
              }}
            />
            <h3> Visions</h3>
            <p style={{ fontSize: '20px' }}>
              Contemporary digital art at your fingertips
            </p>
          </div>
          <div className={styles.third}>
            {isComing && (
              <img
                src={comingsoon}
                alt="coming soon"
                className={styles.topImage}
              />
            )}
            <img
              src={stadium}
              alt="logo"
              style={{
                filter: 'grayscale(100%)',
              }}
            />
            <h3>Stadium</h3>
            <p style={{ fontSize: '20px' }}>
              Unique sports memorabilia and collectables
            </p>
          </div>
        </div>
        <div className={styles.lowest}>
          <div className={styles.main}>
            <img src={logoNew} height="57px" width="144px" alt="logo" />
            <span> &nbsp; - one account, endless possibilities</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
