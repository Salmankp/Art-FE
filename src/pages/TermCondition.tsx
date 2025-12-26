import React from 'react';
import Home from './components/TermCondition/Home';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';

const TermsAndConditions: React.FC = () => {
  return (
    <>
      <TopBar />
      <MainNavbar />
      <Home />
      <Footer />
    </>
  );
};

export default TermsAndConditions;
