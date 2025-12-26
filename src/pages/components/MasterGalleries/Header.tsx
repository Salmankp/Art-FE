import React from 'react';
import { Paper, Typography, Container, Box } from '@material-ui/core';
import styles from '../styles/MasterGalleries/Header.module.scss';
import { everscapesText } from '../../../assets';

type HeaderType = { title?: string };
const Header = (_prop: HeaderType): any => {
  return (
    <>
      <div className={styles.headerWrap}>
        <Container className={styles.Container}>
          <Box className={styles.Box}>
            <div className={styles.headerTextContainer}>
              <img
                className={styles.headerText}
                src={everscapesText}
                alt="everscapes-text-header"
              />
              <div className={styles.borderBottom} />
            </div>
            <Typography variant="h2" className={styles.textInner}>
              VIRTUAL GALLERIES
            </Typography>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Header;
