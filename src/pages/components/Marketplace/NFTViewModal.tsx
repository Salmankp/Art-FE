import React from 'react';
import { Modal } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ModalsStyles from '../styles/dashboard/Modals.module.scss';
import { PLAYER_MEDIA_URL } from '../../../utils/constants';
import CardStyles from '../styles/Marketplace/Card.module.scss';

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

export const NftIframe = ({ paintingId }: any) => {
  return (
    <iframe
      id="nf-view-frame"
      title={paintingId}
      className="nf-view-frame"
      height="100%"
      width="100%"
      frameBorder="0"
      src={`${PLAYER_MEDIA_URL}${paintingId}`}
    />
  );
};

const NFTViewModal: React.FC<{
  paintingId: string;
  isOpen: any;
  handleModal: any;
  paintingName: string;
  artistName: string;
}> = ({ paintingId, isOpen, handleModal, paintingName, artistName }) => {
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
        <p className={ModalsStyles.artist}>{paintingName}</p>
        <p className={ModalsStyles.artist}>{artistName}</p>
        <div className={ModalsStyles.nftViewWrap}>
          {paintingId && <NftIframe paintingId={paintingId} />}
        </div>
      </div>
    </Modal>
  );
};

export default NFTViewModal;
