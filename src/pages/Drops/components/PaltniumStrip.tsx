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
import styles from '../../components/ElmoreDrop/styles/fantasyPlatinum.module.scss';

const PaltniumStrip = (data) => {
  const history = useHistory();

  return (
    <>
      <Container className={styles.platinumWrapper}>
        <Box className={styles.textWrap}>
          {data.PlatinumImage && (
            <img src={data.PlatinumImage} className={styles.elmoreFirst} />
          )}
          {data.PlatinumBackground && (
            <img src={data.PlatinumBackground} className={styles.elmoreFirst} />
          )}
          <div style={{}} className={styles.textWrapper}>
            <img src={data.PlatinumIcon} className={styles.platinumBadge} />
            <Typography className={styles.platinumTxt}>
              {data.PlatinumDescription}
            </Typography>
            {data.PlatinumIcon && (
              <img src={data.PlatinumBadge} className={styles.badge88} />
            )}
          </div>
        </Box>
      </Container>
    </>
  );
};
export default PaltniumStrip;
