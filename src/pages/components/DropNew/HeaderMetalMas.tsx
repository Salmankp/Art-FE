import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import styles from '../styles/DropNew/HeaderMetalMas.module.scss';
import {
  headerOverlay,
  heavyMetalMas,
  cherryImg,
  tarnaa,
} from '../../../assets';

type World = 'everscapes' | 'artefy' | 'classic-club';

interface dropCardProps {
  data: {
    world: World;
    dropName: string;
    description: string;
    subTitle: string;
    details: string[];
  };
}

const HeaderMetalMas = ({ data }: dropCardProps) => {
  const location = useLocation();

  return (
    <>
      <div
        className={styles.headerWrapMetalMas}
        style={{ backgroundImage: `url(${headerOverlay})` }}
      />
      <div className={styles.contentWrapMetalMas}>
        <div className={styles.contentwrap}>
          <div className={styles.contentleft}>
            <img src={heavyMetalMas} className={styles.metalLogo} />
            <div className={styles.lcontent}>{data.description}</div>
            <div
              style={{
                fontSize: '22px',
                lineHeight: '22px',
                fontWeight: 'bold',
                color: '#fff',
                paddingTop: '1rem',
              }}
            >
              Nothing says Christmas more than Taarna, demons and zombies!
            </div>
          </div>
          <div className={styles.dropContent}>
            <div className={styles.contentright}>
              <div className={styles.rtitle}>DROP DETAILS</div>
              <div className={styles.rcontent}>
                <ul>
                  {data.details.map((item, index) => {
                    return <li key={index.toString()}>{item}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.contentWrap2}>
          <div className={styles.contentleft}>
            <Typography variant="h4" className={styles.headingWrap}>
              COLLECTION REWARDS
            </Typography>
            <div className={styles.contentMain}>
              <Typography variant="h4" className={styles.contentHead}>
                Unlock the stories:
              </Typography>
              <Typography className={styles.contentPara}>
                Each NFT you buy, you’ll receive an exclusive link to read the
                first
                <br />
                chapters of the iconic stories the artwork appears in.
              </Typography>
            </div>
            <div className={styles.contentMain}>
              <Typography variant="h4" className={styles.contentHead}>
                Collect 6 or more:
              </Typography>
              <Typography className={styles.contentPara}>
                Have 6 of the 12 MetalMas collectables in your wallet on
                December 27 to
                <br />
                receive a 12 month digital subscription to Heavy Metal Magazine
                in 2022!
                <br />
                (Starts end of January 2022)
              </Typography>
            </div>
          </div>
          <div className={styles.contentright}>
            <img src={cherryImg} className={styles.cherryImg} />
            <div className={styles.collectNftBox}>
              <Typography className={styles.cherryBox}>
                Collect all
                <br />
                12 NFTs
              </Typography>
              <Typography className={styles.cherryBoxDesc}>
                Have all 12 MetalMas
                <br />
                collectables in your wallet
                <br />
                on December 27 to win
                <br />
                this exclusive
                <br />
                Taarna vs Godzilla Edition!
              </Typography>
            </div>
            <img src={tarnaa} className={styles.tarnaaImg} />
            <div className={styles.tarnaText}>WIN TAARNA</div>
          </div>
        </div>
        <p className={styles.endText}>
          THE 12 NFTS OF HEAVY METALMAS.
          <br />
          DISCOVER ONE PIECE A DAY.
        </p>
      </div>
    </>
  );
};

export default HeaderMetalMas;
