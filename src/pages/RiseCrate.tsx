import React, { useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { parse } from 'query-string';

import { useAppSelector } from '../redux/hooks';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Banner from './components/RiseCrate/Banner';
import Subscribe from './components/RiseCrate/Subscribe';
import Featured from './components/RiseCrate/Featured';
import Footer from './components/Everscapes/Footer';
import Video from './components/RiseCrate/Video';
import Galleries from './components/RiseCrate/Galleries';
import Piece from './components/RiseCrate/Piece';
import HorrorBanner from './components/RiseCrate/HorrorBanner';

const RiseCrate = () => {
  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );
  const location = useLocation();

  useEffect(() => {
    if (loggedIn) return;
    if (!loggedIn) {
      <Route>
        <Redirect to="/auth" />
      </Route>;
    }
  }, [loggedIn]);

  return (
    <>
      <TopBar />
      <MainNavbar />
      <Banner />
      <Subscribe />
      <Video />
      <Featured />
      <Piece />
      <Galleries />
      <Subscribe />
      <HorrorBanner />
      <Footer />
    </>
  );
};

export default RiseCrate;
