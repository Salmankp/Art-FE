import React from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorStateActions } from 'redux/slices/ErrorState';
import { useAppDispatch } from 'redux/hooks';
import { Box, Button } from '@material-ui/core';
import classes from '../styles/Login/Form.module.scss';
import {
  mailicon,
  discordicn,
  metaLogin,
  venlyLogin,
  telegramIcon,
} from '../../../assets';
import { loginWithArakane, loginWithMetaMask } from '../../../utils/helpers';

const Login: React.FC<{
  handleCreateAccount: () => void;
}> = ({ handleCreateAccount }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const loginWithArkane = async () => {
    try {
      await loginWithArakane();
    } catch (e: any) {
      dispatch(ErrorStateActions.setErrorMessage(e?.message || e?.status || e));
      dispatch(ErrorStateActions.setErrorModal(true));
    }
  };

  const loginWithMeta = async () => {
    try {
      await loginWithMetaMask();
    } catch (e: any) {
      dispatch(ErrorStateActions.setErrorMessage(e?.message || e?.status || e));
      dispatch(ErrorStateActions.setErrorModal(true));
    }
  };

  return (
    <>
      <div className={`${classes.newlogin} ${classes.form}`}>
        <div className={classes.heading}>
          Log in with your Venly or MetaMask Wallet
        </div>
        <div className={classes.imggwrap}>
          <span onClick={loginWithArkane}>
            <img src={venlyLogin} alt="logo" style={{ cursor: 'pointer' }} />
          </span>
          <span onClick={loginWithMeta}>
            {' '}
            <img src={metaLogin} alt="logo" style={{ cursor: 'pointer' }} />
          </span>
        </div>
        <Box className={classes.tabSwitchBtnWrap} textAlign="center">
          <Button
            className={classes.tabSwitchBtn}
            onClick={handleCreateAccount}
          >
            Create new account
          </Button>
        </Box>
        <div className={classes.contactwrap}>
          <div className={classes.txtt}>
            For support or questions contact us here:
          </div>
          <div className={classes.discord}>
            <img
              src={discordicn}
              alt="logo"
              onClick={() =>
                window.open('https://discord.com/invite/WvsK5nwAxV', '_blank')
              }
            />
            <span>Discord</span>
          </div>
          <div className={classes.mail}>
            <img
              src={mailicon}
              alt="logo"
              onClick={() => history.push('/contactus')}
            />
            <span>Email</span>
          </div>
          <div className={classes.telegram}>
            <img
              src={telegramIcon}
              alt="logo"
              onClick={() => history.push('/contactus')}
            />
            <span>Telegram</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
