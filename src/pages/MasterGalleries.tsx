import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Header from './components/MasterGalleries/Header';
import LaunchGallery from './components/MasterGalleries/LaunchGallery';
import UserGallery from './components/MasterGalleries/UserGallery';
import GTheme from './components/MasterGalleries/GTheme';
import Easystep from './components/MasterGalleries/Easystep';
import Footer from './components/RiseCrate/Footer';

const MasterDrop = () => {
  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );

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
      <LaunchGallery />
      <UserGallery />
      <GTheme />
      <Easystep />
      <Footer />
    </>
  );
};

export default MasterDrop;
