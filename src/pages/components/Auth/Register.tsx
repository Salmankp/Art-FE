import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { ErrorStateActions } from 'redux/slices/ErrorState';
import classes from '../styles/Auth/Form.module.scss';

import {
  mailicon,
  discordicn,
  fblogo,
  twitterlogo,
  venlylogo,
  foxlogo,
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

export default function RegistrationForm({
  setRegStepTwo,
  setProfile,
  setWalletType,
}) {
  const history = useHistory();

  const dispatch = useAppDispatch();

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
        <div className={classes.heading}>Create Your Artefy Account with;</div>
        <div className={classes.optionwrap}>
          <div className={classes.option}>
            <div className={classes.btnwrap}>
              <div className={classes.imgwrap}>
                <div className={classes.loginIcon}>
                  <span
                    onClick={() => register(registerArakane)}
                    className={classes.iconBadgelogo}
                  >
                    <img src={venlylogo} alt="arakane-logo" />
                    <span className={classes.iconBadge}>Your Venly Wallet</span>
                  </span>
                </div>
                <div className={classes.loginIcon}>
                  <span
                    onClick={() => register(registerFacebook)}
                    className={classes.iconBadgelogo}
                  >
                    <img src={fblogo} alt="fb-logo" />
                    <span className={classes.iconBadge}>Facebook</span>
                  </span>
                </div>
                <div className={classes.loginIcon}>
                  <span
                    onClick={() => register(registerTwitter)}
                    className={classes.iconBadgelogo}
                  >
                    <img src={twitterlogo} alt="tw-logo" />
                    <span className={classes.iconBadge}>Twitter</span>
                  </span>
                </div>
                <div className={classes.loginIcon}>
                  <span
                    onClick={() => register(registerGoogle)}
                    className={classes.iconBadgelogo}
                  >
                    <img
                      src={mailicon}
                      alt="g-logo"
                      className={classes.mailIcon}
                    />
                    <span className={classes.iconBadge}>Gmail</span>
                  </span>
                </div>
                <div className={classes.loginIcon}>
                  <span
                    onClick={metaMaskLogin}
                    className={classes.iconBadgelogo}
                  >
                    <img src={foxlogo} alt="logo" />
                    <span className={classes.iconBadge}>MetaMask</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={classes.whats}>
          What’s a crypto wallet?
          <Info {...info} />
        </div> */}

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
        </div>
      </div>
    </>
  );
}
