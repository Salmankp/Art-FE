import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import { Box, Typography } from '@material-ui/core';
import styles from '../styles/Login/walletPopup.module.scss';
import { cross } from '../../../assets';

interface dropCardProps {
  popupData: {
    popup: boolean;
    setPopup: Function;
  };
}

const WalletPopup = ({ popupData }: dropCardProps) => {
  const history = useHistory();
  return (
    <>
      <Modal
        max-width="sm"
        style={{ alignItems: 'center', justifyContent: 'center' }}
        open={popupData.popup}
        onClose={() => {
          popupData.setPopup(false);
        }}
        className={styles.modal}
      >
        <Box className={styles.popupwrap} style={{ padding: '0' }}>
          <div
            className={styles.cross}
            onClick={() => popupData.setPopup(false)}
          >
            <img src={cross} alt="cross" />
          </div>
          <Box className={styles.boxWrapper}>
            <Typography variant="h3" className={styles.headingWrap}>
              Digital Wallets
            </Typography>
            <Typography variant="subtitle1" className={styles.paraWrapper}>
              A digital wallet is where you store all of the digital
              collectables or NFTs that you buy and collect from drops or the
              marketplace. Your digital wallet will store and approve all of
              your transactions as well as keeping your collection secure.
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default WalletPopup;
