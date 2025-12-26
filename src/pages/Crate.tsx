import React from 'react';

import CrateCollection from './components/crateCollection/CrateCollection';
import Footer from './components/Everscapes/Footer';
import MainNav from './components/Navbar/MainNav';
import TopBar from './components/Everscapes/TopBar';

const Crate: React.FC = () => (
  <>
    <TopBar />
    <MainNav />
    <CrateCollection />
    <Footer />
  </>
);

export default Crate;
