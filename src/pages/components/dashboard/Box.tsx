import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { MarketplaceAPI } from 'api/marketplaceAPI';
import { useHistory } from 'react-router-dom';
import { error, success } from 'utils/toast';
import QuickLinkBtn from 'pages/components/dashboard/components/quickLinkBtn';
import { Box as MBox } from '@material-ui/core';
import { useAppSelector } from 'redux/hooks';
import Loader from '../common/Loader';
import {
  redLogo,
  extraordinaryDrop,
  uniqueDrop,
  legendaryDrop,
  classicDrop,
  rareDrop,
  limitedDrop,
  artefyGradientLogo,
  commonDrop,
  noImageAvailable,
} from '../../../assets';
import styles from '../styles/dashboard/Grid.module.scss';
import CardStyles from '../styles/Marketplace/Card.module.scss';
import { getArtistNames } from '../../../utils/helpers';
import CardOverlay from '../Marketplace/CardOverlay';
import getFormatedDate from '../Marketplace/helpers/GetFormatedDate';
import listOfOwnedMintsInNumArray from '../Marketplace/helpers/ListOfOwnedMintsInNumArray';
import listOfOwnedMints from '../Marketplace/helpers/ListOfOwnedMints';
import getLatestSalePrice from '../Marketplace/helpers/GetLatestSalePrice';
import CancelListModal from './CancelListModal';

const rarityData = {
  Masterpiece: {
    img: redLogo,
    styles: styles.txt2,
  },
  Extraordinary: {
    img: extraordinaryDrop,
    styles: styles.txtExtraordinary,
  },
  Unique: {
    img: uniqueDrop,
    styles: styles.txtUnique,
  },
  Legendary: {
    img: legendaryDrop,
    styles: styles.txtLegendary,
  },
  Classic: {
    img: classicDrop,
    styles: styles.txtClassic,
  },
  Rare: {
    img: rareDrop,
    styles: styles.txtRare,
  },
  Limited: {
    img: limitedDrop,
    styles: styles.txtLimited,
  },
  Common: {
    img: commonDrop,
    styles: styles.txtCommon,
  },
  Special: {
    img: artefyGradientLogo,
    styles: styles.txtClassic,
  },
};
const NFTBoxRarity: React.FC<{
  rarity: any;
}> = ({ rarity }) => {
  if (!rarity || !rarityData[rarity])
    return (
      <>
        <div className={styles.badgewrap2}>
          <div className={styles.logoo2}>
            <img src={rarityData.Common.img} alt={rarityData.Common.img} />
          </div>
          <div className={rarityData.Common.styles}>Common</div>
        </div>
      </>
    );
  return (
    <>
      <div className={styles.badgewrap2}>
        <div className={styles.logoo2}>
          <img src={rarityData[rarity].img} alt={rarityData[rarity].img} />
        </div>
        <div className={rarityData[rarity].styles}>{rarity}</div>
      </div>
    </>
  );
};
const MinimalInfo: React.FC<{
  collection: string;
  title: string;
  name: string | null;
}> = ({ collection, title, name }) => {
  return (
    <>
      <div className={styles.detailMinimalInfo}>
        {name && (
          <span className={styles.nameWrap}>
            <>{name}</>
          </span>
        )}
        <br />
        <span className={styles.titleWrap}>
          <>{title}</>
        </span>
        <br />
        <span className={styles.collectionWrap}>
          <>{collection}</>
        </span>
      </div>
    </>
  );
};
const PaintingOverlay: React.FC<{
  name: string;
  description: string;
  artistName: string | null;
  collection: string;
  genre: string;
  type: string;
  rarity: any;
  edition: string;
  owned: any;
}> = ({
  name,
  description,
  artistName,
  collection,
  genre,
  rarity,
  type,
  edition,
  owned,
}) => {
  return (
    <>
      <div className={owned?.ownedMints ? styles.greenOverlay : styles.overlay}>
        <div className={styles.first}>
          {owned?.ownedMints && (
            <div
              style={{
                color: '#33eb91',
                textAlign: 'center',
                fontSize: '13px',
              }}
            >
              You own this asset.
            </div>
          )}
          <div className={styles.namedesc}>
            <div className={styles.maintitle}>Name</div>
            <div className={styles.namedescwrap}>
              <div className={styles.name}>
                <>{name || ''}</>
              </div>
              <div className={styles.desc}>
                <>{description.substring(0, 200)}</>
              </div>
            </div>
          </div>
          {/* Repeatitive Code that will be eliminated while using API */}
          {artistName && (
            <div className={styles.titlevalwrap}>
              <div className={styles.title}>Artist</div>
              <div className={styles.val}>
                <>{artistName || ''}</>
              </div>
            </div>
          )}
          {collection && (
            <div className={styles.titlevalwrap}>
              <div className={styles.title}>Collection</div>
              <div className={styles.val}>
                <>{collection || ''}</>
              </div>
            </div>
          )}
          {genre && (
            <div className={styles.titlevalwrap}>
              <div className={styles.title}>Genre</div>
              <div className={styles.val}>
                <>{genre || ''}</>
              </div>
            </div>
          )}
          {type && (
            <div className={styles.titlevalwrap}>
              <div className={styles.title}>Type</div>
              <div className={styles.val}>
                <>{type || ''}</>
              </div>
            </div>
          )}
        </div>
        {edition && (
          <div className={styles.second}>
            <NFTBoxRarity rarity={rarity} />
            <div className={styles.holo}>
              {edition || ''}
              <span>&nbsp;Editions</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
function makeURLDeicatated(imgURL) {
  return imgURL?.replace(
    'https://gateway.pinata.cloud/ipfs/',
    'https://artefy_gateway.mypinata.cloud//ipfs/',
  );
}
type BoxProps = {
  mint: any;
  showMinimalInfo: boolean;
  // buttonColor?: boolean;
  // showRiseOverlay?: boolean;
  isUnList: boolean;
  owned: any;
  isDashboard?: boolean;
  isMyAsset?: boolean;
  isMarketplaceListings?: boolean;
  handleReact?: (data: any) => void;
};
const getFileTypeString = (type: string): string => {
  const types = {
    GLTF: '3D Statue',
    MP4: 'Animated Cinemagraph',
    GIF: 'Animated Cinemagraph',
    PNG: 'Static Artwork',
  };
  return types[type];
};
function Box(props: BoxProps) {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelListModal, setCancelListModal] = useState<boolean>(false);
  const item = props.mint;
  const {
    showMinimalInfo,
    isUnList,
    isDashboard,
    isMarketplaceListings,
    isMyAsset,
    owned,
  } = props;

  const [isBuffering, setIsBuffering] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [thumbnail, setThumbnail] = useState<any>(
    item?.paintingID?.previewImage || false,
  );
  const [image, setImage] = useState(
    makeURLDeicatated(item?.paintingID?.image),
  );

  const lengthChecker = (data: string, length: number) => {
    return data?.length > length ? `${data?.substring(0, length)}...` : data;
  };

  const userDetails = useAppSelector(
    (state) => state?.AuthenticationState?.userDetails,
  );

  const marketplacePrice = () => {
    if (item?.marketplace?.cryptoPrice > 0) {
      return `${item?.marketplace?.cryptoPrice?.toFixed(2)}`;
    }

    if (item?.marketplace?.price > 0) {
      return `$${item?.marketplace?.price}`;
    }
    return '';
  };

  const originalPrice = () => {
    if (item?.paintingID?.cryptPrice > 0) {
      return `${item?.paintingID?.cryptPrice.toFixed(2)}`;
    }
    if (item?.paintingID?.price > 0) {
      return `$${item?.paintingID?.price}`;
    }
    return '';
  };

  const latestSale = () => {
    const sortedItems = getLatestSalePrice(item.groupedListedMints || []);
    const latestSoldMint = sortedItems[0];
    if (latestSoldMint?.marketplace?.cryptPrice > 0) {
      return `${item?.marketplace?.cryptPrice.toFixed(2)}`;
    }
    if (latestSoldMint?.marketplace?.price > 0) {
      return `$${item?.marketplace?.price.toFixed(2)}`;
    }
    return '';
  };

  const getFloorPrice = () => {
    if (item?.groupedListedMints?.length > 0) {
      if (item?.groupedListedMints[0]?.marketplace?.cryptoPrice > 0) {
        return `${item?.groupedListedMints[0]?.marketplace?.cryptoPrice?.toFixed(
          2,
        )}`;
      }
      if (item?.groupedListedMints[0]?.marketplace?.price > 0) {
        return `$${item?.groupedListedMints[0]?.marketplace?.price?.toFixed(
          2,
        )}`;
      }
    }
    return (
      isMarketplaceListings &&
      (`${item?.marketplace?.cryptoPrice?.toFixed(2)}` ||
        `$${item?.marketplace?.price.toFixed(2)}`)
    );
  };

  const ownedMintsListedString =
    item?.groupedListedMints?.length > 0
      ? listOfOwnedMints(item?.groupedListedMints || [], 3)
      : '';
  const ownedMintsNotListedString =
    (item?.totalOwnedMints?.length > 0 &&
      listOfOwnedMintsInNumArray(item?.totalOwnedMints || [], 3)) ||
    '';

  const overlayData = {
    isAssetOwned: owned,
    name: lengthChecker(item?.paintingID?.name, 30),
    dropDate: getFormatedDate(item?.paintingID?.dropDate),
    orignalPrice: originalPrice() || marketplacePrice(),
    latestSale: latestSale(),
    rarityIcon: rarityData[item?.paintingID?.rarity]?.img,
    rarity: item?.paintingID?.rarity,
    mediaType: item?.paintingID?.filetype,
    floorPrice: getFloorPrice(),
    allMintsNames:
      (item?.group?.length > 0 && listOfOwnedMints(item.group || [], 3)) || '',
    listedMinst: item?.totalOwnedMints?.length || '',
    ownedMintsNotListedCount: item?.totalOwnedMints?.length,
    ownedMintsNotListedString,
    ownedMintsListedString,
    ownedMintsListedCount: item?.groupedListedMints?.length || 0,
    ownedLabel: false,
    editionsCount: lengthChecker(
      `${
        item?.paintingID?.mints?.length || item?.paintingID?.totalMints || 0
      } Editions`,
      12,
    ),
    listedPrice: marketplacePrice(),
  };
  const redirectUrl = (item) => {
    if (item?._id) {
      history.push(`/nft/${item?._id}`, {
        assestType: isMyAsset ? 'owned' : 'marketplace',
      });
    } else if (item?.paintingID?.mints?.length > 0) {
      history.push(`/nft/${item?.paintingID?.mints[0]?._id}`, {
        assestType: isMyAsset ? 'owned' : 'marketplace',
      });
    }
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

  const handleImageError = () => {
    setImage(noImageAvailable);
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
  const unlist = () => {
    setLoading(true);
    try {
      MarketplaceAPI.unListMint(
        item?._id,
        item?.marketplace?.itemId,
        item?.tokenId,
      )
        .then((res: any) => {
          if (res?.status === 200) {
            setLoading(false);
            success('Mint unlist successfully! ');
            props.handleReact && props.handleReact(props.mint);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          error(err.message);
        });
    } catch (err: any) {
      setLoading(false);
      error(err.message);
    }
  };

  return (
    <>
      <div
        className={`${styles.mainContainer} ${
          isMarketplaceListings && styles.activeOrange
        }`}
      >
        <div className={styles.row}>
          <div className={styles.item}>
            <div className={styles.paper}>
              <div className={owned?.ownedMints ? styles.image2 : styles.image}>
                <div
                  className={`${styles.imageContainer} ${CardStyles.mainImgWrap}`}
                >
                  <div />
                  {item?.paintingID?.filetype !== 'MP4' ? (
                    <img
                      src={image}
                      alt="img"
                      className={styles.main_image}
                      onError={handleImageError}
                    />
                  ) : (
                    <div className={`${styles.player}`}>
                      <>{renderBuffering(isPlay, isBuffering)}</>
                      <ReactPlayer
                        className={styles.videoWrap}
                        light={thumbnail}
                        url={item?.paintingID?.image}
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
                          setThumbnail(item?.paintingID?.previewImage);
                        }}
                      />
                    </div>
                  )}
                  {(owned?.ownedMints || item?.totalOwnedMints?.length > 0) && (
                    <span className={styles.ownedText}>
                      {`${
                        owned?.ownedMintsCount || item?.totalOwnedMints?.length
                      } Owned`}
                    </span>
                  )}
                  {isMarketplaceListings &&
                    item?.groupedListedMints?.length > 0 && (
                      <span className={styles.listedText}>
                        {`${item?.groupedListedMints?.length} Listed`}
                      </span>
                    )}
                  <div className={styles.treasureImg}>
                    <div className={styles.rarityContainer}>
                      <img
                        className={styles.rarityImg}
                        src={rarityData[item?.paintingID?.rarity]?.img}
                        alt={item?.paintingID?.rarity}
                      />
                    </div>
                    <p>{item?.paintingID?.rarity}</p>
                  </div>
                  {isDashboard && (
                    <CardOverlay
                      onToggleVideo={(action) => handleToggleVideo(action)}
                      data={overlayData}
                      isPlay={isPlay}
                      isDashboard={isDashboard}
                    />
                  )}
                  {!isDashboard && (
                    <PaintingOverlay
                      name={item?.paintingID?.name}
                      description={item?.paintingID?.description.substring(
                        0,
                        300,
                      )}
                      artistName={
                        item?.paintingID?.artists?.length
                          ? getArtistNames(item?.paintingID?.artists)
                          : null
                      }
                      collection={
                        item?.paintingID?.theme?.name ||
                        item?.paintingID?.collection?.name
                      }
                      genre={item?.paintingID?.genre}
                      type={getFileTypeString(item.paintingID.filetype)}
                      rarity={item?.paintingID?.rarity}
                      edition={item?.paintingID?.mints?.length || null}
                      owned={owned}
                    />
                  )}
                </div>
              </div>
              {showMinimalInfo ? (
                <MinimalInfo
                  name={
                    item?.paintingID?.artists?.length
                      ? getArtistNames(item?.paintingID?.artists)
                      : null
                  }
                  title={item?.paintingID?.name}
                  collection={
                    item?.paintingID?.theme?.name ||
                    item?.paintingID?.collection?.name
                  }
                />
              ) : (
                <div className={styles.details}>
                  {item?.paintingID?.artists && (
                    <span className={styles.upper}>
                      <>{getArtistNames(item?.paintingID?.artists)}</>
                    </span>
                  )}
                  <br />
                  {item?.paintingID?.name && (
                    <span className={styles.middle}>
                      <>{item?.paintingID?.name}</>
                    </span>
                  )}
                  <br />
                  {item?.paintingID?.theme?.name && (
                    <span className={styles.lower}>
                      <>{item?.paintingID?.theme?.name}</>
                    </span>
                  )}
                </div>
              )}
              <div className={styles.flexWrap}>
                {item?.num && (
                  <div className={styles.last}>
                    <div className={styles.value}>
                      <span>
                        <>
                          {ownedMintsNotListedString ||
                            ownedMintsListedString ||
                            `#${item?.num}`}
                        </>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              className={styles.viewNftButton}
              onClick={() => redirectUrl(item)}
            >
              View NFT
            </button>
            {!isUnList && isMyAsset && (
              <>
                <div>
                  <QuickLinkBtn item={item} classCss={styles.viewListButton} />
                </div>
              </>
            )}

            {!isUnList && isMarketplaceListings && (
              <>
                <div>
                  <button
                    className={styles.viewListButton}
                    onClick={function () {
                      setLoading(true);
                      item?.groupedListedMints?.length > 1
                        ? setCancelListModal(true)
                        : unlist();
                    }}
                  >
                    {loading ? 'Processing...' : 'Cancel Listing'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {!isUnList && isMarketplaceListings && (
        <CancelListModal
          isOpen={cancelListModal}
          walletType={userDetails?.data?.walletType}
          fileType={item?.paintingID?.filetype}
          paintingImage={item?.paintingID?.image}
          paintingPrice={item?.paintingID?.price}
          paintingName={item?.paintingID?.name}
          artistNames={getArtistNames(item?.paintingID?.artists || [])}
          collection={item?.paintingID?.theme?.name}
          num={item?.paintingID?.num}
          totalNum={item?.paintingID?.mints.length}
          tokenId={item?.tokenId}
          marketplaceItemId={
            item?.groupedListedMints[0]?.marketplace?.itemId || 0
          }
          mintId={item?._id}
          data={item}
          handleLoading={setLoading}
          handleReact={props.handleReact}
          toggleModal={setCancelListModal}
        />
      )}
    </>
  );
}
export default Box;
