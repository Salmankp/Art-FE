import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import Classes from '../styles/MedallionDrop/WinnerNFTInfo.module.scss';

const WinnerNFTInfo = ({
  winnerNftName,
  walletAddress,
  winnerNftImage,
  nftTopItems,
}) => {
  return (
    <Box>
      <Grid
        container
        className={`${Classes.nftWinnerInfoWrapper} ${
          nftTopItems ? Classes.nftTopItems : ''
        }`}
      >
        <Grid item md={5} component="div" style={{ textAlign: 'center' }}>
          <img
            src={winnerNftImage}
            alt="img"
            className={Classes.winnerNftImg}
          />
        </Grid>
        <Grid md={7} component="div">
          <Typography component="h3" className={`${Classes.winnerNftName} `}>
            {winnerNftName}
          </Typography>
          <Typography component="h3" className={`${Classes.walletName} `}>
            {walletAddress?.length > 1 ? 'Wallet #' : 'WALLET'}
          </Typography>
          <Typography component="p" className={Classes.walletAddress}>
            <ul className={Classes.walletAddressList}>
              {walletAddress.map((wallet, index) => (
                <li key={index}>{wallet}</li>
              ))}
            </ul>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WinnerNFTInfo;
