import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import TopBar from './components/Everscapes/TopBar';
import { useAppSelector } from '../redux/hooks';
import MainNavbar from './components/Navbar/MainNav';
import Header from './components/RemasteredDrop/Header';
import NftView from './components/RemasteredDrop/NftView';
import MasonaryDrop from './components/RemasteredDrop/MasonaryDrop';
import Footer from './components/Everscapes/Footer';
import { NFT } from './components/DropNew/DropDetails';
import { removeAllTrailingSlashes } from '../utils/helper';
import { DropsAPI } from '../api/dropsAPI';
import { dropPaintings } from '../utils/interfaces';
import Classes from './components/styles/RemasteredDrop/RemasteredDrop.module.scss';

type stackType = 'everscapes' | 'artefy' | 'classic-club';
const RemasteredDrop: React.FC = () => {
  const history = useHistory();
  const [nftsData, setNftsData] = useState<NFT[]>([]);
  const [dropApiDetails, setDropDetails] = useState<dropPaintings>();

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
  }, []);

  if (nftsData.length === 0) return null;

  return (
    <>
      <TopBar />
      <MainNavbar />
      <Box className={Classes.bodyBg}>
        <Header
          data={{
            world: location.pathname as stackType,
            description: dropApiDetails?.dropDesc || '',
            dropName: dropApiDetails?.dropName?.toUpperCase() || '',
            subTitle: dropApiDetails?.subTitle || '',
            details: [
              `${dropApiDetails?.dropPainting} Collectables`,
              `${dropApiDetails?.dropArtist} Artists`,
              `${dropApiDetails?.dropCollection} Collections`,
              'Direct Sale',
            ],
          }}
        />
        <NftView />
        <MasonaryDrop itemData={nftsData} />
      </Box>
      <Typography component="div" className={Classes.border} />
      <Footer />
    </>
  );
};

export default RemasteredDrop;
