import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import { vlogo, bannerCircleLogo, moonmaidMain, irayettaFrenzy } from 'assets';
import Classes from '../../styles/MedallionDrop/MoonMaidTermsCondition/Header.module.scss';

const Header = () => {
  return (
    <Container className={Classes.moonmaidTermsContainer}>
      <Box className={Classes.moonmaidTermsConditionHeader}>
        <Typography component="div">
          <img src={vlogo} alt="vlogo" className={Classes.vLogo} />
        </Typography>
        <Typography component="div">
          <img
            src={irayettaFrenzy}
            alt="CircleLogo"
            className={Classes.irayettaFrenzy}
          />
        </Typography>
        <Typography component="div">
          <img
            src={bannerCircleLogo}
            alt="CircleLogo"
            className={Classes.circleLogo}
          />
        </Typography>

        <Typography component="div">
          <img
            src={moonmaidMain}
            alt="CircleLogo"
            className={Classes.moonmaidMain}
          />
        </Typography>
      </Box>
    </Container>
  );
};

export default Header;
