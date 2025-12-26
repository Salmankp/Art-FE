import React from 'react';
import Home from './components/privacy/Home';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';

const Privacy: React.FC = () => {
  return (
    <>
      <TopBar />
      <MainNavbar />
      <Home />
      <Footer />
    </>
  );
};

export default Privacy;
