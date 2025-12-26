import React from 'react';
import { RouteComponentProps } from 'react-router';
import Details from './components/home2/Details';
import MobileDetails from './components/home2/MobileDetails';
import Join from './components/home2/Join';
import StartCollection from './components/home2/StartCollection';
import Explore from './components/home2/Explore';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Header from './components/home2/Header';
import Footer from './components/Everscapes/Footer';

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <TopBar />
      <MainNavbar />
      <Header />
      <Explore />
      <StartCollection />
      <Join />
      <Details />
      <MobileDetails />
      <Footer />
    </>
  );
};

export default Home;
