import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import classes from './components/styles/Auth/Form.module.scss';

import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { success } from '../utils/toast';
import { UserAPI } from '../api/user';
import { AuthenticationStateActions } from '../redux/slices/AuthenticationState';
import Loader from './components/common/Loader';

export default function VerifyEmail() {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );
  // const wallet = useAppSelector(
  //   (state) => state.AuthenticationState.walletDetails,
  // );
  const { code, email }: any = useParams();
  const history = useHistory();
  const styles = {
    loaderContainerStyle: {
      width: '100%',
    },
  };

  const verifyAccount = async () => {
    const res = await UserAPI.accountVerification(code, email);
    if (res.success) {
      if (loggedIn) {
        history.push('/dashboard');
      } else {
        success('Account is verified, please login to continue.');
        localStorage.clear();
        dispatch(AuthenticationStateActions.set_logged_in(false));
        history.push('/auth');
      }
    }
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  return (
    <div>
      <TopBar />
      <MainNavbar />
      <div className={classes.container}>
        <div className={classes.content}>
          <div style={styles.loaderContainerStyle}>
            <Loader />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
