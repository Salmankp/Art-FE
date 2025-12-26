import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Tooltip, Box as MBox } from '@material-ui/core';
import Loader from '../common/Loader';
import styles from '../styles/Marketplace/Card.module.scss';
import {
  uniqueDrop,
  legendaryDrop,
  extraordinaryDrop,
  masterpieceDrop,
  classicDrop,
  rareDrop,
  artefyGradientLogo,
  limitedDrop,
  commonDrop,
  noImageAvailable,
  maticIcon,
} from '../../../assets';
import { getArtistNames } from '../../../utils/helpers';
import NFTViewModal from './NFTViewModal';
import CardOverlay from './CardOverlay';
import { useAppSelector } from '../../../redux/hooks';
import listOfOwnedMints from './helpers/ListOfOwnedMints';
import getFormatedDate from './helpers/GetFormatedDate';
import getOwnPaintingsNotListed from './helpers/GetOwnPaintingsNotListed';
import listOfOwnedMintsInNumArray from './helpers/ListOfOwnedMintsInNumArray';

type RarityType =
  | 'Unique'
  | 'Legendary'
  | 'Extraordinary'
  | 'Masterpiece'
  | 'Classic'
  | 'Rare'
  | 'Limited'
  | 'Special'
  | 'Common';

const Card: React.FC<{
  data: any;
  userListedMints?: any[];
  loggedInUser: any;
  type: 'listing' | 'available';
  hasOverlay: boolean;
  favorites: boolean;
  showButton?: boolean;
  clickHandler?: () => void;
}> = (props) => {
  const [isBuffering, setIsBuffering] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [thumbnail, setThumbnail] = useState<any>(
    props?.data?.previewImage || false,
  );

  const [viewNFTModal, setViewNFTModal] = useState(false);
  const [image, setImage] = useState(props?.data?.image);
  const history = useHistory();

  const lengthChecker = (data: string, length: number) => {
    return data?.length > length ? `${data?.substring(0, length)}...` : data;
  };

  const userOwnedPaintings = useAppSelector(
    (state) => state.AuthenticationState.userPaintings,
  );

  const isLoggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );
  const paintingID = props?.data?._id;
  const paintingName = props?.data?.name || '';
  const artistName = getArtistNames(props?.data?.artists) || '';
  const rarityIcon = {
    Unique: uniqueDrop,
    Legendary: legendaryDrop,
    Extraordinary: extraordinaryDrop,
    Masterpiece: masterpieceDrop,
    Classic: classicDrop,
    Rare: rareDrop,
    Limited: limitedDrop,
    Common: commonDrop,
    Special: artefyGradientLogo,
  };
  const maticLogo = (price) => {
    return (
      <>
        <span>
          {price}
          {'  '}
          <Tooltip title="MATIC" placement="top" arrow>
            <img
              src={maticIcon}
              alt="logo"
              style={{ width: '20px', height: '15px' }}
            />
          </Tooltip>
        </span>
      </>
    );
  };
  const getItemBuyTitle = (auctionAvailable, buyNowAvailable) => {
    if (auctionAvailable) return 'Auction';
    if (buyNowAvailable) return 'Buy Now';
    if (auctionAvailable && buyNowAvailable) return 'Buy Now + Auction';
  };

  const handleNFTViewModal = (isOpen: boolean) => {
    setViewNFTModal(isOpen);
  };
  const handleImageError = () => {
    setImage(noImageAvailable);
  };

  const displayOwnedLabel = (mints: any[], loggedInUserId: string): boolean => {
    return mints?.some((item) => item?.currentBuyer === loggedInUserId);
  };

  const getOwnedPaintingsListed = (availableMints, userPaintings): any[] => {
    const listedMints: any = [];
    availableMints?.forEach((availableMint) => {
      const ownedListedMint = userPaintings.find(
        (ownedMint) => ownedMint.tokenId === availableMint.tokenId,
      );
      if (ownedListedMint) {
        listedMints.push(ownedListedMint);
      }
    });
    return listedMints;
  };

  const getAllArtists = (artists: any[]) => {
    let names = '';
    if (artists?.length === 1)
      return (names += `<p>${artists[0]?.name || 'N/A'} </p>`);

    artists?.forEach((item, i) => {
      if (i < 2) {
        names += `<p>${item.name || 'N/A'} ${i !== 1 ? '&' : ''}</p>`;
      }
    });
    return names;
  };

  const ownedMintsNotListed = getOwnPaintingsNotListed(
    paintingID,
    userOwnedPaintings?.paintings || [],
  );

  const ownedMintsListed = getOwnedPaintingsListed(
    props?.data?.mints,
    props?.userListedMints || [],
  );

  const getOriginalPrice = () => {
    if (
      props?.data?.mints &&
      props.data.mints[0]?.marketplace?.cryptoPrice > 0
    ) {
      return `${props.data.mints[0]?.marketplace?.cryptoPrice.toFixed(2)}`;
    }

    if (props?.data?.mints && props.data.mints[0]?.marketplace?.price > 0)
      return `$${props.data.mints[0]?.marketplace?.price.toFixed(2)}`;

    return 'N/A';
  };
  const getLatestSale = () => {
    if (
      props.data?.mints &&
      props.data?.mints[0]?.marketplace?.cryptoPrice > 0
    ) {
      return `${props?.data?.mints[0]?.marketplace?.cryptoPrice.toFixed(2)}`;
    }
    if (props.data?.mints && props?.data?.mints[0]?.marketplace?.price > 0) {
      return `$${props?.data?.mints[0]?.marketplace?.price.toFixed(2)}`;
    }
    return 'N/A';
  };

  const getFloorPrice = () => {
    if (props?.data?.startingFromPrice > 0)
      return `${props?.data?.startingFromPrice.toFixed(2)}`;
    return 'N/A';
  };

  const ownedMintsNotListedString = listOfOwnedMintsInNumArray(
    ownedMintsNotListed[0]?.totalOwnedMints || [],
    5,
  );

  const ownedMintsListedCount = ownedMintsListed.length;
  const ownedMintsNotListedCount =
    ownedMintsNotListed[0]?.totalOwnedMints.length;
  const ownedMintsListedString = listOfOwnedMints(ownedMintsListed, 5);
  const allMintsNames = listOfOwnedMints(props?.data?.mints, 5);
  const overlayData = {
    isAssetOwned: ownedMintsNotListed?.length > 0,
    name: lengthChecker(props?.data?.name, 30),
    dropDate: getFormatedDate(props?.data?.dropDate),
    orignalPrice: getOriginalPrice(),
    lastSaleDate:
      props?.data?.mints &&
      props.data.mints[0]?.marketplace?.lastSaleDate &&
      getFormatedDate(props.data.mints[0]?.marketplace?.lastSaleDate),
    latestSale: getLatestSale(),
    floorPrice: getFloorPrice(),
    rarityIcon: rarityIcon[props?.data?.rarity],
    rarity: props?.data?.rarity,
    mediaType: props?.data?.filetype,
    allMintsNames,
    ownedMintsListedCount,
    ownedMintsNotListedCount,
    mintsCount: props?.data?.mintsCount,
    ownedLabel: displayOwnedLabel(props?.data?.mints, props?.loggedInUser?.id),
    ownedMintsListed,
    ownedMintsNotListed,
    editionsCount: lengthChecker(`${props?.data?.mints?.length} Editions`, 12),
    ownedMintsNotListedString,
    ownedMintsListedString,
  };

  const handleToggleVideo = (action) => {
    if (action === 'play') {
      setIsPlay(true);
      setThumbnail(false);
    }
    if (action === 'pause') {
      setIsPlay(false);
    }
  };

  const renderBuffering = (isPlay, isBuffering) => {
    if (isBuffering && isPlay) {
      return (
        <MBox className={styles.bufferingLoader}>
          <Loader />
        </MBox>
      );
    }
  };
  return (
    <div
      className={`${styles.CardItem} ${
        isLoggedIn && ownedMintsListed?.length > 0 && styles.activeOrange
      } ${isLoggedIn && ownedMintsNotListed?.length > 0 && styles.activeGreen}`}
    >
      <div className={`${styles.mainImgWrap}`}>
        {props?.data?.filetype !== 'MP4' ? (
          <img
            src={image}
            alt="img"
            onError={handleImageError}
            className={`${styles.img}`}
          />
        ) : (
          <div className={`${styles.player}`}>
            {renderBuffering(isPlay, isBuffering)}
            <ReactPlayer
              className={styles.videoWrap}
              light={thumbnail}
              url={props?.data?.image}
              playing={isPlay}
              controls={false}
              onBuffer={() => {
                setIsBuffering(true);
              }}
              onBufferEnd={() => {
                setIsBuffering(false);
              }}
              onEnded={() => {
                setIsPlay(false);
                setThumbnail(props?.data?.previewImage);
              }}
            />
          </div>
        )}
        {isLoggedIn &&
          ownedMintsListedCount === 0 &&
          ownedMintsNotListedCount > 0 && (
            <span className={styles.ownedText}>
              {`${ownedMintsNotListedCount} Owned`}
            </span>
          )}
        {isLoggedIn && ownedMintsListedCount > 0 && (
          <span className={styles.listedText}>
            {`${ownedMintsListedCount} Listed`}
          </span>
        )}
        <CardOverlay
          onToggleVideo={(action) => handleToggleVideo(action)}
          data={overlayData}
          isPlay={isPlay}
        />
        <div
          className={
            props.hasOverlay ? styles.treasureImg : styles.displayAllTreasure
          }
        >
          <div className={styles.rarityContainer}>
            <img
              src={rarityIcon[props?.data?.rarity]}
              alt={props.data.rarity}
            />
          </div>
          <p>{props.data.rarity}</p>
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.dataWrap}>
          <div className={styles.data}>
            <p
              className={styles.artistNames}
              dangerouslySetInnerHTML={{
                __html: getAllArtists(props?.data?.artists),
              }}
            />
            <p
              className={
                props.type === 'available' ? styles.availableStyle : ''
              }
            >
              {`${
                props.data.mints ? props.data.mints.length : props.data.value
              } ${props.type}${props.data.mintsCount > 1 ? 's' : ''}`}
            </p>
          </div>
          <p className={styles.artist}>{props.data.name}</p>
        </div>
        <div className={styles.priceSection}>
          <Tooltip
            title={props.data.theme?.name}
            placement="bottom"
            arrow
            className={styles.tooltip}
          >
            <p className={styles.leftText}>
              {lengthChecker(props.data.theme?.name ?? '', 17)}
            </p>
          </Tooltip>
          <div className={styles.rightContainer}>
            <p>from</p>
            <p className={styles.priceText}>{maticLogo(getLatestSale())}</p>
          </div>
        </div>
        <hr />
        {props?.favorites && (
          <div className={styles.favouritesSection}>
            <div className={styles.leftSection} />
            <div className={styles.rightSection}>
              {getItemBuyTitle(
                props?.data?.auctionAvailable,
                props?.data?.buyNowAvailable,
              ) || 'N/A'}
            </div>
          </div>
        )}
        {props?.showButton && (
          <div className={styles.btnContainer}>
            <button
              className={styles.viewListBtn}
              onClick={() => {
                history.push(`/nft/${props?.data?.mints[0]?._id}`, {
                  paintingID,
                  mintID: props?.data?.mints[0]?._id,
                  assestType: 'marketplace',
                });
              }}
              disabled={props?.data?.mints?.length === 0 && true}
            >
              View Listing
            </button>
            <button
              className={styles.viewNFTBtn}
              onClick={() => setViewNFTModal(true)}
            >
              View 3D NFT
            </button>
          </div>
        )}
      </div>
      <NFTViewModal
        paintingId={paintingID}
        isOpen={viewNFTModal}
        handleModal={handleNFTViewModal}
        paintingName={paintingName}
        artistName={artistName}
      />
    </div>
  );
};

export default Card;
