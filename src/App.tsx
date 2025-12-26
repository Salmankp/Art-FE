import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { CircularProgress, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import ReactGA from 'react-ga';
import CacheBuster from 'react-cache-buster';
import { AuthenticationStateActions } from './redux/slices/AuthenticationState';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { UserAPI } from './api/user';
import { ContractsInstance } from './utils/getContractInstance';
import { InjectAxiosInterceptors } from './utils/sessionInterceptor';
import { version } from '../package.json';
import ErrorModal from './pages/components/ErrorModal';
import SuccessModal from './pages/components/SuccessModal';

const Auth = lazy(() => retry(() => import('./pages/Auth')));
const Login = lazy(() => retry(() => import('./pages/Login')));
const Home2 = lazy(() => retry(() => import('./pages/Home2')));
const FaqUpdate = lazy(() => retry(() => import('./pages/FaqUpdate')));
// const Everscapes = lazy(() => retry(() => import('./pages/Everscapes')));
const Everscapes = lazy(() => retry(() => import('./pages/Everscapes')));
const GreenNFT = lazy(() => retry(() => import('./pages/GreenNFT')));
const ForCreators = lazy(() => retry(() => import('./pages/ForCreators')));
const Terms = lazy(() => retry(() => import('./pages/Terms')));
const TermCondition = lazy(() => retry(() => import('./pages/TermCondition')));
const Privacy = lazy(() => retry(() => import('./pages/Privacy')));
const Contact = lazy(() => retry(() => import('./pages/Contact')));
const Marketplace = lazy(() => retry(() => import('./pages/Marketplace')));
const VerifyEmail = lazy(() => retry(() => import('./pages/VerifyEmail')));
const Artist = lazy(() => retry(() => import('./pages/Artist')));
const Artists = lazy(() => retry(() => import('./pages/Artists')));
const Drops = lazy(() => retry(() => import('./pages/Drops')));
const NFTSolo = lazy(() => retry(() => import('./pages/NFTSolo')));
// const RiseCrate = lazy(() => retry(() => import('./pages/RiseCrate')));
const MasterGalleries = lazy(() =>
  retry(() => import('./pages/MasterGalleries')),
);
const Dashboard = lazy(() => retry(() => import('./pages/Dashboard')));
const NFTPage = lazy(() => retry(() => import('./pages/NFTPage')));
const VulcanVerse = lazy(() => retry(() => import('./pages/VulcanVerse')));

const Crate = lazy(() => retry(() => import('./pages/Crate')));
const ArtistsMaster = lazy(() => retry(() => import('./pages/ArtistsMaster')));
const DropsLatest = lazy(() => retry(() => import('./pages/DropsLatest')));
const ErrorPage = lazy(() => retry(() => import('./pages/404Page')));
const RemasteredDrop = lazy(() =>
  retry(() => import('./pages/RemasteredDrop')),
);
const ElmoreDrop = lazy(() => import('pages/ElmoreDrop'));
const MoonMaidMedallionDrop = lazy(() => import('pages/MoonMaidMedallionDrop'));
const MoonMaidTermsCondition = lazy(
  () => import('pages/MoonMaidTermsCondition'),
);
const MoonMaidWinners = lazy(() => import('pages/MoonMaidWinners'));
const NewDrop = lazy(() => import('pages/Drops/index'));

const retry: any = (
  fn: Function,
  retriesLeft: any = 5,
  interval: any = 1000,
) => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch(async (error: Error) => {
        await new Promise((resolve) => setTimeout(resolve, interval));
        if (retriesLeft === 1) {
          return window.location.reload();
        }
        retry(fn, retriesLeft - 1, interval).then(resolve, reject);
      }, interval);
  });
};

const StyledBoxContainer = styled(Box)({
  background: 'linear-gradient(180deg, #181818 0%, #111111 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  justifyContent: 'center',
});

declare global {
  interface Window {
    contracts: ContractsInstance;
  }
}
const App: React.FC = () => {
  const location = useLocation();
  const isProduction = process.env.REACT_APP_ENVIRONMENT === 'production';
  useEffect(() => {
    const initReactGA = () => {
      ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS_KEY}`);
      ReactGA.pageview(location.pathname);
    };
    if (process.env.REACT_APP_ENVIRONMENT === 'production') {
      initReactGA();
    }
  }, [location]);

  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );
  const userInformation = useAppSelector(
    (state) => state.AuthenticationState.userGeneralInfo,
  );

  const dispatch = useAppDispatch();

  const getUserStatus = async () => {
    const res = await UserAPI.checkIfUserIsVerified();
    if (res?.success) {
      const loginInformation = {
        authToken: userInformation.authToken,
        userInfo: userInformation?.userInfo,
        profileStatus: res?.data?.data?.verified,
      };
      dispatch(
        AuthenticationStateActions.set_user_general_info(loginInformation),
      );
    }
  };

  useEffect(() => {
    const run = async () => {
      const res = await UserAPI.verify();

      if (res.success) {
        dispatch(AuthenticationStateActions.set_logged_in(true));
        dispatch(
          AuthenticationStateActions.set_generated(res?.generated as boolean),
        );
        getUserStatus();
      }
    };

    const userToken = localStorage.getItem('authToken');

    if (userToken) {
      run();
    }
  }, [dispatch]);

  useEffect(() => {
    if (loggedIn) {
      // TODO: This should not be called here. Added by Sheraz
      // getUserDetails(dispatch);
      // getLatestDrops(dispatch);
    }
  }, [dispatch, loggedIn]);

  return (
    <CacheBuster
      currentVersion={version}
      isEnabled={isProduction} // If false, the library is disabled.
      isVerboseMode={false} // If true, the library writes verbose logs to console.
    >
      <InjectAxiosInterceptors />
      <Suspense
        fallback={
          <StyledBoxContainer>
            <CircularProgress />
          </StyledBoxContainer>
        }
      >
        <Switch>
          <Route exact sensitive path="/nft/:id" component={NFTPage} />

          {/* --- CRATE MICRO ROUTES --- */}
          <Route exact sensitive path="/crate/:slug" component={Crate} />
          {/* --- CRATE MICRO ROUTES --- */}

          {/* --- AUTHENTICATION & LOGIN MICRO ROUTES --- */}
          <Route
            exact
            sensitive
            path="/auth"
            component={Login}
            key={document.location.href}
          />
          {/* <Route exact sensitive path="/login" component={Auth} /> */}
          <Route exact sensitive path="/for-creators" component={ForCreators} />
          <Route
            exact
            sensitive
            path="/verify-email/:code/:email"
            component={VerifyEmail}
          />
          {/* --- AUTHENTICATION & LOGIN MICRO ROUTES --- */}

          {/* --- DROPS MICRO ROUTES --- */}
          <Route
            exact
            sensitive
            path="/drop/valentine"
            component={NewDrop}
            key={document.location.href}
          />

          <Route
            exact
            sensitive
            path="/drop/exploring-fantasy"
            component={ElmoreDrop}
            key={document.location.href}
          />
          <Route
            exact
            sensitive
            path="/drop/the-heavy-metal"
            component={ElmoreDrop}
            key={document.location.href}
          />
          <Route
            exact
            sensitive
            path="/drop/infinite-worlds"
            component={ElmoreDrop}
            key={document.location.href}
          />
          <Route
            exact
            sensitive
            path="/drop/gideon-kendall"
            component={ElmoreDrop}
            key={document.location.href}
          />
          <Route
            exact
            sensitive
            path="/drop/larry-elmore"
            component={ElmoreDrop}
            key={document.location.href}
          />
          <Route
            exact
            sensitive
            path="/drop/moonmaid"
            component={MoonMaidMedallionDrop}
            key={document.location.href}
          />
          <Route
            exact
            sensitive
            path="/TAC/moonmaid"
            component={MoonMaidTermsCondition}
            key={document.location.href}
          />
          <Route
            exact
            sensitive
            path="/moonmaid/winners"
            component={MoonMaidWinners}
            key={document.location.href}
          />
          <Route
            exact
            sensitive
            path="/drop/remastered"
            component={RemasteredDrop}
            key={document.location.href}
          />
          <Route
            exact
            sensitive
            path="/drop/:slug"
            component={NewDrop}
            key={document.location.href}
          />
          {/* <Route
            exact
            sensitive
            path="/drop/:slug"
            component={DropsLatest}
            key={document.location.href}
          /> */}
          {/* --- DROPS MICRO ROUTES --- */}

          {/* --- MARKETPLACE MICRO ROUTES --- */}
          <Route exact sensitive path="/dashboard" component={Dashboard} />
          <Route exact sensitive path="/marketplace" component={Marketplace} />
          {/* --- MARKETPLACE MICRO ROUTES --- */}

          <Route exact sensitive path="/everscapes" component={Everscapes} />
          {/* <Route
            exact
            sensitive
            path="/everscapes-new"
            component={Everscapes}
          /> */}
          {/* --- STATIC MICRO ROUTES --- */}
          <Route exact sensitive path="/" component={Home2} />
          <Route exact sensitive path="/vulcan-verse" component={VulcanVerse} />
          <Route exact sensitive path="/faq" component={FaqUpdate} />
          <Route exact sensitive path="/artist" component={Artist} />
          <Route exact sensitive path="/privacy" component={Privacy} />
          <Route exact sensitive path="/contactus" component={Contact} />
          <Route exact sensitive path="/terms" component={Terms} />
          <Route exact sensitive path="/404page" component={ErrorPage} />
          <Route exact sensitive path="/greennft" component={GreenNFT} />
          <Route exact sensitive path="/artist-page" component={Artists} />

          <Route
            exact
            sensitive
            path="/artists-master"
            component={ArtistsMaster}
          />
          <Route
            exact
            sensitive
            path="/medallian-terms"
            component={TermCondition}
          />
          <Route
            exact
            sensitive
            path="/master-galleries"
            component={MasterGalleries}
          />
          {/* --- STATIC MICRO ROUTES --- */}

          {/* --- UN USED ROUTES --- */}
          {/* <Route exact sensitive path="/rise-crate" component={RiseCrate} /> */}
          <Route exact sensitive path="/nft-solo/:id" component={NFTSolo} />

          {/* --- UN USED ROUTES --- */}

          <Redirect to="/404page" />
        </Switch>
      </Suspense>
      <ErrorModal />
      <SuccessModal />
    </CacheBuster>
  );
};

export default App;
