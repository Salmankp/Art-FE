import React from 'react';
import {
  platinumbadge,
  exploreFirst,
  badge20,
  blackcolossus,
  badge33,
} from 'assets';
import { useHistory } from 'react-router-dom';
import { Box, Container, Typography } from '@material-ui/core';
import styles from '../styles/fantasyPlatinum.module.scss';

const Platinum = (data) => {
  const history = useHistory();

  return (
    <>
      <Container className={styles.platinumWrapper}>
        <Box className={styles.textWrap}>
          <img
            src={
              data.id === '61fcc8113a79d1c93816e172'
                ? blackcolossus
                : exploreFirst
            }
            className={styles.elmoreFirst}
          />
          <div style={{}} className={styles.textWrapper}>
            <img src={platinumbadge} className={styles.platinumBadge} />
            <Typography className={styles.platinumTxt}>
              Each EverScapes Platinum release is a rare 1-of-1 edition within
              each drop that features the same art with a very cool twist. For
              your chance to score one, simply make a purchase during a drop,
              and if your edition number matches the number announced on the
              drop page – it’s yours!
            </Typography>
            <img
              src={data.id === '61fcc8113a79d1c93816e172' ? badge33 : badge20}
              className={styles.badge88}
            />
          </div>
        </Box>
      </Container>
    </>
  );
};
export default Platinum;
