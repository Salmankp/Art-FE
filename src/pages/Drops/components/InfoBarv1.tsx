import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import styles from '../styles/infoBar.module.scss';
import { rewardValentine, collectValentine } from '../../../assets';

const RewardCard: React.FC<{
  coloredTitle: string;
  Desc: object;
  Image: string[];
}> = ({ coloredTitle, Desc, Image }) => {
  return (
    <>
      <Container className={styles.cardWrapper}>
        <Box className={styles.rewardWrap}>
          <Box className={styles.textWrap}>
            <Typography className={styles.coloredText}>
              {coloredTitle}
            </Typography>
            <Typography className={styles.descText}>{Desc}</Typography>
          </Box>
          <Box className={styles.imageWrap}>
            {Image.map((item, index) => (
              <img
                src={item}
                alt="img"
                key={index}
                className={styles.imgWrap}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

const InfoBar = () => {
  return (
    <div className={styles.bgWrap}>
      <Box className={styles.headWrap}>COLLECT AND EARN REWARDS </Box>
      <Container className={styles.mainContainer}>
        <RewardCard
          coloredTitle="Reward for any purchase:"
          Desc={
            <p>
              Receive a digital signed edition of the Valentine Comic by both
              authors and go into the draw for your chance to win 1 of 5 places
              in a private Zoom session with DAVID ARQUETTE and CLIFF DORFMAN.
            </p>
          }
          Image={[rewardValentine]}
        />
        <RewardCard
          coloredTitle="Collect all 5:"
          Desc={
            <p>
              Receive this exclusive bonus Valentine NFT:
              <br />
              <br />
              "SHOT THROUGH THE HEART"
            </p>
          }
          Image={[collectValentine]}
        />
      </Container>
      <Container className={styles.davidContainer}>
        <Box className={styles.nftText}>
          First to collect &nbsp;
          <span style={{ color: '#ED1C24' }}>all 5 NFTs</span>
          &nbsp; wins a personal video recording
          <br />
          <span className={styles.bigText}>
            from&nbsp;
            <span style={{ color: '#ED1C24' }}>DAVID ARQUETTE</span>
            &nbsp;&&nbsp;
            <span style={{ color: '#ED1C24' }}>CLIFF DORFMAN</span>
          </span>
        </Box>
      </Container>
    </div>
  );
};

export default InfoBar;
