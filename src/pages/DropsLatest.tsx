import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';
import Header from './components/DropNew/Header';
import Register from './components/DropNew/Register';
import GridandNftView from './components/DropNew/GridandNftView';
import StartCollection from './components/DropNew/StartCollection';
import PlatinumEdition from './components/DropNew/PlatinumEdition';
import PlusChance from './components/DropNew/PlusChance';
import { DropsAPI } from '../api/dropsAPI';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
// actions
import { getAccountBalance } from '../utils/dropDetails';
import DropDetails, { NFT } from './components/DropNew/DropDetails';
import { dropPaintings } from '../utils/interfaces';
import SilverPlusChance from './components/DropNew/SilverPlusChance';
import ScifiPlatinumEdition from './components/DropNew/ScifiPlatinumEdition';
import CornerArtPlatinumEdition from './components/DropNew/CornerArtPlatinumEdition';
import GregPlatinum from './components/DropNew/GregPlatinum';

import { removeAllTrailingSlashes } from '../utils/helper';
import HeaderMetalMas from './components/DropNew/HeaderMetalMas';

type stackType = 'everscapes' | 'artefy' | 'classic-club';
const DropsLatest: React.FC<RouteComponentProps> = ({ location }) => {
  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );
  const userDetails = useAppSelector(
    (state) => state.AuthenticationState.userDetails,
  );
  const dispatch = useAppDispatch();

  // TODO: Need to move from drop id to drop slug
  const history = useHistory();

  const [, setShowModal] = useState<boolean>(false);
  const [, setCurrentModalData] = useState();
  const [, setBalance] = useState<number>(0);
  const [dropApiDetails, setDropDetails] = useState<dropPaintings>();
  const [nftsData, setNftsData] = useState<NFT[]>([]);
  const [autoRerender, setIsAutoRerender] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<boolean>(true);

  useEffect(() => {
    if (history.location.state === 'top') {
      window.scrollTo(0, 0);
    }
  }, [history]);

  useEffect(() => {
    let mounted = true;

    if (loggedIn && mounted) {
      getAccountBalance(setBalance, userDetails.address);
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, loggedIn, userDetails]);

  const modalToggleHandler = (data: any) => {
    setCurrentModalData({ ...data });
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    const slug = removeAllTrailingSlashes(location.pathname);
    const fetchDropsData = async () => {
      try {
        await DropsAPI.getDropsBySlug(slug).then((nft: any) => {
          if (!nft?.data?.paintings?.length) return history.push('/404page');
          setNftsData(nft?.data?.paintings);
          setDropDetails(nft?.data);
        });
      } catch (e) {
        return history.push('/404page');
      }
    };
    fetchDropsData();
  }, [autoRerender]);
  if (nftsData.length === 0) return null;

  const isSilverWarriorMedalloion =
    location.pathname === '/drop/silver-warrior-medallion';
  const isMetalMas = location.pathname === '/drop/heavy-metal-mas';
  const isSciFi = location.pathname === '/drop/sci-fi-launch';
  const isCornerArt = location.pathname === '/drop/corner-4-art';
  const isGreg = location.pathname === '/drop/greg-hildebrandt';

  const showStartCollection = () => {
    if (isMetalMas) return <></>;
    if (isGreg) return <></>;
    return <StartCollection />;
  };

  return (
    <>
      <TopBar />
      <MainNavbar />

      <div
        style={{
          background: 'linear-gradient(180deg, #111111 0%, #111111 100%)',
          overflow: 'hidden',
        }}
      >
        {!!dropApiDetails && !isMetalMas && (
          <Header
            data={{
              world: location.pathname as stackType,
              description: dropApiDetails?.dropDesc,
              dropName: dropApiDetails?.dropName?.toUpperCase(),
              subTitle: dropApiDetails?.subTitle,
              details: [
                `${dropApiDetails?.dropPainting} Collectables`,
                `${dropApiDetails?.dropArtist} Artists`,
                `${dropApiDetails?.dropCollection} Collections`,
              ],
            }}
          />
        )}

        {!!dropApiDetails && isMetalMas && (
          <HeaderMetalMas
            data={{
              world: location.pathname as stackType,
              description: dropApiDetails?.dropDesc,
              dropName: dropApiDetails?.dropName?.toUpperCase(),
              subTitle: dropApiDetails?.subTitle,
              details: [
                `${dropApiDetails?.dropPainting} Collectables`,
                `${dropApiDetails?.dropArtist} Artists`,
                `${dropApiDetails?.dropCollection} Collections`,
                'Direct Sale',
              ],
            }}
          />
        )}

        <GridandNftView
          nftsData={nftsData}
          autoRerender={autoRerender}
          type={location.pathname as stackType}
        />
        <Register />
        {isSilverWarriorMedalloion ? (
          <CornerArtPlatinumEdition />
        ) : isSciFi ? (
          <ScifiPlatinumEdition />
        ) : isCornerArt ? (
          <CornerArtPlatinumEdition />
        ) : isGreg ? (
          <GregPlatinum />
        ) : isMetalMas ? (
          <></>
        ) : (
          <PlatinumEdition />
        )}
        {showStartCollection()}
        <DropDetails
          nftsData={nftsData}
          location={location}
          autoRerender={autoRerender}
          payableModalHandler={modalToggleHandler}
          setIsAutoRerender={setIsAutoRerender}
        />
      </div>
      {isSilverWarriorMedalloion ? (
        <SilverPlusChance />
      ) : isSciFi || isCornerArt || isGreg ? (
        <></>
      ) : (
        !isMetalMas && <PlusChance />
      )}
      <Footer />
    </>
  );
};

export default DropsLatest;
