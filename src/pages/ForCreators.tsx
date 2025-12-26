import React from 'react';
import classes from './components/styles/ForCreators/ForCreators.module.scss';
import Banner from './components/ForCreators/Banner';
import RegistrationForm from './components/ForCreators/Form';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';

export default function Registration() {
  return (
    <div>
      <TopBar />
      <MainNavbar />
      <div className={classes.container}>
        <div className={classes.content}>
          <Banner />
          <RegistrationForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
