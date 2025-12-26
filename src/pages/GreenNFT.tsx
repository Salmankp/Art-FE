import React from 'react';
import { RouteComponentProps } from 'react-router';
import Hero from './components/green-nft/Hero';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';

const GreenNFT: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <TopBar />
      <MainNavbar />
      <Hero />
      <Footer />
    </>
  );
};

export default GreenNFT;
