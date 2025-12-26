import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TopNav from './components/Everscapes/TopBar';
import Nav from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';
import Wallet from './components/dashboard/Wallet';
import AssetsContainer from './components/dashboard/AssetsContainer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUserDetails } from '../utils/getUserDetails';
import Header from './components/dashboard/Header';
import { UserAPI } from '../api/user';
import AccountVerificationBanner from './components/dashboard/AccountVerificationBanner';
import { AuthenticationStateActions } from '../redux/slices/AuthenticationState';

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );

  const userInformation = useAppSelector(
    (state) => state.AuthenticationState.userGeneralInfo,
  );

  useEffect(() => {
    if (loggedIn) return;
    history.push('/auth');
  }, [loggedIn, history]);

  useEffect(() => {
    getUserDetails(dispatch);
  }, []);

  const getUserStatus = async () => {
    const res = await UserAPI.checkIfUserIsVerified();
    if (res?.success) {
      if (res?.data?.data?.verified === true) {
        const loginInformation = {
          authToken: userInformation.authToken,
          userInfo: userInformation?.userInfo,
          profileStatus: res?.data?.data?.verified,
        };
        dispatch(
          AuthenticationStateActions.set_user_general_info(loginInformation),
        );
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (userInformation?.profileStatus === false) {
        getUserStatus();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const styles = {
    mainContainer: {
      background: 'linear-gradient(180deg, #363636 0%, #111111 100%)',
    },
  };

  return (
    <>
      {!userInformation?.profileStatus && <AccountVerificationBanner />}
      <TopNav />
      <Nav />
      <Header />
      <div style={styles.mainContainer}>
        <Wallet onRefreshClick={() => {}} />
        <AssetsContainer />
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
