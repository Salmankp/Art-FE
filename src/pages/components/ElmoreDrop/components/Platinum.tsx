import React from 'react';
import {
  platinumbadge,
  elmorefirst,
  badge88,
  infiniteFirst,
  infiniteBadge,
} from 'assets';
import { useHistory } from 'react-router-dom';
import { Box, Container, Typography } from '@material-ui/core';
import styles from '../styles/style.module.scss';

const Platinum: React.FC = () => {
  const history = useHistory();
  const isInfinityWorlds = location.pathname === '/drop/infinite-worlds';
  return (
    <>
      <Container className={styles.platinumWrapper}>
        <Box className={styles.textWrap}>
          <img
            src={isInfinityWorlds ? infiniteFirst : elmorefirst}
            className={styles.elmoreFirst}
          />
          <img src={platinumbadge} className={styles.platinumBadge} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography className={styles.platinumTxt}>
              Each EverScapes Platinum release is a rare 1-of-1 edition within
              each drop that features the same art with a very cool twist.
              <br />
              For your chance to score one, simply make a purchase during a
              drop, and if your edition number matches the number announced on
              the drop page – it’s yours!
            </Typography>
            <img
              src={isInfinityWorlds ? infiniteBadge : badge88}
              className={styles.badge88}
            />
          </div>
        </Box>
      </Container>
    </>
  );
};
export default Platinum;
