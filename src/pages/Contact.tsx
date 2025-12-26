import React from 'react';
import { RouteComponentProps } from 'react-router';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';
import Hero from './components/contact/Hero';

const Contact: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <TopBar />
      <MainNavbar />
      <Hero />
      <Footer />
    </>
  );
};

export default Contact;
