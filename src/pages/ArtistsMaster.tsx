import React from 'react';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';
import Header from './components/ArtistsMaster/Header';
import Main from './components/ArtistsMaster/Main';
import { artistsheaderbg } from '../assets/index';

const ArtistsMaster: React.FC = () => {
  const data = [
    {
      bgimg: artistsheaderbg,
      heading: 'Featured Works',
      content:
        'EverScapes brings you the greatest fantasy, sci-fi and horror artists of all time. These are the guys and girls that have defined the space and continue to set new standards. Discover a selection of our launch artists below with new masters to be announced regularly. Watch this space!',
    },
  ];
  return (
    <>
      <TopBar />
      <MainNavbar />
      <div
        style={{
          background: 'linear-gradient(180deg, #363636 0%, #111111 100%)',
          paddingBottom: '2rem',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Header data={data} />
        </div>
        <Main />
      </div>
      <Footer />
    </>
  );
};

export default ArtistsMaster;
