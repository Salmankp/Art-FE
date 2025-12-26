import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DropDetails from 'pages/components/ElmoreDrop/components/dropDetail';
import TopBar from './components/Everscapes/TopBar';
import { useAppSelector } from '../redux/hooks';
import MainNavbar from './components/Navbar/MainNav';
import Header from './components/ElmoreDrop/Header';
import GridandNftView from './components/ElmoreDrop/GridandNftView';
import Footer from './components/Everscapes/Footer';
import { NFT } from './components/DropNew/DropDetails';
import { removeAllTrailingSlashes } from '../utils/helper';
import { DropsAPI } from '../api/dropsAPI';
import { dropPaintings } from '../utils/interfaces';
import StartCollection from './components/ElmoreDrop/StartCollection';
import FreeAccount from './components/ElmoreDrop/FreeAccount';
import HeaderInfinite from './components/ElmoreDrop/HeaderInfinite';

type stackType = 'everscapes' | 'artefy' | 'classic-club';
const ElmoreDrop: React.FC = () => {
  const history = useHistory();
  const [nftsData, setNftsData] = useState<NFT[]>([]);
  const [autoRerender, setIsAutoRerender] = useState<number>(0);
  const [dropApiDetails, setDropDetails] = useState<dropPaintings>();
  const [, setShowModal] = useState<boolean>(false);
  const [, setCurrentModalData] = useState();

  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );
  const userDetails = useAppSelector(
    (state) => state.AuthenticationState.userDetails,
  );
  const isGideonKendal = location.pathname === '/drop/gideon-kendall';
  const isTheHeavyMetal = location.pathname === '/drop/the-heavy-metal';
  const isExploringFantasy = location.pathname === '/drop/exploring-fantasy';
  const isInfinityWorlds = location.pathname === '/drop/infinite-worlds';
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
          setNftsData(nft.data.paintings);
          setDropDetails(nft.data);
        });
      } catch (e) {
        return history.push('/404page');
      }
    };
    fetchDropsData();
  }, [autoRerender]);

  if (nftsData.length === 0) return null;

  return (
    <>
      <TopBar />
      <MainNavbar />
      {isInfinityWorlds || isTheHeavyMetal || isExploringFantasy ? (
        <HeaderInfinite
          data={{
            world: location.pathname as stackType,
            description: dropApiDetails?.dropDesc || '',
            dropName: dropApiDetails?.dropName?.toUpperCase() || '',
            subTitle: dropApiDetails?.subTitle || '',
            details: [
              `${
                dropApiDetails?.dropPainting === 1
                  ? `${dropApiDetails?.dropPainting} Collectable`
                  : `${dropApiDetails?.dropPainting} Collectables`
              }`,
              `${
                dropApiDetails?.dropArtist === 1
                  ? `${dropApiDetails?.dropArtist} Artist`
                  : `${dropApiDetails?.dropArtist} Artists`
              }`,
              `${
                dropApiDetails?.dropCollection === 1
                  ? `${dropApiDetails?.dropCollection} Collection`
                  : `${dropApiDetails?.dropCollection} Collections`
              }`,
              'Direct Sale',
            ],
          }}
        />
      ) : (
        <Header
          data={{
            world: location.pathname as stackType,
            description: dropApiDetails?.dropDesc || '',
            dropName: dropApiDetails?.dropName?.toUpperCase() || '',
            subTitle: dropApiDetails?.subTitle || '',
            details: [
              `${
                dropApiDetails?.dropPainting === 1
                  ? `${dropApiDetails?.dropPainting} Collectable`
                  : `${dropApiDetails?.dropPainting} Collectables`
              }`,
              `${
                dropApiDetails?.dropArtist === 1
                  ? `${dropApiDetails?.dropArtist} Artist`
                  : `${dropApiDetails?.dropArtist} Artists`
              }`,
              `${
                dropApiDetails?.dropCollection === 1
                  ? `${dropApiDetails?.dropCollection} Collection`
                  : `${dropApiDetails?.dropCollection} Collections`
              }`,
              'Direct Sale',
            ],
          }}
        />
      )}

      <DropDetails
        nftsData={nftsData}
        location={window.location}
        autoRerender={autoRerender}
        payableModalHandler={modalToggleHandler}
        setIsAutoRerender={setIsAutoRerender}
      />
      <GridandNftView
        nftsData={nftsData}
        autoRerender={autoRerender}
        type={location.pathname as stackType}
      />
      {!loggedIn && (
        <>
          <StartCollection />
          <FreeAccount />
        </>
      )}
      <Footer />
    </>
  );
};

export default ElmoreDrop;
