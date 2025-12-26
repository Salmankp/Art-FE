import React from 'react';
import TopBar from './components/Everscapes/TopBar';
import MainNav from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';
import Hero from './components/artist/Hero';
import Sidebar from './components/artist/Sidebar';
import { GridComponent } from './components/artist/GridComponent';
import { Drop } from './components/artist/Drop';

const Artist: React.FC = () => {
  const time = () => {
    // get total seconds between the times
    const dateNow = Date.now();
    let delta = Math.abs(1627779215923 - dateNow) / 1000;

    // calculate (and subtract) whole days
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    const seconds = delta % 60; // in theory the modulus is not required
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const timeLeft = setInterval(time, 1000);

  return (
    <>
      <TopBar />
      <MainNav />
      <Drop live time={timeLeft} />
      <GridComponent />
      <Sidebar />
      <Hero />
      <Footer />
    </>
  );
};

export default Artist;
