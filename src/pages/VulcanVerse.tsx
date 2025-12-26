import React from 'react';
import HeaderMain from './components/VulcanVerse/HeaderMain';
import DrawNow from './components/VulcanVerse/DrawNow';
import SilverWarrior from './components/VulcanVerse/SilverWarrior';
import Price from './components/VulcanVerse/Price';
import Buybronz from './components/VulcanVerse/Buybronz';
import Buynow from './components/VulcanVerse/BuyNow';
import FrazettaPartnership from './components/VulcanVerse/FrazettaPartnership';
import RegisterVulcan from './components/VulcanVerse/RegisterVulcan';
import DiscoverWorld from './components/VulcanVerse/DiscoverWorld';
import Footer from './components/VulcanVerse/Footer';

import WinnerTable2 from './components/VulcanVerse/WinnerTable250';

// import { useAppSelector } from '../redux/hooks';

const VulcanVerse: React.FC = () => {
  // const loggedIn = useAppSelector(
  //   (state) => state.AuthenticationState.logged_in,
  // );

  return (
    <>
      <HeaderMain />
      <DrawNow />
      <SilverWarrior />

      <WinnerTable2 />
      <Price />
      <Buybronz />
      <Buynow />
      <FrazettaPartnership />
      <RegisterVulcan />
      <DiscoverWorld />
      <Footer />
    </>
  );
};

export default VulcanVerse;
