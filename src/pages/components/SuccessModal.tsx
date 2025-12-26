import React from 'react';
import { Modal, Typography, Box, Button } from '@material-ui/core';
import { SentimentVerySatisfied } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { SuccessStateActions } from 'redux/slices/SuccessState';
import { cross } from '../../assets';
import styles from './styles/Auth/ErrorModal.module.scss';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '400px',
    background: 'linear-gradient(180deg, #111111 0%, #363636 100%)',
    backgroundColor: '#111111',
    borderRadius: 10,
    border: '0px solid white',
    boxShadow: 'none',
    padding: '3rem 2rem',
    [theme.breakpoints.down(`sm`)]: {
      top: '65%',
      width: '85%',
    },
    '&:focus-visible': {
      border: 'none',
      outline: 'none',
    },
  },
}));

const SuccessModal: React.FC<any> = () => {
  const classes = useStyles();
  const showModal = useAppSelector(
    (state) => state.SuccessState.showSuccessModal,
  );
  const actionOnButtonClick = useAppSelector(
    (state) => state.SuccessState.actionOnButtonClick,
  );
  const successMessage = useAppSelector((state) => state.SuccessState.message);

  const dispatch = useAppDispatch();

  const onModalClose = () => {
    dispatch(SuccessStateActions.setSuccessModal(false));
    dispatch(SuccessStateActions.setSuccessMessage(''));
    actionOnButtonClick && actionOnButtonClick();
    dispatch(SuccessStateActions.setActionOnButtonClick(() => {}));
  };

  const onModalCloseCrossButton = () => {
    dispatch(SuccessStateActions.setSuccessModal(false));
    dispatch(SuccessStateActions.setSuccessMessage(''));
  };

  return (
    <Modal
      open={showModal}
      onClose={() => onModalClose()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        className={`${classes.paper} ${styles.modal}`}
        textAlign="center"
      >
        <div className={styles.cross} onClick={onModalCloseCrossButton}>
          <img src={cross} alt="cross" />
        </div>
        <SentimentVerySatisfied className={styles.errorIcon} />
        <Typography className={styles.title} variant="h4">
          Congratulations!
        </Typography>
        <Typography className={styles.errorMessage} variant="body1">
          {successMessage}
        </Typography>
        <Button
          onClick={() => onModalClose()}
          style={{ marginTop: '1rem' }}
          className={styles.retryBtn}
        >
          Continue
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
