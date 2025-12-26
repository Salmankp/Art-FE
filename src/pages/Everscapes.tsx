import React, { useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { useAppSelector } from '../redux/hooks';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Header from './components/Everscapes/Header';
import Carousel from './components/Everscapes/Carousel';
import CreateAccount from './components/Everscapes/CreateAccount';
import NextDrop from './components/Everscapes/NextDrop';
import Featured from './components/Everscapes/Featured';

import GalleryBanner from './components/Everscapes/GalleryBanner';

import VideoSlider from './components/Everscapes/VideoSlider';
import StartCollection from './components/Everscapes/StartCollection';
import Footer from './components/Everscapes/Footer';
import Video from './components/Everscapes/Video';
import Join from './components/Everscapes/Join';
import GetStarted from './components/Everscapes/GetStarted';
import WelcomeRemaster from './components/Everscapes/WelcomeRemaster';
import WelcomeMarketplace from './components/Everscapes/WelcomeMarketplace';
import PreviousDrop from './components/Everscapes/PreviousDrop';

const Everscapes = () => {
  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );
  const location = useLocation();

  const queryParams = parse(location.search);

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
      <Header />
      <Carousel />
      {loggedIn ? (
        <>
          <NextDrop worldID={queryParams.worldId as string} />
          <Join />
          <WelcomeMarketplace />
          <GalleryBanner />
          <WelcomeRemaster />
          <PreviousDrop />
          <Footer />
        </>
      ) : (
        <>
          <CreateAccount />
          <Video />
          <StartCollection />
          <Featured />
          <NextDrop worldID={queryParams.worldId as string} />
          <GetStarted />
          <GalleryBanner />
          <Join />
          <VideoSlider />
          <WelcomeRemaster />
          <WelcomeMarketplace />
          <PreviousDrop />
          <Footer />
        </>
      )}
    </>
  );
};

export default Everscapes;
