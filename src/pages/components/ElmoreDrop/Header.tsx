import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import styles from '../styles/ElmoreDrop/Header.module.scss';
import {
  elmoreImage,
  elmorebg,
  firstdrop,
  elmoreLogo,
  kendalImage,
  kendalLogo,
  kendalBg,
  infoImg,
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

const ElmoreHeader: React.FC<{
  coloredTile: string;
  Desc: string;
  elmoreImageMain: string[];
}> = ({ coloredTile, Desc, elmoreImageMain }) => {
  return (
    <>
      <Container className={styles.contentWrap}>
        <Box className={styles.contentwrap}>
          <Box className={styles.contentleft}>
            <Typography className={styles.ltitle}>{coloredTile}</Typography>
            <Typography className={styles.lcontent}>{Desc}</Typography>
          </Box>
          <Box className={styles.elmoreImageWrapper}>
            {elmoreImageMain.map((item, index) => (
              <img
                src={item}
                alt="img"
                key={index}
                className={styles.elmoreimg}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

const Header = ({ data }: dropCardProps) => {
  const isKendall = location.pathname === '/drop/gideon-kendall';
  return (
    <>
      <Box
        className={styles.headerWrap}
        style={{ backgroundImage: `url(${isKendall ? kendalBg : elmorebg})` }}
      >
        <Box className={styles.logosWrapper}>
          <img src={firstdrop} />

          <img src={isKendall ? kendalLogo : elmoreLogo} />
          <div className={styles.contentright}>
            <div className={styles.rtitle}>
              <p style={{ display: 'contents' }}>
                DROP DETAILS
                <img src={infoImg} alt="info-img" />
              </p>
            </div>
            <div className={styles.rcontent}>
              <ul>
                {data.details.map((item, index) => {
                  return <li key={index.toString()}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </Box>
      </Box>
      <ElmoreHeader
        elmoreImageMain={[isKendall ? kendalImage : elmoreImage]}
        coloredTile={data?.subTitle}
        Desc={data?.description}
      />
    </>
  );
};

export default Header;
