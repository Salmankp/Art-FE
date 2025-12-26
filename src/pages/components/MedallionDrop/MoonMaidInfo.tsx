import React from 'react';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import Classes from '../styles/MedallionDrop/MoonMaidInfo.module.scss';

import {
  vlogo,
  chiron,
  kallisto,
  mapMoonMaid,
  moonMaidConcept,
  satyr,
  velosina,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  mainImg1,
  mainImg2,
  conceptImg,
} from '../../../assets';

const MoonMaidInfo = () => {
  const imagesBlock = [image1, image2, image3, image4, image5, image6];
  return (
    <Box className={Classes.moonMaidInfoWrapper}>
      <Container style={{ maxWidth: '1120px', margin: 'auto' }}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Typography
              component="div"
              style={{
                background: `url(${conceptImg})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
              className={Classes.infoCardItem}
            >
              <Typography component="div" style={{ textAlign: 'end' }}>
                <img src={vlogo} className={Classes.vLogo} alt="vlogo" />
              </Typography>

              {/* <Typography component="div" className={Classes.bottomInfoWrapper}>
                <Typography component="h3" className={Classes.cardTitle}>
                  MOON MAID
                </Typography>
                <Typography component="h3" className={Classes.descriptionText}>
                  FRANK FRAZETTA'S CONCEPT
                </Typography>
              </Typography> */}
            </Typography>

            <Typography className={Classes.blockDescription}>
              Buy a Blue, Bronze, Silver or Gold Medallion and receive one of
              two Berserk Cards
            </Typography>
            <Typography className={Classes.bottomMetaInfo}>
              Randomly receive one of two Berserk
              <br />
              Cards when you buy selected NFTs.
              <br />
              <a
                href="https://myforge.vulcanforged.com/"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '12px',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Vulcanforged Account needed to claim
              </a>
            </Typography>
          </Grid>
          <Grid item md={8}>
            <Box marginLeft="2%">
              <Typography component="h3" className={Classes.rightBlockTitle}>
                Frazetta Frenzy Moon Maid
              </Typography>
              <Typography className={Classes.rightBlockDescription}>
                Buy Moon Maid Medallions NFTs to enter the draw. There are over
                300 prizes to be won! That’s over $120,000 value in NFTs!
              </Typography>
            </Box>
            <Box className={Classes.gridImgContainer}>
              {imagesBlock.map((item, index) => {
                return (
                  <Typography key={index} component="div">
                    <img
                      src={item}
                      alt="moonMaidConcept"
                      className={Classes.gridImg}
                    />
                  </Typography>
                );
              })}

              {/* <Typography component="div">
                <img src={satyr} alt="satyr" className={Classes.gridImg} />
              </Typography>
              <Typography component="div">
                <img src={velosina} alt="satyr" className={Classes.gridImg} />
              </Typography>
              <Typography component="div">
                <img
                  src={mapMoonMaid}
                  alt="mapMoonMaid"
                  className={Classes.gridImg}
                />
              </Typography> */}
            </Box>
            <Typography component="div" className={Classes.addIconWrapper}>
              <span className={Classes.addIcon}>+</span>
            </Typography>
            <Typography component="div" className={Classes.bottomImgContainer}>
              <Typography component="div">
                <img src={mainImg1} className={Classes.imgItem} alt="chiron" />
                <Typography className={Classes.cardCaption}>
                  Berserk Card One
                </Typography>
              </Typography>
              <Typography
                component="div"
                style={{ color: 'white', fontSize: '31px' }}
              >
                or
              </Typography>
              <Typography component="div">
                <img src={mainImg2} className={Classes.imgItem} alt="chiron" />
                <Typography className={Classes.cardCaption}>
                  Berserk Card One
                </Typography>
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MoonMaidInfo;
