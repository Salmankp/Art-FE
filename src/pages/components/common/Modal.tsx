import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { connect, error } from '../../../assets';
import styles from '../styles/common/Modal.module.scss';

interface modalProps {
  connection: boolean;
  isOpen: boolean;
  onClose: () => void;
  statusCode: number;
}

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      background: 'linear-gradient(180deg, #363636 0%, #111111 100%)',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxHeight: '620px',
      maxWidth: '576px',
      borderRadius: '20px',
      outline: '0',
    },
  }),
);

const SimpleModal = ({
  connection,
  isOpen,
  onClose,
  statusCode,
}: modalProps): JSX.Element => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={styles.wrapper}>
        <img src={connection ? connect : error} alt="icon" />
        <div className={styles.heading}>
          {' '}
          {connection ? `No Connection!` : `Oops. Error ${statusCode}`}
        </div>
        <div className={styles.text}>
          {connection
            ? `Poor network connection detected.
						Please check your connectivity.`
            : `Operation could not be completed (WD GeneralErrorNetwork${statusCode}`}
        </div>
        <button onClick={onClose}>Retry</button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default SimpleModal;
