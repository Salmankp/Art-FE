import React from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import styles from '../styles/RiseCrate/Piece.module.scss';

const Piece: React.FC = () => {
  return (
    <div className={styles.pieceMain}>
      <Container>
        <Box className={styles.piecetext}>
          <Typography className={styles.textInner}>
            <span>50 MIND BLOWING NFT COLLECTABLES</span>
            <br />
            8 RANDOM NFTs PER CRATE
            <br />
            <span>ONLY 2000 CRATES AVAILABLE</span>
            <br />
            <span style={{ color: '#e59400' }}>
              GET REWARDED FOR COMPLETING COLLECTIONS
            </span>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};
export default Piece;
