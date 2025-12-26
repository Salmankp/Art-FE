import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import styles from '../styles/RemasteredDrop/Header.module.scss';
import { dropnewbg, newdroplogo, remasteredText } from '../../../assets';

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

const RemasteredHeader: React.FC<{
  coloredTile: string;
  Desc: string;
}> = ({ coloredTile, Desc }) => {
  return (
    <>
      <Container style={{ maxWidth: '1120px' }} className={styles.contentWrap}>
        <Box className={styles.contentwrap}>
          <Box className={styles.innerText}>
            <Typography className={styles.title}>{coloredTile}</Typography>
            <Typography className={styles.description}>{Desc} </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

const Header = ({ data }: dropCardProps) => {
  return (
    <>
      <Box
        className={styles.headerWrap}
        style={{ backgroundImage: `url(${dropnewbg})` }}
      >
        <Typography component="div" className={styles.logoImg}>
          <img src={remasteredText} alt="remasteredText" />
        </Typography>
      </Box>
      <Typography component="div" className={styles.border} />
      <RemasteredHeader coloredTile={data?.subTitle} Desc={data?.description} />
    </>
  );
};

export default Header;
