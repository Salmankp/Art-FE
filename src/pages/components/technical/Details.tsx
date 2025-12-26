import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { AnimatePresence } from 'framer-motion';

import {
  vulcan,
  polygon,
  logoLetter,
  metal,
  galleries,
  crates,
  token,
  app,
  world,
} from '../../../assets';

import logo from '../../../assets/images/logo.png';
import SlideMotion from '../animations/SlideMotion';

import styles from '../styles/technical/Details.module.scss';

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
    body: 'Art is made to be shown off and displayed not hidden inside an account. Curate your digital collectables in your very own virtual art gallery. Choose from our incredible diﬀerent themes, or create your own, add your collectables and special items to give it your own personal style. Then invite people to check it out, show oﬀ your collection to friends and other fans. Artefy will even reward you the more people who come to check it out!',
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
    atLast: 'false',
    containsImage: 'true',
    title: ' app',
    image: app,
    body: 'Access Artefy anywhere with the app. Get notiﬁed of drops, bid on new works, talk to other collectors and view your collection from your phone.',
  },
  {
    atLast: 'false',
    containsImage: 'true',
    title: ' network',
    image: logoLetter,
    body: 'Be part of something bigger by joining your community. Connect with other fans, collectors and the content creators themselves. Find out the stories behind your favourite pieces, share your passions, discuss the hidden meanings and ﬁnd out whats coming next.',
  },
  {
    atLast: 'false',
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
  {
    atLast: 'false',
    containsImage: 'true',
    title: ' Collectverse',
    image: logoLetter,
    body: '3D, VR and Mixed Reality integrations, will allow collectors to take their Artefy NFT collectables into fully immersive and personalised spaces that they own and develop over time. This combination will allow people to explore creative content in brand new ways. From digital art, music and audio-visual experiences to interactive virtual storytelling, gamiﬁcation, unique digital collectables and to things not yet even dreamt of.',
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

const Details: React.FC = () => {
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

  if (width <= 600) {
    return null;
  }

  return (
    <div className={styles.root}>
      <AnimatePresence>
        <SlideMotion direction="up">
          <Grid
            container
            className={styles.grid}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              style={{
                background: 'linear-gradient(180deg, #222, #444)',
                width: '100vw',
              }}
            >
              <Grid
                container
                className={styles.gridItem}
                direction="row"
                justify="center"
                alignItems="center"
                style={{ marginTop: '80px', marginBottom: '120px' }}
              >
                <img
                  src={metal}
                  alt=""
                  className={styles.card}
                  style={{ marginLeft: '150px' }}
                />
                <Grid item>
                  <div className={styles.details_section}>
                    <Typography variant="h2" className={styles.ecosystem}>
                      <img
                        src={logo}
                        alt=""
                        style={{
                          width: '120px',
                          transform:
                            'translateY(7px) translateX(-12px) scale(1.1)',
                        }}
                      />
                      Ecosystem
                    </Typography>
                    <Typography variant="body1" className={styles.body}>
                      We’re bringing the creators and brands you love to the
                      digital world. Blending world leading technology with
                      fan-ﬁrst designs to create meaningful connections and
                      experiences unlike any other digital platform.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {details.map((item, idx) => {
              return (
                <>
                  <Grid
                    item
                    key={idx}
                    style={{
                      backgroundColor: 'linear-gradient(0deg, #111, #333)',
                      paddingBottom: '-120px',
                    }}
                  >
                    <Grid
                      container
                      className={styles.gridItem}
                      direction={idx % 2 === 0 ? 'row-reverse' : 'row'}
                      justify="center"
                      alignItems="center"
                    >
                      {idx === 6 || idx === 10 ? (
                        <img
                          src={item.image as string}
                          alt=""
                          className={styles.card}
                          style={{ transform: 'scale(1.6) translateX(30px)' }}
                        />
                      ) : (
                        <img
                          src={item.image as string}
                          alt=""
                          className={styles.card}
                        />
                      )}

                      <Grid item>
                        <div className={styles.details}>
                          <Typography variant="h2" className={styles.header}>
                            <div className={styles.center}>
                              {item.containsImage === 'true' && (
                                <img
                                  src={logo}
                                  alt=""
                                  style={{
                                    width: '110px',
                                    height: '45px',
                                    transform: 'translateY(7px) scale(1.1)',
                                  }}
                                />
                              )}
                              {item.title}
                              {item.atLast === 'true' && (
                                <img
                                  src={logo}
                                  alt=""
                                  style={{ width: '120px', marginTop: '5' }}
                                />
                              )}
                            </div>
                          </Typography>
                          {idx === 10 ? (
                            <>
                              <Typography
                                variant="body1"
                                className={styles.body}
                              >
                                {item.body}
                              </Typography>
                              <Typography>
                                {multiSectionDetails.map((data) => {
                                  return data.map((innerData) => {
                                    return (
                                      <>
                                        <Typography
                                          variant="h6"
                                          className={styles.heading1}
                                        >
                                          {innerData.heading1}
                                        </Typography>
                                        <Typography
                                          variant="h6"
                                          className={styles.color}
                                        >
                                          {innerData.heading2}
                                        </Typography>
                                        <Typography
                                          variant="body1"
                                          className={styles.para}
                                        >
                                          {innerData.para}
                                        </Typography>
                                      </>
                                    );
                                  });
                                })}
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="body1" className={styles.body}>
                              {item.body}
                            </Typography>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              );
            })}
            <div className={styles.bottom}>
              <Typography
                variant="h3"
                align="center"
                className={styles.bottom_text}
              >
                So much more to come
              </Typography>
              <Typography variant="body1" className={styles.body1}>
                Get ready for new ways to be rewarded, bigger experiences,sports
                and even more of your favourite creators (and their creations)
                are coming to
                <b>artefy</b>
              </Typography>
            </div>
          </Grid>
        </SlideMotion>
      </AnimatePresence>
    </div>
  );
};
export default Details;
