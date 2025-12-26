import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DropDetails from 'pages/components/ElmoreDrop/components/dropDetail';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Footer from './components/Everscapes/Footer';
import { NFT } from './components/DropNew/DropDetails';
import { removeAllTrailingSlashes } from '../utils/helper';
import { DropsAPI } from '../api/dropsAPI';
import { dropPaintings } from '../utils/interfaces';
import TermsCondition from './components/MedallionDrop/TermsCondition';
import Banner from './components/MedallionDrop/Banner';
import MoonMaidInfo from './components/MedallionDrop/MoonMaidInfo';

type stackType = 'everscapes' | 'artefy' | 'classic-club';
const MedallionDrop: React.FC = () => {
  const history = useHistory();
  const [nftsData, setNftsData] = useState<NFT[]>([]);
  const [autoRerender, setIsAutoRerender] = useState<number>(0);
  const [dropApiDetails, setDropDetails] = useState<dropPaintings>();
  const [, setShowModal] = useState<boolean>(false);
  const [, setCurrentModalData] = useState();

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
      <Banner
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
      <MoonMaidInfo />

      <DropDetails
        nftsData={nftsData}
        location={window.location}
        autoRerender={autoRerender}
        payableModalHandler={modalToggleHandler}
        setIsAutoRerender={setIsAutoRerender}
      />

      <TermsCondition />
      <Footer />
    </>
  );
};

export default MedallionDrop;
