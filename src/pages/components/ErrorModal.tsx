import React from 'react';
import { Modal, Typography, Box, Button } from '@material-ui/core';
import { SentimentVeryDissatisfied } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ErrorStateActions } from 'redux/slices/ErrorState';
import { cross } from '../../assets';
import styles from './styles/Auth/ErrorModal.module.scss';
import PopupGIF from '../../assets/images/Enable_popup.gif';
import { POPUP_BLOCKED_MESSAGE } from '../../utils/constants';

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

const ErrorModal: React.FC<any> = () => {
  const classes = useStyles();
  const showModal = useAppSelector((state) => state.ErrorState.showErrorModal);
  const errorMessage = useAppSelector((state) => state.ErrorState.errorMessage);
  const actionOnButtonClick = useAppSelector(
    (state) => state.SuccessState.actionOnButtonClick,
  );
  const isPopupError = errorMessage?.includes('popup') || false;
  const description = isPopupError ? POPUP_BLOCKED_MESSAGE : false;
  const dispatch = useAppDispatch();

  const onModalClose = () => {
    dispatch(ErrorStateActions.setErrorModal(false));
    dispatch(ErrorStateActions.setErrorMessage(''));
    actionOnButtonClick && actionOnButtonClick();
    dispatch(ErrorStateActions.setActionOnButtonClick(() => {}));
  };

  const onModalCloseCrossButton = () => {
    dispatch(ErrorStateActions.setErrorModal(false));
    dispatch(ErrorStateActions.setErrorMessage(''));
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
          width: isPopupError ? '50%' : undefined,
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
        <SentimentVeryDissatisfied className={styles.errorIcon} />
        <Typography className={styles.title} variant="h4">
          Error!
        </Typography>
        <Typography className={styles.errorMessage} variant="body1">
          {errorMessage}
        </Typography>
        {description && (
          <Typography className={styles.description} variant="body1">
            {description}
          </Typography>
        )}
        {isPopupError && <img src={PopupGIF} style={{ width: '100%' }} />}
        {!isPopupError && (
          <Button
            onClick={() => onModalClose()}
            style={{ marginTop: '1rem' }}
            className={styles.retryBtn}
          >
            Close
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default ErrorModal;
