import React from 'react';
import Modal from '@material-ui/core/Modal';
// import styles from '../styles/DropNew/Popup.module.scss';
import { Box, Typography } from '@material-ui/core';
import stylesReward from '../styles/RemasteredDrop/PlatinumModal.module.scss';
import { crossremaster } from '../../../assets';

interface dropCardProps {
  popupData: {
    preview3D: string;
    artistName: string;
    name: string;
    aboutArtWork: string;
    popup: boolean;
    setPopup: Function;
  };
}

const PlatinumModal = ({ popupData }: dropCardProps) => {
  return (
    <>
      <Modal
        max-width="sm"
        open={popupData.popup}
        onClose={() => {
          popupData.setPopup(false);
        }}
        className={stylesReward.modal}
      >
        <Box className={stylesReward.popupwrap} style={{ padding: '0' }}>
          {/* ----- Popup closer starts */}
          <div
            className={stylesReward.cross}
            onClick={() => popupData.setPopup(false)}
          >
            <img
              style={{ borderRadius: '50%' }}
              src={crossremaster}
              alt="cross"
            />
          </div>
          {/* ----- Popup closer ends */}
          <Box className={stylesReward.flexWrap}>
            <div
              className={stylesReward.remasterImg}
              style={{
                flex: '0 0 50%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <img
                src={popupData?.preview3D}
                className={stylesReward.remasterModal}
                style={{ width: '265px' }}
              />
            </div>
            <div
              className={stylesReward.remasterTextWrap}
              style={{ color: '#fff', flex: '0 0 50%' }}
            >
              <div className={stylesReward.artistName}>
                {popupData?.artistName}
              </div>
              <div className={stylesReward.artworkName}>{popupData?.name}</div>
              <div className={stylesReward.edition}>PLATINUM EDITION</div>
              <Typography className={stylesReward.remasterText}>
                {popupData?.aboutArtWork}
              </Typography>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PlatinumModal;
