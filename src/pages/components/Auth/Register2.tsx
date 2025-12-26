import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Checkbox, CircularProgress, colors } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAppDispatch } from 'redux/hooks';
import { ErrorStateActions } from 'redux/slices/ErrorState';
import { mailicon, discordicn } from '../../../assets';
import classes from '../styles/Auth/Form.module.scss';
import { SupportedWallets } from '../../Auth';
import { register } from '../../../utils/helpers';

export default function RegistrationForm({ profile, walletType }) {
  const history = useHistory();
  const [humanKey, setHumanKey] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [termsAndCondition, setTermsAndCondition] = useState<any>(false);
  const [email, setEmail] = useState<string>('');
  const [authInfo, setAuthInfo] = useState<any>();
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(true);
  const [renderReCaptcha, setReCaptcha] = useState<boolean>(true);
  const [loading, setloading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!profile && !!walletType) return;
    const initArkane = async () => {
      const auth = await profile?.auth?.loadUserInfo();
      setAuthInfo(auth);
      setEmail(auth?.preferred_username);
      setWalletAddress(profile?.address);
    };
    const initMetaMask = async () => {
      setWalletAddress(profile?.primaryAccount);
    };

    if (walletType === SupportedWallets.VENLY) initArkane();
    if (walletType === SupportedWallets.METAMASK) initMetaMask();
  }, []);

  useEffect(() => {
    setReCaptcha(true);
  }, [renderReCaptcha]);

  const verifyCaptcha = (res) => {
    if (res) {
      setDisable(false);
      setHumanKey(res);
    }
  };

  const expireCaptcha = () => {
    setDisable(true);
    setHumanKey('');
  };

  const onSignUp = async () => {
    setloading(true);
    try {
      await register({
        username,
        email,
        termsAndCondition,
        humanKey,
        walletAddress,
        walletType,
      });
      setloading(false);
    } catch (e: any) {
      dispatch(ErrorStateActions.setErrorMessage(e?.message || e?.status || e));
      dispatch(ErrorStateActions.setErrorModal(true));
      setReCaptcha(false);
      expireCaptcha();
      setloading(false);
    }
  };

  const triggerTermsAndConditions = () => {
    if (termsAndCondition) {
      setTermsAndCondition(false);
    } else {
      setTermsAndCondition(true);
    }
  };

  return (
    <>
      <div className={`${classes.newreg} ${classes.form} ${classes.newreg2}`}>
        <div className={classes.heading}>You are almost done.</div>

        <div className={classes.inputwrap}>
          <div className={classes.title}>Create a Username</div>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className={classes.inputwrap}>
          <div className={classes.title}>Enter your email address</div>
          <input
            type="email"
            {...(authInfo?.preferred_username && {
              value: email,
              readOnly: true,
            })}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.tcwrap}>
          <div className={classes.tcheading}>Accept our T&C’s</div>
          <div className={classes.checkboxDiv}>
            <Checkbox
              style={{ color: 'white' }}
              onClick={triggerTermsAndConditions}
            />

            <label className={classes.checkboxLabel}>
              {'By selecting the box to the left you accept our '}
              <strong onClick={() => history.push('/terms')}>
                {'Terms & Conditions '}
              </strong>
              {'and '}
              <strong onClick={() => history.push('/privacy')}>
                Privacy Policy
              </strong>
            </label>
          </div>
        </div>

        <div className={classes.captchawrap}>
          <div className={classes.capheading}>Prove You Are A Human</div>
          <div className={classes.captchaClass}>
            {renderReCaptcha && (
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_CLIENT_KEY}
                onChange={verifyCaptcha}
                onExpired={expireCaptcha}
              />
            )}
          </div>
        </div>

        <div className={classes.btnwrap}>
          {loading ? (
            <CircularProgress style={{ width: '22px', height: '22px' }} />
          ) : (
            <button
              onClick={onSignUp}
              style={{
                cursor: disable ? 'not-allowed' : 'pointer',
                backgroundColor: disable ? 'gray' : '#3fb5f5',
              }}
              disabled={disable}
            >
              Take me to my Artefy Dashboard!
            </button>
          )}
        </div>

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
