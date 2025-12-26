import React, { useEffect, useState } from 'react';
import moment from 'moment';
import NFTPortrait from 'pages/components/ElmoreDrop/components/NFTPortrait';
import NFTLandscape from 'pages/components/ElmoreDrop/components/NFTLandscape';
import GetStarted from 'pages/components/ElmoreDrop/components/getStarted';
import { SIGNATURE_LIST } from 'pages/components/ElmoreDrop/constants/signature';
import { useAppSelector } from 'redux/hooks';
import { DropsAPI } from 'api/dropsAPI';

export type NFT = {
  id: string;
  name: string;
  aboutArtWork: string;
  aboutNFT: string;
  aboutArtist: any[];
  artist: any[];
  previewUrl: string;
  preview3DUrl: string;
  gridImg: string;
  authorBadge: string | null;
  collection: string;
  dropDate: string;
  rarity: string;
  desc: string;
  saleType: string;
  price: number;
  cryptoPrice: number;
  isSold: boolean;
  totalMints: number;
  availableMints: number;
  orientation: string;
  slug: string;
  artefyWalletAddress: string;
  silverBadge: string;
  dropStartDate: string;
  dropEndDate: string;
  isComingSoon: boolean;
  isDropFinished: boolean;
  drop3DEditionImageUrl: string;
  comicSideBannerUrl: string;

  PlatinumBadge?: string;
  PlatinumIcon?: string;
  PlatinumImage?: string;
  PlatinumBackground?: string;
  PlatinumDescription?: string;
};

const walletArray = {
  '617f9b75d023e700135762a7': '0x0f8eA367C70fB46ba472DdeE920182D089040115',
  '617f990cd023e7001357623f': '0xc40ffF83Edfc884c2b3dc5E8Bf81Ce7fB807024a',
  '617f9d1dd023e700135762d2': '0xf8b4EE40a2F12060B96D9Ba87C038d9a9C3A229C',
  '617f9e6ed023e700135762f5': '0x8bde1Ea0C27f839eD4a12E6f72B3D0EaA2E88DcA',
  '618377b315cee10013a3329f': '0xF1E59bCD446A7700c1eECf6A5AeA3aF156A3BAAF',
};

const DropDetails: React.FC<{
  viewNFT?: string;
  location: any;
  nftsData: NFT[];
  autoRerender: number;
  payableModalHandler: (data: any) => void;
  setIsAutoRerender: (value: number) => void;
}> = ({
  location,
  payableModalHandler,
  nftsData,
  setIsAutoRerender,
  autoRerender,
  viewNFT,
}) => {
  const isMetalMas = location.pathname === '/drop/';
  if (isMetalMas) {
    nftsData = nftsData
      .filter((nftData) => {
        return (
          !nftData.isComingSoon ||
          moment
            .duration(
              moment(nftData.dropDate).subtract(2, 'hours').diff(moment()),
            )
            .asHours() <= 0
        );
      })
      .sort((a, b) => (a === b ? 0 : a ? -1 : 1));
  }

  // const imgHeights = {};
  const nftType = (item: NFT, index: number) => {
    const signature = SIGNATURE_LIST.find((pin) => pin.id === item.id);
    // const img = new Image();
    // img.src = item.previewUrl;
    // img.onload = () => (imgHeights[item] = img.height);
    if (item.orientation === 'landscape') {
      return (
        <>
          <NFTLandscape
            key={item.id}
            signature={signature}
            data={item}
            autoRerender={autoRerender}
            modalHandler={payableModalHandler}
            location={location}
            setIsAutoRerender={setIsAutoRerender}
          />
          {index < nftsData?.length - 1 && <GetStarted />}
        </>
      );
    }
    return (
      <>
        <NFTPortrait
          location={location}
          signature={signature}
          key={item.id}
          data={item}
          autoRerender={autoRerender}
          modalHandler={payableModalHandler}
          setIsAutoRerender={setIsAutoRerender}
          viewNFT={viewNFT || undefined}
        />
      </>
    );
  };

  return (
    <div>
      {nftsData?.length > 0 &&
        nftsData?.map((item, index) => {
          const nftItem = JSON.parse(JSON.stringify(item));
          nftItem.artefyWalletAddress = walletArray[item.id];
          nftItem.isSold = item.availableMints === 0;
          return nftType(nftItem, index);
        })}
    </div>
  );
};

export default DropDetails;
