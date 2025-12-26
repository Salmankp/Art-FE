import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import styles from '../styles/Errorpage/Home.module.scss';

import { error } from '../../../assets/index';

const Home = () => {
  return (
    <div className={styles.outerwrap}>
      <Container>
        <Box className={styles.errorImg}>
          <Typography className={styles.Errortext}>Opps 404 Error</Typography>
          <Typography className={styles.textdetail}>
            It seems we can't find what you're looking for.
          </Typography>
          <img src={error} alt="" />
        </Box>
      </Container>
    </div>
  );
};

export default Home;
