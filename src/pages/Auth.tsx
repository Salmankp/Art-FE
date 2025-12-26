import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Hidden } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import classes from './components/styles/Auth/Form.module.scss';
import Banner from './components/Auth/Banner';
import RegistrationForm from './components/Auth/Register';
import RegistrationFormStep2 from './components/Auth/Register2';
import LoginForm from './components/Auth/Login';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';
import { useAppSelector } from '../redux/hooks';
import Helper from '../utils/helpers';

const FORM = {
  REGISTER: 'register',
  LOGIN: 'login',
};

export const SupportedWallets = {
  VENLY: 'venly',
  METAMASK: 'metamask',
};

export default function Auth() {
  const location = useLocation();
  const [regTwo, setRegTwo] = useState(false);
  const [profile, setProfile] = useState();
  const [walletType, setWalletType] = useState();

  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );
  const wallet = useAppSelector(
    (state) => state.AuthenticationState.walletDetails,
  );
  const [stage, setStage] = useState(
    location?.hash === '#register' ? FORM.REGISTER : FORM.LOGIN,
  );
  const history = useHistory();
  const [warning] = useState<string>();

  useEffect(() => {
    if (loggedIn) {
      history.push('/dashboard');
    }
  }, [history, loggedIn, wallet]);

  const showRegistrationTab =
    stage === FORM.REGISTER ? () => null : () => setStage(FORM.REGISTER);
  const showLoginTab =
    stage === FORM.LOGIN ? () => null : () => setStage(FORM.LOGIN);

  return (
    <div>
      <TopBar />
      <MainNavbar setStage={setStage} />
      <Helper />
      {warning && <div className={classes.maintainence}>{warning}</div>}

      <div className={classes.container}>
        <div className={classes.content}>
          <Banner reg={stage === FORM.REGISTER} />
          <Hidden lgUp>
            <p className={classes.mobileHeader1}>
              One account
              <br />
              <span>endless possibilities!</span>
            </p>
            <p className={classes.mobileHeader2}>
              Digital collectables are as varied as the passions, lifestyles and
              hobbies from which they come. Find works, and communities that
              relate to you.
              <br />
              <br />
              From fantasy art to music to sport or gaming, wherever your
              passion lives, artefy has you covered.
            </p>
          </Hidden>
          <div className={classes.formCol}>
            {!regTwo && (
              <div className={classes.tabs}>
                <div className={classes.tab} onClick={showLoginTab}>
                  <p
                    className={clsx({
                      [classes.active]: stage === FORM.LOGIN,
                      [classes.loginTab]: true,
                    })}
                    style={{
                      borderBottomColor:
                        stage === FORM.LOGIN ? '#3fb5f5' : '#a69a9a',
                    }}
                  >
                    Login
                    <span style={{ paddingLeft: '8px' }}>
                      to existing account
                    </span>
                  </p>
                </div>
                <div className={classes.tab} onClick={showRegistrationTab}>
                  <p
                    className={clsx({
                      [classes.active]: stage === FORM.REGISTER,
                      [classes.loginTab]: true,
                    })}
                    style={{
                      borderBottomColor:
                        stage === FORM.REGISTER ? '#3fb5f5' : '#a69a9a',
                    }}
                  >
                    Create
                    <span style={{ paddingLeft: '8px' }}>new account</span>
                  </p>
                </div>
              </div>
            )}
            {/* {stage === FORM.REGISTER ? <RegistrationForm /> : <LoginForm />} */}
            {regTwo ? (
              <RegistrationFormStep2
                profile={profile}
                walletType={walletType}
              />
            ) : stage === FORM.REGISTER ? (
              <RegistrationForm
                setRegStepTwo={setRegTwo}
                setProfile={setProfile}
                setWalletType={setWalletType}
              />
            ) : (
              <LoginForm />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
