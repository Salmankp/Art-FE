import React from 'react';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';
import Header from './components/NFTSolo/Header';
import NFT from './components/NFTSolo/NFT';

const NFTSolo: React.FC = () => {
  return (
    <>
      <TopBar />
      <MainNavbar />
      <div
        style={{
          background: 'linear-gradient(180deg, #363636 0%, #111111 100%)',
        }}
      >
        <Header />
        <NFT />
      </div>
      <Footer />
    </>
  );
};

export default NFTSolo;
