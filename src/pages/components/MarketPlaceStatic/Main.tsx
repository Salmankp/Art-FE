import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import moment from 'moment';
import Countdown from 'react-countdown';
import { useHistory } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import { AuthenticationStateActions } from 'redux/slices/AuthenticationState';
import { groupPaintings, sortPaintings } from 'utils/helper';
import { getArtistNames, maticLogo } from '../../../utils/helpers';
import styles from '../styles/MarketPlaceStatic/Main.module.scss';
import EditionOverview from './EditionOverview';
import Tabs from './Tabs';
import ListModal from './ListModal';
import { currentDollarPrice } from '../../../utils/marketplace';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import {
  extraordinaryDrop,
  uniqueDrop,
  legendaryDrop,
  classicDrop,
  rareDrop,
  limitedDrop,
  artefyGradientLogo,
  commonDrop,
  redLogo,
  maticIcon,
} from '../../../assets/index';
import Loader from '../common/Loader';
import ModalsStyles from '../styles/dashboard/Modals.module.scss';
import NFTViewModal from '../Marketplace/NFTViewModal';
import {
  updateMarketPlaceStatus,
  updateUserPaintings,
} from '../dashboard/helper';

const rarityData = {
  Masterpiece: redLogo,
  Extraordinary: extraordinaryDrop,
  Unique: uniqueDrop,
  Legendary: legendaryDrop,
  Classic: classicDrop,
  Rare: rareDrop,
  Limited: limitedDrop,
  Common: commonDrop,
  Special: artefyGradientLogo,
};
export const maticLogos = (price) => {
  return (
    <>
      <span>
        {`${price} `}
        <Tooltip title="MATIC" placement="top" arrow>
          <img
            src={maticIcon}
            alt="logo"
            style={{ width: '25px', height: '22px' }}
          />
        </Tooltip>
      </span>
    </>
  );
};

const commissionPercentage = 10;
function makeURLDeicatated(imgURL: string) {
  if (imgURL)
    return imgURL.replace(
      'https://gateway.pinata.cloud/ipfs/',
      'https://artefy_gateway.mypinata.cloud//ipfs/',
    );
}

const StaticCard: React.FC<{
  purchasePrice: string;
  purchaseDate: string;
}> = ({ purchasePrice, purchaseDate }) => {
  return (
    <div style={{ width: '100%' }}>
      <div className={styles.textRow}>
        <div>
          <span className={styles.purchaseText}>Purchase Price: </span>
          <span className={styles.dollarText}>{purchasePrice}</span>
        </div>
        <div>
          <span className={styles.purchasebig}>Purchase Date: </span>
          <span className={styles.purchasebig}>
            {purchaseDate.length > 0 &&
              moment(purchaseDate).format('DD MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  );
};
const CollectionSolo: React.FC<{
  paintingDetails: any;
  isOwnerPainting: boolean;
  editionDetails: any;
  onSubmitBid: any;
  onViewCurrentAuction: any;
  onBuyNowPress: any;
  unlistNft: () => void;
  loading: boolean;
  walletType: any;
}> = ({
  paintingDetails,
  isOwnerPainting,
  editionDetails,
  onSubmitBid,
  onViewCurrentAuction,
  onBuyNowPress,
  unlistNft,
  loading,
  walletType,
}) => {
  const [amount, setAmount] = useState<any>();
  const [currentMaticPrice, setCurrentMaticPrice] = useState('');

  const isLoggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );

  const userDetails = useAppSelector(
    (state) => state.AuthenticationState.userDetails,
  );

  useEffect(() => {
    (async () => {
      const price = await currentDollarPrice();
      setCurrentMaticPrice(price);
    })();
  });
  const maticCryptoPrice = paintingDetails?.detail?.sale?.cryptoPrice || '';
  const paintingOwnedMints = paintingDetails?.ownedMint?.length || '';
  const paintingCryptoPrice = paintingDetails?.paintingID?.cryptoPrice || '';
  const paintingForm = paintingDetails?.paintingFrom || '';
  const getPrice = () => {
    if (paintingOwnedMints > 0 && maticCryptoPrice > 0) {
      return maticLogos(maticCryptoPrice);
    }
    if (+paintingCryptoPrice > 0) {
      return maticLogos(paintingCryptoPrice);
    }
    if (paintingForm) {
      return paintingForm;
    }
    return 'N/A';
  };

  const price = getPrice();
  const editionData: any[] = [];

  const maticFloorPrice = editionDetails?.floorPrice;
  const maticlastSaleValue = editionDetails?.lastSaleValue;
  const maticRangeFloorPrice = editionDetails.floorPrice;
  const maticListedBetween = editionDetails?.listedBetween;
  const maticRange = `${maticRangeFloorPrice} - ${maticListedBetween}`;

  paintingDetails?.detail?.paintingID?.dropDate &&
    editionData.push({
      title: 'Drop Date',
      value: paintingDetails?.detail?.paintingID?.dropDate
        ? new Date(paintingDetails?.detail?.paintingID?.dropDate).toDateString()
        : 'N/A',
      // new Date(
      //   paintingDetails?.detail?.paintingID?.dropDate === null
      //     ? 'N/A'
      //     : paintingDetails?.detail?.paintingID?.dropDate,
      // ).toDateString(),
    });

  editionData.push({
    title: 'Original Price',
    value:
      paintingDetails?.detail?.paintingID?.paintingFrom === 'crate'
        ? 'Crate'
        : price,
  });
  paintingDetails?.detail?.marketplace?.lastSaleDate &&
    editionData.push({
      title: 'Last Sale Date ',
      value: new Date(
        paintingDetails?.detail?.marketplace?.lastSaleDate,
      ).toDateString(),
    });

  editionDetails?.floorPrice &&
    editionData.push({
      title: 'Floor price ',
      value: maticLogo(maticFloorPrice.toFixed(2)) || 'N/A',
    });

  editionDetails?.lastSaleValue &&
    editionData.push({
      title: 'Last Sale Value',
      value: maticLogo(maticlastSaleValue.toFixed(2)) || 'N/A',
    });

  editionDetails?.listedBetween !== 0 &&
    editionDetails?.listedBetween !== editionDetails.floorPrice &&
    editionData.push({
      title: 'Listed Range ',
      value: maticLogo(maticRange) || 'N/A',
    });
  const history: any = useHistory();
  const [listModal, setListModal] = useState(false);
  const [viewNFTModal, setViewNFTModal] = useState(false);
  const isAuctionActive = paintingDetails?.detail?.auction?.active || false;
  const paintingImage = paintingDetails?.detail?.paintingID?.image || '';
  const paintingPreviewImage =
    paintingDetails?.detail?.paintingID?.previewImage ||
    paintingDetails?.detail?.paintingID?.previewUrl;
  const paintingName = paintingDetails?.detail?.paintingID?.name || '';
  const paintingGenre = paintingDetails?.detail?.paintingID?.genre || '';
  const paintingCollectionName =
    paintingDetails?.detail.paintingID?.theme?.name || '';
  const paintingRarity = paintingDetails?.detail?.paintingID?.rarity || '';
  const aboutPainting = paintingDetails?.detail?.paintingID?.about || '';
  const paintingDescription =
    paintingDetails?.detail?.paintingID?.description || '';
  const paintingArtistBio = paintingDetails?.detail?.paintingID?.artists || [];
  const artistName = getArtistNames(paintingDetails?.artists) || '';
  const mintBuyNowPrice = (
    paintingDetails?.detail?.marketplace?.price || 0
  ).toFixed(2);
  const mintBuyNowPriceMatic = (
    paintingDetails?.detail?.marketplace?.cryptoPrice || 0
  ).toFixed(2);
  const mintNumber = paintingDetails?.detail?.num || '';
  const mintCurrentOwnerName =
    paintingDetails?.detail?.currentBuyer?.username || '';
  const mintPurchasedDate =
    paintingDetails?.ownedMint.length > 0
      ? paintingDetails?.detail?.updatedAt || ''
      : ''; // need review
  const currentBidPrice = (
    +paintingDetails.detail?.currentAuctionBid?.price ||
    +paintingDetails.detail?.auction?.startingBidPriceUSD
  ).toFixed(2);
  const isMarketplaceActive = paintingDetails?.detail?.marketplace?.active;

  const paintingID = paintingDetails?._id;

  const commission = (mintBuyNowPrice * (commissionPercentage / 100)).toFixed(
    2,
  );

  const commissionMatic = (
    mintBuyNowPriceMatic *
    (commissionPercentage / 100)
  ).toFixed(2);
  const handleNFTViewModal = (isOpen: boolean) => {
    setViewNFTModal(isOpen);
  };
  const timer = ({ hours, minutes, seconds }) => {
    // Render a countdown
    return (
      <span>
        {hours}
        <span>h</span>
        {minutes}
        <span>m</span>
      </span>
    );
  };

  const loginToBuyHandler = () => {
    history.push('/auth');
  };

  const ownerHandler = () => {
    if (isLoggedIn && isOwnerPainting) {
      return <div className={styles.assetText}>You own this asset</div>;
    }
    return (
      <div className={styles.assetText}>
        {mintCurrentOwnerName || 'current buyer not available'}
      </div>
    );
  };
  const userPaintings = useAppSelector(
    (state) => state.AuthenticationState.userPaintings,
  );
  const dispatch = useAppDispatch();
  const handleReact = (value: boolean, input: any) => {
    if (value) {
      const Badges = [...userPaintings.paintings];
      const list = updateUserPaintings(Badges);

      const result = updateMarketPlaceStatus(
        list,
        paintingDetails.detail,
        input,
      );

      dispatch(
        AuthenticationStateActions.set_userPaintings(
          groupPaintings(
            sortPaintings(
              { ...userPaintings, paintings: result.updateListItem },
              'price',
            ),
          ),
        ),
      );
    } else {
      setListModal(false);
    }
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.first}>
        <div className={styles.img}>
          {paintingDetails.detail?.paintingID?.filetype !== 'MP4' ? (
            <img src={paintingImage} alt="img" />
          ) : (
            <ReactPlayer
              url={paintingImage}
              playing
              loop
              controls={false}
              muted
              width="100%"
              height="100%"
            />
          )}
        </div>
        <div className={ModalsStyles.actions}>
          <button
            onClick={() => setViewNFTModal(true)}
            className={ModalsStyles.listButton}
          >
            View 3D NFT
          </button>
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.topcontainer}>
          <div className={styles.titlewrap}>
            <div className={styles.title1}>
              {paintingDetails?.artists?.name || ''}
            </div>
            <div className={styles.title3}>
              {paintingDetails?.detail?.paintingID?.artists &&
                paintingDetails?.detail?.paintingID?.artists
                  ?.map(
                    (artist) =>
                      artist.name.charAt(0).toUpperCase() +
                      artist.name.slice(1),
                  )
                  .join(', ')}
            </div>
            <div className={styles.title2}>{paintingName}</div>
            <div className={styles.title3}>{paintingCollectionName}</div>
            <div className={styles.title4}>{paintingGenre}</div>
          </div>
          <div className={styles.badgeswrap}>
            <div className={styles.badge1}>
              <img src={rarityData[paintingRarity]} alt="Logo" />
              {paintingRarity}
            </div>
          </div>
        </div>
        <div className={styles.tabs}>
          <Tabs
            aboutTheArtWork={aboutPainting}
            aboutTheNFT={paintingDescription}
            aboutTheArtist={paintingArtistBio}
            aboutTheCollection={paintingCollectionName}
          />
        </div>

        <div className={styles.overviewwrap}>
          <div className={styles.oeditionline}>
            <div className={styles.oeditions}>All Editions Overview</div>
          </div>
          <div className={styles.detailwrap}>
            <div className={styles.editionOverview}>
              <EditionOverview editionDetail={editionData} />
            </div>
            <div className={styles.dropCard}>
              <div className={styles.prt}>
                <div className={styles.ownerBatch}>
                  <div className={styles.avatarRow}>
                    <div className={styles.avatarWrap}>
                      <div className={styles.avatarText}>
                        <div className={styles.ownText}>Owner</div>
                        {ownerHandler()}
                      </div>
                    </div>
                    <div>
                      <div className={styles.rightText}>{mintNumber || ''}</div>
                      <span className={styles.rightSmall}>
                        {`/${paintingDetails?.ownedMint.length || ' '}`}
                      </span>
                    </div>
                  </div>
                  <div className={styles.rowWrapper}>
                    {!isMarketplaceActive && !isAuctionActive && (
                      <StaticCard
                        purchasePrice={
                          paintingDetails?.ownedMint?.length > 0 &&
                          paintingDetails.paintingFrom === 'crate'
                            ? 'Crate'
                            : price
                        }
                        purchaseDate={
                          mintPurchasedDate.length > 0
                            ? new Date(mintPurchasedDate).toDateString() || ''
                            : ''
                        }
                      />
                    )}
                    {(isMarketplaceActive || isAuctionActive) && (
                      <>
                        <div className={styles.tagWrap}>
                          <span style={{ fontSize: '1rem' }}>Price:</span>
                          <span
                            style={{
                              fontSize: '28px',
                              fontWeight: 700,
                              lineHeight: '32px',
                            }}
                          >
                            {mintBuyNowPrice ? ` $${mintBuyNowPrice}` : ''}
                          </span>
                          &nbsp;
                          <span style={{ fontSize: '31px' }}>/</span>
                          &nbsp;
                          <span
                            style={{
                              fontSize: '30px',
                              fontWeight: 700,
                              lineHeight: '32px',
                            }}
                          >
                            {mintBuyNowPriceMatic
                              ? `${mintBuyNowPriceMatic} `
                              : ''}
                          </span>
                          <span
                            style={{
                              fontSize: '18px',
                              fontWeight: 400,
                            }}
                          >
                            {mintBuyNowPriceMatic ? maticLogos('') : ''}
                          </span>
                          <div
                            style={{
                              fontSize: '14px',
                              fontWeight: 400,
                              marginTop: '10px',
                            }}
                          >
                            Artist Royalties & Marketplace Fee:
                          </div>
                          <span style={{ fontSize: '.9rem', fontWeight: 400 }}>
                            {commission ? `$${commission} /` : ''}
                            {commissionMatic ? maticLogo(commissionMatic) : ''}
                          </span>
                        </div>
                        {!isOwnerPainting && (
                          <div>
                            {loading && (
                              <>
                                <Loader />
                                <h3
                                  style={{
                                    color: 'white',
                                    textAlign: 'center',
                                  }}
                                >
                                  Please wait...
                                </h3>
                              </>
                            )}
                            {currentMaticPrice && (
                              <div className={styles.currentPriceWrap}>
                                <div style={{ paddingTop: '10px' }}>
                                  <strong>Current matic price:</strong>
                                </div>
                                <span>{` $${currentMaticPrice}`}</span>
                              </div>
                            )}
                            {!loading && isLoggedIn && userDetails?.success && (
                              <>
                                <button
                                  onClick={() => {
                                    onBuyNowPress(isAuctionActive);
                                  }}
                                  className={styles.buyButton}
                                >
                                  Buy It Now
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className={styles.buttonsWrap}>
                    {isMarketplaceActive &&
                      isOwnerPainting &&
                      !isAuctionActive &&
                      userDetails?.success && (
                        <>
                          {loading && (
                            <>
                              <Loader />
                              <h3
                                style={{ color: 'white', textAlign: 'center' }}
                              >
                                Unlist NFT from marketplace please wait...
                              </h3>
                            </>
                          )}
                          {!loading && isLoggedIn && (
                            <button
                              onClick={() => unlistNft()}
                              className={styles.marketplace}
                            >
                              Unlist from Marketplace
                            </button>
                          )}
                        </>
                      )}
                    {!isMarketplaceActive &&
                      isOwnerPainting &&
                      !isAuctionActive &&
                      userDetails?.success && (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <button
                            onClick={() => {
                              setListModal(true);
                            }}
                            className={styles.marketplace}
                          >
                            List To Marketplace
                          </button>
                        </div>
                      )}
                    {!isLoggedIn && (
                      <button
                        className={styles.marketplace}
                        onClick={loginToBuyHandler}
                      >
                        Login to buy
                      </button>
                    )}
                  </div>
                  {isAuctionActive && (
                    <>
                      <div className={styles.bidRowWrapper}>
                        <div>
                          <div className={styles.currentBid}>
                            <div>Current Bid</div>
                            <div>
                              {currentBidPrice && `$ ${currentBidPrice}`}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className={styles.currentBid}>
                            <div className={styles.endWrap}>Ends:</div>
                            <div className={styles.timeWrap}>
                              <Countdown
                                date={
                                  new Date(
                                    paintingDetails.detail?.auction?.endTime,
                                  )
                                }
                                renderer={timer}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isOwnerPainting && (
                        <div className={styles.rowWrapper}>
                          <div>
                            <div>
                              <input
                                value={amount}
                                required
                                name="subj"
                                type="number"
                                className={styles.amountInput}
                                placeholder="$ Amount"
                                onChange={(e) => setAmount(e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <div className={styles.endBid}>
                              <div
                                className={styles.bidBtn}
                                onClick={() => onSubmitBid(amount)}
                              >
                                Bid
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className={styles.buttonsWrap}>
                        <button
                          onClick={() => {
                            onViewCurrentAuction();
                          }}
                          className={styles.auction}
                        >
                          View Current Auction
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ListModal
        isOpen={listModal}
        walletType={walletType}
        paintingPreviewImg={paintingPreviewImage}
        paintingPrice={paintingDetails?.price}
        paintingName={paintingName}
        artistNames={getArtistNames(paintingDetails?.artists)}
        collection={paintingCollectionName}
        num={paintingDetails?.detail?.num}
        totalNum={editionDetails?.totalMints}
        tokenId={paintingDetails?.detail?.tokenId}
        mintId={paintingDetails?.detail?._id}
        handleModal={handleReact}
        toggleModal={setListModal}
        data={paintingDetails.detail}
      />
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

export default CollectionSolo;
