import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/ElmoreDrop/HeaderInfinite.module.scss';
import {
  infiniteLogo,
  infiniteBg,
  theheavymetalbg,
  heavymetalLogo,
  exploreFantasyBg,
  exploreFantasyLogo,
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

const HeaderInfinite = ({ data }: dropCardProps) => {
  const location = useLocation();

  const isTheHeavyMetal = location.pathname === '/drop/the-heavy-metal';
  const isExploringFantasy = location.pathname === '/drop/exploring-fantasy';

  return (
    <>
      <div
        className={styles.headerWrap}
        style={{
          backgroundImage: `url(${
            isExploringFantasy
              ? exploreFantasyBg
              : isTheHeavyMetal
              ? theheavymetalbg
              : infiniteBg
          })`,
        }}
      >
        <img
          src={
            isExploringFantasy
              ? exploreFantasyLogo
              : isTheHeavyMetal
              ? heavymetalLogo
              : infiniteLogo
          }
          style={{ marginBottom: '2rem' }}
          className={styles.logoImage}
        />
      </div>
      <div className={styles.contentWrap}>
        <div className={styles.contentwrap}>
          <div className={styles.contentleft}>
            <div className={styles.ltitle}>{data.subTitle}</div>
            <div className={styles.lcontent}>{data.description}</div>
          </div>
          <div className={styles.divider} />
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
    </>
  );
};

export default HeaderInfinite;
