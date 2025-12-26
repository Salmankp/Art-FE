import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import styles from '../styles/home2/Hero.module.scss';
import { spinningAnimationVideo } from '../../../assets/index';

export const Hero: React.FC = () => {
  // get viewport width for client animations
  const [width, setWidth] = useState(window.innerWidth);
  // triggers inView if 10% in viewport

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  // Use to call "updateWidth" everytime width changes
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  });

  if (width < 1200) {
    return null;
  }
  // container for colorful text
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
        when: 'beforeChildren',
      },
    },
  };
  // scaler for animations
  const scale = width <= 900 ? 0.5 : 1;
  // controls for the text animation (vertical)
  const item = {
    hidden: { opacity: 0, y: 50 * scale },
    show: {
      opacity: [0, 1, 1, 0],
      y: [50 * scale, 0, 0, -50 * scale],
      transition: {
        times: [0, 0.1, 0.9, 1],
        type: 'tween',
        ease: 'easeInOut',
        repeatDelay: 3,
        duration: 1,
      },
    },
  };
  // last shown item
  const lastItem = {
    hidden: { opacity: 0, y: 50 * scale },
    show: {
      opacity: [0, 1, 1, 1],
      y: [50 * scale, 0, 0, 0],
      transition: {
        times: [0, 0.1, 0.9, 1],
        type: 'tween',
        ease: 'easeInOut',
        repeatDelay: 3,
        duration: 1,
      },
    },
  };
  // controls for the text animations (horizontal)
  const elems = 6;
  const passion = {
    start: { x: 0 },
    show: {
      x: [
        -25 * scale,
        -45 * scale,
        10 * scale,
        -0 * scale,
        -0 * scale,
        -40 * scale,
      ],
      transition: {
        delay: 1.25,
        times: [
          0,
          1 / elems,
          2 / elems - 0.1,
          3 / elems,
          4 / elems,
          5 / elems - 0.1,
        ],
        type: 'tween',
        ease: 'easeInOut',
        duration: elems,
      },
    },
  };

  return (
    <div className={styles.hero}>
      <Grid
        container
        className={styles.grid}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item className={styles.innerGrid}>
          <Typography variant="h3" className={styles.header}>
            <motion.span
              style={{
                display: 'flex',
                flexDirection: 'column',
                paddingRight: '10px',
              }}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={container}
            >
              <motion.span className={styles.highlight} variants={item}>
                Display
              </motion.span>
              <motion.span className={styles.highlight2} variants={item}>
                Curate
              </motion.span>
              <motion.span className={styles.highlight3} variants={item}>
                Discover
              </motion.span>
              <motion.span className={styles.highlight4} variants={item}>
                Embrace
              </motion.span>
              <motion.span className={styles.highlight5} variants={item}>
                Connect
              </motion.span>
              <motion.span className={styles.highlight6} variants={lastItem}>
                Collect
              </motion.span>
            </motion.span>
            <motion.span initial="start" animate="show" variants={passion}>
              your passion
            </motion.span>
          </Typography>
          <Typography variant="h6" className={styles.text}>
            Environmentally friendly NFTs by the world's greatest creators
          </Typography>
          <Typography variant="h6" className={styles.text2}>
            Art. Music. Collectables. Immersive Experiences.
          </Typography>
        </Grid>
        <video
          width="400"
          height="300"
          autoPlay
          muted
          loop
          className={styles.card}
        >
          <source src={spinningAnimationVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Grid>
    </div>
  );
};
