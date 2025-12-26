import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { Box, Button } from '@material-ui/core';
import { ErrorStateActions } from 'redux/slices/ErrorState';
import classes from '../styles/Login/Form.module.scss';

import {
  mailicon,
  discordicn,
  telegramIcon,
  fblogo,
  twitterlogo,
  venlylogo,
  metaLogin,
  venlyLogin,
} from '../../../assets';
import {
  registerArakane,
  registerFacebook,
  registerGoogle,
  registerTwitter,
  signUpWithMetaMask,
} from '../../../utils/helpers';
import { SupportedWallets } from '../../Auth';
import { checkMetaMask } from '../../../utils/validate';
import WalletPopup from './WalletPopup';

export default function RegistrationForm({
  setRegStepTwo,
  setProfile,
  setWalletType,
  handleLoginAccount,
}) {
  const history = useHistory();

  const dispatch = useAppDispatch();
  const [popup, setPopup] = useState<boolean>(false);
  const metaMaskLogin = async () => {
    try {
      if (!SupportedWallets.METAMASK) return;
      setWalletType(SupportedWallets.METAMASK);
      const data: any = await signUpWithMetaMask();
      if (!data) return false;
      if (!checkMetaMask(data.accounts[0])) return;
      setProfile(data);
      if (data) setRegStepTwo(true);
    } catch (e: any) {
      dispatch(ErrorStateActions.setErrorMessage(e?.message || e?.status || e));
      dispatch(ErrorStateActions.setErrorModal(true));
    }
  };

  const register = async (registerWith: any) => {
    try {
      if (!SupportedWallets.VENLY) return;
      setWalletType(SupportedWallets.VENLY);
      const profile = await registerWith();
      setProfile(profile);
      if (profile?.isAuthenticated) setRegStepTwo(true);
    } catch (e: any) {
      dispatch(ErrorStateActions.setErrorMessage(e?.message || e?.status || e));
      dispatch(ErrorStateActions.setErrorModal(true));
    }
  };

  return (
    <>
      <div className={`${classes.newreg} ${classes.form}`}>
        <WalletPopup
          popupData={{
            popup,
            setPopup,
          }}
        />
        <div className={classes.flexWrap}>
          <div className={classes.heading}>
            To use EverScapes you need a digital wallet
          </div>
          <div className={classes.seperator} />
          <div className={classes.buttonwrap}>
            <button onClick={() => setPopup(true)}>
              What is a Digital Wallet?
            </button>
          </div>
        </div>
        <div className={classes.mainFlexWrap}>
          <div className={classes.VenlyWrapper}>
            <div className={classes.venlySetup}>
              <div className={classes.venlyText}>
                Set up a New Digital Wallet
              </div>
              <div className={classes.loginIcon}>
                <span
                  onClick={() => register(registerArakane)}
                  className={classes.iconBadgelogo}
                >
                  <img src={venlylogo} alt="arakane-logo" />
                </span>
              </div>
            </div>
            <div className={classes.accTxt}>
              Create a new Venly wallet for free now using facebook , twitter or
              email.
            </div>
            <div className={classes.buttonwrap}>
              <button onClick={() => register(registerArakane)}>
                Create a New Wallet
              </button>
            </div>
            <div className={classes.contactwrap}>
              <div className={classes.txtt}>With</div>
              <div className={classes.discord}>
                <img
                  src={fblogo}
                  alt="logo"
                  onClick={() => register(registerFacebook)}
                />
              </div>
              <div className={classes.mail}>
                <img
                  src={twitterlogo}
                  alt="logo"
                  onClick={() => register(registerTwitter)}
                />
              </div>
              <div className={classes.telegram}>
                <img
                  src={mailicon}
                  alt="logo"
                  onClick={() => register(registerGoogle)}
                />
              </div>
            </div>
          </div>
          <div className={classes.seperatorWrap}>
            <span className={classes.orTxt}>or</span>
            <div className={classes.verticalLine} />
          </div>
          <div className={classes.existingWrapper}>
            <div className={classes.venlyText}>
              Connect an Existing Digital Wallet
            </div>
            <div className={classes.metaWrap}>
              <img
                onClick={() => metaMaskLogin()}
                src={metaLogin}
                className={classes.metaLogin}
              />
            </div>
            <div className={classes.venlyWrap}>
              <img
                onClick={() => register(registerArakane)}
                src={venlyLogin}
                className={classes.venlyLogin}
              />
            </div>
          </div>
        </div>
        <Box className={classes.tabSwitchBtnWrap} textAlign="center">
          <Button className={classes.tabSwitchBtn} onClick={handleLoginAccount}>
            Login to existing account
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
}
