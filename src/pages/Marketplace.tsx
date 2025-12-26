import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';

import Worlds from './components/Marketplace/Worlds';

const Marketplace = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (history.location.state === 'top') {
      window.scrollTo(0, 0);
    }
  }, [history]);

  return (
    <>
      <TopBar />
      <MainNavbar />
      <Worlds worlds="Everscapes" worldId={location.search.split('=')[1]} />
    </>
  );
};

export default Marketplace;
