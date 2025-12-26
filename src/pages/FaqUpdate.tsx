import React from 'react';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';
import { FaqData } from './components/FaqUpdate/FaqData';

const FaqUpdate: React.FC = () => {
  return (
    <>
      <TopBar />
      <MainNavbar />
      <FaqData />
      <Footer />
    </>
  );
};

export default FaqUpdate;
