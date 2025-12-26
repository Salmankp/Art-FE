import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
// import styles from '../styles/DropNew/Popup.module.scss';
import { Box, Divider } from '@material-ui/core';
import stylesReward from '../styles/CrateCollection/RewardPopup.module.scss';
import {
  closebutton,
  reward2,
  zombie,
  hellscape,
  firstPage,
  reward3revise,
} from '../../../assets';

interface dropCardProps {
  popupData: {
    popup: boolean;
    setPopup: Function;
  };
}

const RewardPopup = ({ popupData }: dropCardProps) => {
  const history = useHistory();
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
            <img src={closebutton} alt="cross" />
          </div>
          {/* ----- Popup closer ends */}

          <Box
            className={stylesReward.rewardMain}
            style={{ backgroundColor: '#000' }}
          >
            <img
              src={firstPage}
              alt="modalImg"
              className={stylesReward.modal1Img}
            />
          </Box>
          <Box className={stylesReward.rewardSecond}>
            <ul>
              <li>
                1 original full colour RISE Art piece by RISE artist Diego.
                Signed by both the artist and creator George Romero.
              </li>
              <li>An artist remarked issue 1 of RISE.</li>
              <li>A 1 of 1 RISE NFT</li>
            </ul>
            <img src={reward2} alt="reward2" className={stylesReward.reward2} />
            <Divider className={stylesReward.divider} variant="middle" />
            <img
              src={hellscape}
              alt="reward2"
              className={stylesReward.uniquetext}
            />
            <img src={zombie} alt="reward2" className={stylesReward.reward2} />
            <Divider className={stylesReward.divider} variant="middle" />
          </Box>
          <Box className={stylesReward.rewardThird}>
            <img src={reward3revise} alt="" className={stylesReward.reward3} />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RewardPopup;
