import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useInView } from 'react-intersection-observer';

import { guitar } from '../../../assets';
import SlideMotion from '../animations/SlideMotion';
import styles from '../styles/technical/Hero.module.scss';

export const MobileHero: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  // Use to call "updateWidth" everytime width changes
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  });

  if (width >= 619) {
    return null;
  }

  return (
    <div className={styles.hero} ref={ref}>
      {inView && (
        <SlideMotion direction="down">
          <Grid
            container
            className={styles.grid}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item sm={6} className={styles.matter}>
              <Typography variant="h3" className={styles.text1}>
                Digital Collectables
              </Typography>
              <Typography variant="h3" className={styles.text2}>
                Done Differently
              </Typography>
            </Grid>
            <Grid item className={styles.image}>
              <img
                src={guitar}
                alt="hero"
                className={styles.card}
                style={{
                  height: '10',
                  width: '40',
                  transform: 'scale(0.85)',
                  margin: '0 auto',
                }}
              />
            </Grid>
            <Grid item className={styles.text_padding}>
              <Typography variant="h6" className={styles.text3}>
                At
                <b>artefy</b>
                we're committed to bringing you the best of what the digital
                world can offer. Enjoy real experiences that connect you to your
                favourite creators and brands.
                <br />
                <hr />
                Everything from the mintine engine and wallet to the
                marketplace, virtual galleries and
                <b> artefy </b>
                Crates are built from scratch.
              </Typography>
            </Grid>

            <Typography variant="h4" className={styles.text4}>
              We're redifining what an NFT can be and what they can do
            </Typography>
          </Grid>
        </SlideMotion>
      )}
    </div>
  );
};
