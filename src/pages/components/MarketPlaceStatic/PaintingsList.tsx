import React, { Fragment, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { CircularProgress, Box as MBox } from '@material-ui/core';
import styles from '../styles/MarketPlaceStatic/FrazettaGrid.module.scss';
import CardStyles from '../styles/Marketplace/Card.module.scss';
import {
  redLogo,
  extraordinaryDrop,
  uniqueDrop,
  legendaryDrop,
  classicDrop,
  rareDrop,
  limitedDrop,
  commonDrop,
  noImageAvailable,
} from '../../../assets/index';
import NFTViewModal from '../Marketplace/NFTViewModal';
import { useAppSelector } from '../../../redux/hooks';
import CardOverlay from '../Marketplace/CardOverlay';
import { getArtistNames } from '../../../utils/helpers';
import listOfOwnedMints from '../Marketplace/helpers/ListOfOwnedMints';
import getOwnPaintingsNotListed from '../Marketplace/helpers/GetOwnPaintingsNotListed';

const MEDIA = {
  GLTF: '3D Hologram',
  GIF: 'GIF',
  JPG: 'Image',
  MP4: 'Video',
};

const rarityIcon = {
  Unique: uniqueDrop,
  Legendary: legendaryDrop,
  Extraordinary: extraordinaryDrop,
  Masterpiece: redLogo,
  Classic: classicDrop,
  Rare: rareDrop,
  Limited: limitedDrop,
  Common: commonDrop,
};

const Card: React.FC<{
  item: any;
  onItemClick: any;
  onViewNFT: any;
  loggedInUser: any;
}> = ({ item, onItemClick, loggedInUser, onViewNFT }) => {
  const [image, setImage] = useState(item?.image);
  const lengthChecker = (data: string, length: number) => {
    return data.length > length ? `${data.substring(0, length)}...` : data;
  };

  const getItemBuyTitle = (auctionAvailable, buyNowAvailable) => {
    if (auctionAvailable) return 'Auction';
    if (buyNowAvailable) return 'Buy Now';
    if (auctionAvailable && buyNowAvailable) return 'Buy Now + Auction';
  };

  const userOwnedPaintings = useAppSelector(
    (state) => state.AuthenticationState.userPaintings,
  );

  const getFormatedDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString('en', {
      month: 'long',
      timeZone: 'UTC',
      timeZoneName: 'long',
    });
    return `${newDate.getDate()} ${
      month.split(',')[0]
    } ${newDate.getFullYear()}`;
  };

  const getArtistName = (item) => {
    if (item?.artists?.length > 0) return item?.artists[0]?.name;
    return '';
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

  const handleImageError = () => {
    setImage(noImageAvailable);
  };

  const displayOwnedLabel = (mints: any[], loggedInUserId: string): boolean => {
    return mints?.some((item) => item.currentBuyer === loggedInUserId);
  };

  const displayOwnedMints = (mints: any[], loggedInUserId: string): any[] => {
    return mints?.filter((item) => item?.currentBuyer === loggedInUserId);
  };

  const displayAllMints = (mints: any[]) => {
    let ids = '';
    mints?.forEach((item, i) => {
      if (i < 7) {
        if (i < 1) ids += `#${item.num}`;
        if (i > 0) ids += `, #${item.num}`;
        if (i > 5) ids += `, and more`;
      }
    });
    return ids;
  };
  const ownedMintsNotListed = getOwnPaintingsNotListed(
    item?.mints,
    userOwnedPaintings.paintings,
  );

  const ownedMintsListed = displayOwnedMints(item?.mints, loggedInUser?.id);

  const ownedMintsNotListedString = listOfOwnedMints(ownedMintsNotListed, 5);
  const ownedMintsListedString = listOfOwnedMints(ownedMintsListed, 5);
  const allMintsNames = listOfOwnedMints(item?.mints, 5);

  const overlayData = {
    isAssetOwned: ownedMintsNotListed?.length > 0,
    name: lengthChecker(item?.name, 30),
    dropDate: getFormatedDate(item?.dropDate),
    orignalPrice: lengthChecker(`${(+item?.minPrice || 0).toFixed(2)}`, 20),
    latestSale: lengthChecker(
      `${(+item?.startingFromPrice || 0).toFixed(2)}`,
      20,
    ),
    floorPrice: lengthChecker(`${(0).toFixed(2)}`, 20),
    rarityIcon: rarityIcon[item?.rarity],
    rarity: item?.rarity,
    allMintsNames,
    mintsCount: item?.mints?.length,
    ownedLabel: displayOwnedLabel(item?.mints, loggedInUser?.id),
    ownedMintsNotListed,
    ownedMintsListed,
    editionsCount: lengthChecker(`${item?.mints?.length} Editions`, 12),
    ownedMintsNotListedString,
    ownedMintsListedString,
  };

  const paintingId = item?._id || '';
  const paintingName = item?.name || '';
  const artistName = getArtistName(item?.artists || '');
  const media = item?.image || '';
  const artistNames = getArtistNames(item?.artists);
  const collectionName = item?.theme?.name || '';
  const rarityLogo = rarityIcon[item?.rarity] || '';
  const rarity = item?.rarity || '';
  const mediaType = MEDIA[item?.filetype];
  const mintsCount = item?.mintsCount || 0;
  const buyNowTitle = getItemBuyTitle(
    item?.auctionAvailable,
    item?.buyNowAvailable,
  );
  const startingFromPrice = (+item?.startingFromPrice).toFixed(2) || '';

  return (
    <div
      className={`${CardStyles.CardItem} ${
        ownedMintsListed?.length > 0 && CardStyles.activeOrange
      } ${ownedMintsNotListed?.length > 0 && CardStyles.activeGreen}`}
    >
      <div className={`${CardStyles.mainImgWrap}`}>
        <div className={CardStyles.treasureImg}>
          <div className={CardStyles.rarityContainer}>
            <img src={rarityLogo} alt={rarity} />
          </div>
          <p>{rarity}</p>
        </div>
        {mediaType !== MEDIA.MP4 ? (
          <img
            className={CardStyles.img}
            src={image}
            alt={paintingName}
            onError={handleImageError}
          />
        ) : (
          <div className={CardStyles.player}>
            <ReactPlayer url={media} playing loop controls={false} muted />
          </div>
        )}
        <CardOverlay data={overlayData} onToggleVideo={(action) => {}} />
      </div>
      <div className={CardStyles.dataContainer}>
        <div className={CardStyles.dataWrap}>
          <div className={CardStyles.data}>
            <p
              className={CardStyles.artistNames}
              dangerouslySetInnerHTML={{
                __html: getAllArtists(item?.artists),
              }}
            />
            <p className={CardStyles.availableMints}>
              {mintsCount}
              Listing
            </p>
          </div>
          <p className={CardStyles.artist}>{paintingName}</p>
        </div>
        <div className={CardStyles.priceSection}>
          <p className={CardStyles.leftText}>
            {lengthChecker(collectionName, 17)}
          </p>
          <div className={CardStyles.rightContainer}>
            <p>from</p>
            <p className={CardStyles.priceText}>
              <span>$</span>
              {startingFromPrice}
            </p>
          </div>
        </div>
        <hr />
        <div className={CardStyles.favouritesSection}>
          <div className={CardStyles.leftSection} />
          <div className={CardStyles.rightSection}>{buyNowTitle}</div>
        </div>
        <div className={CardStyles.btnContainer}>
          <button
            className={CardStyles.viewListBtn}
            onClick={() => onItemClick(item)}
          >
            View Listing
          </button>
          <button
            className={CardStyles.viewNFTBtn}
            onClick={() => onViewNFT({ isOpen: true, paintingId })}
          >
            View NFT
          </button>
        </div>
      </div>
    </div>
  );
};

const PaintingsList: React.FC<{
  paintings: any;
  paintingDetails: any;
  paintingName: any;
  artistName: any;
  onClick: any;
  isListByCollection: boolean;
  isListByArtist: boolean;
  isLoading: boolean;
  mintExcluded: string;
}> = ({
  paintings,
  paintingDetails,
  paintingName,
  artistName,
  onClick,
  isListByCollection,
  isListByArtist,
  isLoading,
  mintExcluded,
}) => {
  const [viewNFTModal, setViewNFTModal] = useState(false);
  const [viewNFTId, setViewNFTId] = useState('');
  const loggedInUser = useAppSelector(
    (state) => state?.AuthenticationState?.userGeneralInfo?.userInfo,
  );
  const [filteredPaintings, setFilteredPaintings] = useState([]);
  useEffect(() => {
    setFilteredPaintings(
      // paintings,
      paintings?.mints?.filter((mint) => mint._id !== mintExcluded),
    );
  }, [paintings]);

  const handleItemClick = (item) => {
    onClick({ isListByArtist, isListByCollection, isItemClick: true, item });
  };

  const handleViewNFT = ({ isOpen, paintingId }) => {
    setViewNFTId(paintingId);
    setViewNFTModal(isOpen);
  };

  const handleNFTModal = (isOpen: boolean) => {
    setViewNFTModal(isOpen);
  };

  return (
    <div className={styles.wrap}>
      {isLoading && (
        <MBox display="flex" justifyContent="center">
          <CircularProgress style={{ width: '2.5rem', height: '2.5rem' }} />
        </MBox>
      )}
      {!isLoading && filteredPaintings?.length > 0 && (
        <Fragment key="1">
          <div className={styles.headingwrap}>
            <div className={styles.line} />
            <div className={styles.heading}>
              More from
              {paintingDetails?.name}
            </div>
            <div className={styles.line} />
          </div>
          <div className={CardStyles.paintingListWrap}>
            <div className={CardStyles.flexCardContainer}>
              {filteredPaintings?.map((item, i) => (
                <Card
                  key={i}
                  item={item}
                  onItemClick={handleItemClick}
                  onViewNFT={handleViewNFT}
                  loggedInUser={loggedInUser}
                />
              ))}
            </div>
          </div>
          <div className={styles.btnlisting}>
            <button
              onClick={() =>
                onClick({
                  isListByArtist,
                  isListByCollection,
                  isItemClick: false,
                })
              }
            >
              See all
              {paintingDetails?.name}
              Listings
            </button>
          </div>
          <NFTViewModal
            paintingId={viewNFTId}
            isOpen={viewNFTModal}
            handleModal={handleNFTModal}
            paintingName={paintingName}
            artistName={artistName}
          />
        </Fragment>
      )}
    </div>
  );
};

export default PaintingsList;
