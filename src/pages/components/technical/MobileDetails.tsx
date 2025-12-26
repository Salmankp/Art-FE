import React, { useState, useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import {
  vulcan,
  polygon,
  logoLetter,
  metal,
  galleries,
  crates,
  token,
  app,
  arrow,
  world,
} from '../../../assets';
import logo from '../../../assets/images/logo.png';
import SlideMotion from '../animations/SlideMotion';
import styles from '../styles/technical/MobileDetails.module.scss';

interface dict {
  [key: string]: string;
}

const details: dict[] = [
  {
    atLast: 'false',
    containsImage: 'true',
    title: ' is different',
    image: vulcan,
    body: 'We believe NFTs and digital collectables are so much more than something that’s just stored in a digital wallet. Curate your own custom gallery to display your NFTs and get rewarded for doing so. Fill your collection faster via random loot crates full of valuable surprises. Connect, not just with other collectors, but with the artists and creators themselves. Buy and sell using your card, crypto our own artefy token. Bring your NFTs into the physical world via our artefy App. Building creative partnerships with the most innovative and beloved companies from around the world. By blending cutting edge technology with the creators and brands you love, we’re creating a whole new world for digital collectables.',
  },
  {
    atLast: 'false',
    containsImage: 'false',
    title: 'New to NFTs?',
    image: logoLetter,
    body: 'New to the world of digital collectables? We’re creating an easy-to-use experience that anyone can enjoy. You don’t need to own cryptocurrency or even know what an NFT is to get involved with artefy, however, just in-case you do here’s our Beginners Guide to Digitable Collectables and NFTs',
  },
  {
    atLast: 'false',
    containsImage: 'false',
    title: ' Environmental NFTs',
    image: polygon,
    body: ' The art may be digital, but Earth isn’t. Built on the cutting edge Polygon Blockchain, Artefy is committed to environmentally friendly solutions that make collecting even better. NFTs on Artefy require less energy than powering your laptop by utilising the far-less intensive POS (Proof of Stake) system as opposed to the POW (Proof of Work) most other NFT platforms are using.',
  },
  {
    atLast: 'false',
    containsImage: 'fasle',
    title: 'Personalised Galleries',
    image: galleries,
    body: 'Art is made to be shown otﬀ and displayed not hidden inside an account. Curate your digital collectables in your very own virtual art gallery. Choose from our incredible diﬀerent themes, or create your own, add your collectables and special items to give it your own personal style. Then invite people to check it out, show oﬀ your collection to friends and other fans. Artefy will even reward you the more people who come to check it out!',
  },
  {
    atLast: 'false',
    containsImage: 'true',
    title: ' crates',
    image: crates,
    body: 'Open one up to Win! Building an NFT collection used to be costly and time consuming, not any more. Get an Artefy loot crate and unpack a random selection of rare and collectable items from all sorts of themes and genres. Diﬀerent crates hold diﬀering numbers of exclusive NFTs all of which can be added to your collection or sold to buy new crates and items.',
  },
  {
    atLast: 'false',
    containsImage: 'false',
    title: 'The wallet',
    image: logoLetter,
    body: 'The simple and secure way to store all your digital collectables, NFTs and Artefy Tokens. Access your collection – anywhere, anytime. ',
  },
  {
    containsImage: 'true',
    title: ' app',
    image: app,
    body: 'Access Artefy anywhere with the app. Get notiﬁed of drops, bid on new works, talk to other collectors and view your collection from your phone.',
  },
  {
    containsImage: 'true',
    title: ' network',
    image: logoLetter,
    body: 'Be part of something bigger by joining your community. Connect with other fans, collectors and the content creators themselves. Find out the stories behind your favourite pieces, share your passions, discuss the hidden meanings and ﬁnd out whats coming next.',
  },
  {
    containsImage: 'true',
    title: ' token',
    image: token,
    body: 'Use the Artefy Token to to buy and sell on the marketplace. Plus, discover ways that you can level up your collection and earn more tokens.',
  },
  {
    atLast: 'false',
    containsImage: 'false',
    title: 'The marketplace',
    image: logoLetter,
    body: 'Buy, sell and trade your digital collectables on the Artefy marketplace. Missed a drop? Want to complete a set or ﬁnd that exclusive piece? The Artefy marketplace is where you will ﬁnd it. Cash in or hold on, the choice is yours.',
  },
  {
    atLast: 'true',
    containsImage: 'false',
    title: 'The worlds of ',
    image: world,
    body: 'Digital collectables are as varied as the passions, lifestyles and hobbies from which they come. Find works, and communities that relate to you. From fantasy art to music to sport or gaming, wherever your passion lives, artefy has you covered.',
  },
];

const multiSectionDetails: dict[][] = [
  [
    {
      heading1: 'Our Worlds',
      heading2: 'Infinite Worlds:',
      para: 'All things Fantasy and Science Fiction including never seen before works and sketches.',
    },
  ],
  [
    {
      heading1: 'COMING SOON:',
    },
    {
      heading2: 'Classick Club:',
      para: 'Music from unreleased demos and unseen cover-art to digital replicas of iconic instruments and t-shirts',
    },
    {
      heading2: 'Stadium:',
      para: 'The world of Sports. Iconic clips, Player cards, replica jerseys & more',
    },
    {
      heading2: 'Visions:',
      para: 'Contemporary art and design. From legends such as Ed Hardy to creators designing speciﬁcally for the digital age',
    },
    {
      heading2: 'Master Works:',
      para: 'Exclusive collaborations with the most iconic galleries and private collections around the world.',
    },
  ],
];
const MobileDetails: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);

  // triggers inView if 25% in viewport

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  // Use to call "updateWidth" everytime width changes
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  });

  const useStyles = makeStyles((theme: any) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  const classes = useStyles();
  if (width > 600) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={classes.root}>
        <AnimatePresence>
          <SlideMotion direction="up">
            <Grid
              container
              className={styles.grid}
              direction="column"
              justify="center"
            >
              <Grid
                item
                style={{
                  background: 'linear-gradient(180deg, #222, #444)',
                }}
              >
                <Grid
                  container
                  className={styles.gridItem}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  alignContent="space-between"
                >
                  <Grid item>
                    <div className={styles.details_section}>
                      <Typography
                        variant="h2"
                        className={styles.header}
                        style={{ transform: 'translateX(50px)' }}
                      >
                        <img
                          src={logo}
                          alt=""
                          style={{
                            width: '100px',
                            transform: 'translateY(10px) scale(0.9)',
                          }}
                        />
                        Ecosystem
                      </Typography>
                      <img
                        src={metal}
                        alt=""
                        className={styles.card}
                        style={{
                          transform:
                            'translateY(30px) translateX(50px) scale(0.7)',
                        }}
                      />
                      <Typography
                        variant="body1"
                        className={styles.body}
                        style={{
                          transform: 'translateY(30px) translateX(50px)',
                        }}
                      >
                        Innovative and fully customisable virtual “spaces” that
                        add a deep layer of personalisation and creativity to
                        the collecting experience
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {details.map((item, idx) => {
                return (
                  <>
                    <Grid item key={idx}>
                      <Grid
                        className={styles.gridItem}
                        direction={idx % 2 === 0 ? 'row-reverse' : 'row'}
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item>
                          <Accordion
                            style={{
                              backgroundColor: 'transparent',
                              filter: 'none',
                              float: 'left',
                              width: '100vw',
                              margin: '-29px',
                            }}
                            elevation={0}
                          >
                            <AccordionSummary
                              expandIcon={
                                <img
                                  src={arrow}
                                  alt="arrow"
                                  style={{ transform: 'scale(0.25)' }}
                                />
                              }
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              style={{
                                flexDirection: 'row-reverse',
                                width: '100%',
                              }}
                            >
                              <Typography
                                variant="h2"
                                className={styles.header}
                                style={{ fontWeight: 'bolder' }}
                              >
                                <div className={styles.parent}>
                                  {item.containsImage === 'true' && (
                                    <img
                                      className={styles.image}
                                      src={logo}
                                      alt=""
                                      style={{
                                        width: '80px',
                                        transform:
                                          'scale(0.8) translateX(-25px)',
                                      }}
                                    />
                                  )}
                                  <div
                                    style={{
                                      transform: 'translateX(-20px)',
                                    }}
                                  >
                                    {item.title}
                                  </div>
                                  {item.atLast === 'true' && (
                                    <img
                                      src={logo}
                                      alt=""
                                      style={{
                                        width: '90px',
                                        marginTop: '5',
                                        transform:
                                          'scale(0.7) translateX(-35px)',
                                      }}
                                    />
                                  )}
                                </div>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ marginLeft: '15%' }}>
                              <div className={styles.accordionDetails}>
                                <img
                                  src={item.image}
                                  alt=""
                                  className={styles.card}
                                  style={{ transform: 'scale(0.8)' }}
                                />
                                <Typography
                                  variant="body1"
                                  className={styles.body}
                                  style={{
                                    transform: 'translateY(20px)',
                                  }}
                                >
                                  {item.body}
                                </Typography>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      </Grid>
                    </Grid>
                    <hr />
                  </>
                );
              })}
              <div className={styles.bottom}>
                <Typography variant="h4" align="center">
                  So much more to come
                </Typography>
                <Typography variant="body1">
                  Get ready for new ways to be rewarded, bigger
                  experiences,sports and even more of your favourite creators
                  (and their creations) are coming to
                  <b>artefy</b>
                </Typography>
              </div>
            </Grid>
          </SlideMotion>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileDetails;
