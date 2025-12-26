import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import { frame1, heavyMetalHeader, bannerCircleLogo, logoNew } from 'assets';
import Classes from '../../styles/MedallionDrop/MoonMaidTermsCondition/Partners.module.scss';

const Partners = () => {
  return (
    <Container>
      <Box className={Classes.partnersWrapper}>
        <Typography component="h3" className={Classes.blockTitle}>
          Our Partners
        </Typography>
        <Typography component="div" className={Classes.componyItemsWrapper}>
          <Typography component="div">
            <img
              src={bannerCircleLogo}
              alt="bannerCircleLogo"
              className={Classes.bannerCircleLogo}
            />
          </Typography>
          <Typography component="div">
            <img src={logoNew} alt="logo" className={Classes.artifyLogo} />
          </Typography>
          <Typography component="div">
            <img src={frame1} alt="frame1" className={Classes.frame1} />
          </Typography>
          <Typography component="div">
            <img
              src={heavyMetalHeader}
              alt="heavyMetalHeader"
              className={Classes.heavyMetalHeader}
            />
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

export default Partners;
