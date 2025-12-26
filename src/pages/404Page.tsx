import React from 'react';
import TopBar from './components/Everscapes/TopBar';
import MainNav from './components/Navbar/MainNav';
import ErrorContent from './components/Errorpage/Home';
import Footer from './components/Everscapes/Footer';

const Terms: React.FC = () => {
  return (
    <>
      <TopBar />
      <MainNav />
      <ErrorContent />
      <Footer />
    </>
  );
};

export default Terms;
