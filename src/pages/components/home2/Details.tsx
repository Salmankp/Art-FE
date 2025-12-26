import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { AnimatePresence } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import {
  discordhome,
  curatecollection,
  new1,
  logoNew,
  comingsoon,
  personaliseGallery,
  environmental,
} from '../../../assets';
import VideoSlider from './VideoSlider';
import styles from '../styles/home2/Details.module.scss';

const details: { [key: string]: string }[] = [
  {
    title: 'New To NFTs?',
    image: new1,
    description:
      "New to the world of digital collectables? We're creating an easy-to-use experience that anyone can enjoy. You don't need to own cryptocurrency or even know what an NFT is to get involved with Artefy, however, just in-case you want to learn more, here's our FAQs",
    buttonText: 'FAQs',
    to: '/faq',
  },
  {
    title: 'Environmental NFTs',
    image: environmental,
    description:
      "Owning art shouldn't cost the Earth. Built on the cutting edge Polygon blockchain, Artefy is committed to environmentally friendly solutions that make collecting even better. NFTs on Artefy require less energy than powering your laptop by utilising the far-less intensive POS (Proof of Stake) system as opposed to the POW (Proof of Work) most other NFT platforms are using. ",
    buttonText: 'Learn More',
    bgColor: 'green',
    to: '/greennft',
  },
  {
    title: 'Curate collections & earn rewards',
    image: curatecollection,
    description:
      "Complete themed collections for unique platform rewards and obtain exclusive NFTs. The more that you explore on the platform, from Galleries to the Marketplace, you'll be able to unlock more features for a more immersive experience. Collect your way, it's up to you!",
    buttonText: 'none',
    to: '',
  },
  {
    title: 'Personalised Galleries',
    image: personaliseGallery,
    description:
      'Art is made to be shown off and displayed not hidden inside an account. Curate your digital collectables in your own virtual art gallery. Choose from incredible different themes, or create your own layouts. Add your collectables and special items to give it your own personal style. Show off your collection to friends, invite other fans to check it out. Artefy will reward you the more people who come to see what you have curated.',
    buttonText: 'View Galleries',
    to: '/master-galleries',
  },
  {
    title: 'Join the Discord',
    image: discordhome,
    description:
      'Be the first to know about new releases.Join the community on Discord',
    buttonText: 'Join Discord',
    to: 'https://discord.com/invite/WvsK5nwAxV',
  },
];

const Details: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const history = useHistory();

  // triggers inView if 25% in viewport

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  // Use to call "updateWidth" everytime width changes
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  });

  if (width <= 1100) {
    return null;
  }
  return (
    <div className={styles.root}>
      <AnimatePresence>
        <div key="first" className={styles.first}>
          <div className={styles.matter}>
            <h2 className={styles.txt}>Digital collectables</h2>
            <h2 className={styles.blutxt}> done differently</h2>
            <p>• Discover art and collectables you’ll love</p>
            <p>• Easy to buy and own</p>
            <p>• Exclusive NFT drops</p>
            <p>• Customisable virtual galleries </p>
            <p>• Curate collections and earn rewards</p>
            <p>• Connect with other fans and artists</p>
            <p>• Enviromentally friendly NFTs</p>
            <div className={styles.matter_text}>
              We’re blending cutting edge technology with the worlds most
              creative artists, to build a whole new world of digital
              collectables. Discover art you'll love, build your collection,
              then curate your own custom gallery and share it with the world.
              Connect, not just with other collectors, but with the artists and
              creators themselves and create unique experiences around your
              passions.
              <h3> We're redefining what an NFT can be</h3>
            </div>
          </div>
          <div className={styles.image}>
            <div style={{ width: '514px', height: '900px' }}>
              <VideoSlider />
            </div>
          </div>
        </div>
        <div key="second" className={styles.second}>
          <Grid style={{ marginTop: '70px', marginBottom: '70px' }}>
            {details.map((item, idx) => {
              return (
                <Grid
                  container
                  key={idx.toString()}
                  item
                  className={styles.gridItem}
                  sm={12}
                  direction={idx % 2 === 0 ? 'row' : 'row-reverse'}
                >
                  <div className="grid_img">
                    <div className={styles.image}>
                      <img
                        src={item.image}
                        alt="Grid"
                        style={{ borderRadius: '15px' }}
                      />
                    </div>
                    {item.isComing === 'true' && (
                      <div className={styles.topImage}>
                        <img src={comingsoon} alt="comingsoon" />
                      </div>
                    )}
                  </div>

                  <div className={styles.grid_description}>
                    <div className={styles.gridTitle}>
                      <div className={styles.center}>
                        {item.atFirst === 'true' && (
                          <img
                            src={logoNew}
                            alt="logo"
                            height="57px"
                            width="144px"
                          />
                        )}
                        {item.title}
                      </div>
                    </div>
                    <div className={styles.description}>{item.description}</div>
                    {item.buttonText !== 'none' && (
                      <div
                        className={
                          item.bgColor === 'green'
                            ? styles.greenbtnContainer
                            : styles.btnContainer
                        }
                      >
                        <button
                          className={styles.button}
                          onClick={() => {
                            item.buttonText === 'Join Discord'
                              ? window.open(
                                  'https://discord.com/invite/WvsK5nwAxV',
                                )
                              : history.push(`${item.to}`, '_blank');

                            item.buttonText !== 'Coming Soon' &&
                              window.scrollTo({
                                top: 0,
                                left: 0,
                              });
                          }}
                        >
                          {item.buttonText}
                        </button>
                      </div>
                    )}
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Details;
