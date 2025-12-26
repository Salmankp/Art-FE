import React from 'react';
import { Modal } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ModalsStyles from '../styles/dashboard/Modals.module.scss';
import { PLAYER_MEDIA_URL } from '../../../utils/constants';

const useStyles = makeStyles((theme) => ({
  paper: {
    background: 'linear-gradient(180deg, #363636 0%, #666666 100%)',
    backgroundColor: '#111111',
    borderRadius: 20,
    border: '0px solid white',
    boxShadow: theme.shadows[5],

    boxSizing: 'border-box',
    height: '100%',

    position: 'relative',
    [theme.breakpoints.down(`sm`)]: {
      top: '65%',
      width: '85%',
    },
  },
}));

export const NftIframe = ({ videoId }: any) => {
  return (
    <iframe
      id="nf-view-frame"
      title={videoId}
      className="nf-view-frame"
      height="100%"
      width="100%"
      frameBorder="0"
      src={`${PLAYER_MEDIA_URL}${videoId}`}
    />
  );
};

const NFTViewModal: React.FC<{
  videoId: string;
  isOpen: any;
  handleModal: any;
}> = ({ videoId, isOpen, handleModal }) => {
  const classes = useStyles();
  return (
    <Modal
      max-width="lg"
      className={ModalsStyles.ModalWrapper}
      open={isOpen}
      onClose={() => handleModal(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={{}} className={classes.paper}>
        <div
          className={ModalsStyles.nftViewCrossCircle}
          onClick={() => handleModal(false)}
        >
          <Close style={{ color: 'white', fontSize: 20 }} />
        </div>
        <div className={ModalsStyles.nftViewWrap}>
          <NftIframe videoId={videoId} />
        </div>
      </div>
    </Modal>
  );
};

export default NFTViewModal;
