import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/DropNew/Header.module.scss';
import {
  dropnewbg,
  newdroplogo,
  cornerImage,
  frazettalogo,
  vicelogo,
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
const info = {
  title: 'What’s a crypto wallet?',
  description:
    'A crypto-wallet is a place where you can safely store all your crypto currencies and digital collectables. There is no charge.',
};

const Header = ({ data }: dropCardProps) => {
  const location = useLocation();
  const isSilverWarriorMedalloion =
    location.pathname === '/drop/silver-warrior-medallion';
  const isCornerArt = location.pathname === '/drop/corner-4-art';

  return (
    <>
      <div
        className={styles.headerWrap}
        style={{ backgroundImage: `url(${dropnewbg})` }}
      />
      <div className={isCornerArt ? styles.contentWrap2 : styles.contentWrap}>
        <div className={styles.logoheadingwrap}>
          <div className={styles.logo}>
            <img src={newdroplogo} alt="logo" />
          </div>
          {isSilverWarriorMedalloion && <img src={vicelogo} alt="v-logo" />}
          <div className={styles.flexWrap}>
            {isCornerArt && (
              <div>
                <img src={cornerImage} className={styles.cornerImage} />
              </div>
            )}

            <div className={styles.heading}>
              {!isCornerArt ? data.dropName.toLowerCase() : 'DROP'}
            </div>
          </div>
        </div>
        <div className={styles.contentwrap}>
          <div className={styles.contentleft}>
            <div className={styles.ltitle}>{data.subTitle}</div>
            <div className={styles.lcontent}>{data.description}</div>
          </div>
          <div className={styles.dropContent}>
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
          {isSilverWarriorMedalloion && (
            <div className={styles.logoWrapper}>
              <img src={frazettalogo} className={styles.frazettaLogo} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
