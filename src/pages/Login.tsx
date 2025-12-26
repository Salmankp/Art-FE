import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router-dom';
import classes from './components/styles/Login/Form.module.scss';
import RegistrationForm from './components/Login/Register';
import RegistrationFormStep2 from './components/Login/Register2';
import LoginForm from './components/Login/Login';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Header from './components/Login/Header';
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
    location?.hash === '#login' ? FORM.LOGIN : FORM.REGISTER,
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
      <MainNavbar />
      <Helper />
      <Header />
      {warning && <div className={classes.maintainence}>{warning}</div>}

      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.formCol}>
            {!regTwo && (
              <div className={classes.tabs}>
                {stage === FORM.REGISTER && (
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
                )}
                {stage === FORM.LOGIN && (
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
                )}
              </div>
            )}
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
                handleLoginAccount={showLoginTab}
              />
            ) : (
              <LoginForm handleCreateAccount={showRegistrationTab} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
