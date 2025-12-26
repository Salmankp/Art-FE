import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { OwnedPaintings, availablePaintings } from 'utils/helper';
import { useAppDispatch } from 'redux/hooks';
import { ErrorStateActions } from 'redux/slices/ErrorState';
import { SuccessStateActions } from 'redux/slices/SuccessState';
import TopNav from './components/MarketPlaceStatic/TopNav';
import MainNav from './components/Navbar/MainNav';
import Footer from './components/MarketPlaceStatic/Footer';
import Main from './components/MarketPlaceStatic/Main';
import Grid from './components/MarketPlaceStatic/Grid';
import { MarketplaceAPI } from '../api/marketplaceAPI';
import { addBidToBlock, dollarsToMatic, buyNow } from '../utils/auction';
import { error, success } from '../utils/toast';
import { useAppSelector } from '../redux/hooks';
import AuctionListing from './components/MarketplaceAuctionListing/AuctionListing';
import { OATAuctionProxyAddress } from '../utils/config';
import { buyNowMarketplace } from '../utils/marketplace';
import styles from './components/styles/MarketPlaceStatic/Grid.module.scss';

const MarketplaceStatic: React.FC = () => {
  // use in future

  // const [paintingsByCollection, setPaintingsByCollection] = useState<any>();
  // const [paintingsByArtists, setPaintingsByArtists] = useState<any>();
  const [paintingDetails, setPaintingDetails] = useState<any>();
  const [editionOverViewDetails, setEditionDetails] = useState('');

  // use in future
  // const [isPaintingsByArtistsLoading, setIsPaintingsByArtistsLoading] =
  //   useState(false);
  // const [isPaintingsByCollectionLoading, setIsPaintingsByCollectionLoading] =
  //   useState(false);
  const [isOwnerPainting, setIsOwnerPainting] = useState(false);
  const [bidHistory, setBidHistory] = useState([]);
  const [showBidHistory, setBidHistoryView] = useState(false);
  const [mintId, setMintId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [assestType, setAssestType] = useState<string>('');
  const adminWalletAddress = process.env.REACT_APP_ADMIN_WALLET;

  const userDetails = useAppSelector(
    (state) => state?.AuthenticationState?.userDetails,
  );
  const userId = useAppSelector(
    (state) => state?.AuthenticationState?.userGeneralInfo?.userInfo.id,
  );
  const walletType = userDetails?.data?.walletType || '';
  const OwnedPainting = OwnedPaintings(
    assestType,
    paintingDetails?.ownedMint,
    userId,
  );
  const availablePainting = availablePaintings(
    assestType,
    paintingDetails?.ownedMint,
    userId,
  );

  const dispatch = useAppDispatch();

  const showErrorModal = (err: string) => {
    dispatch(ErrorStateActions.setErrorModal(true));
    dispatch(ErrorStateActions.setErrorMessage(err));
  };

  const showSuccessModal = (message: string) => {
    dispatch(SuccessStateActions.setSuccessModal(true));
    dispatch(SuccessStateActions.setSuccessMessage(message));
  };
  const getAllBidsHistory = async (mintId) => {
    try {
      const fetchedBidHistory = await MarketplaceAPI.getBidAuction(mintId);
      if (fetchedBidHistory.status === 200) {
        const bidHistory = fetchedBidHistory?.data?.data.auctionBidHistory;
        setBidHistory(bidHistory);
      }
    } catch (e) {
      console.log('Error while fetching bids History', e);
    }
  };

  const getPaintingDetails = async (paintingId, mintId) => {
    try {
      const fetchedPaintingDetails = await MarketplaceAPI.getPaintingDetails(
        paintingId,
        mintId,
      );
      console.log('---------', fetchedPaintingDetails.data);
      if (fetchedPaintingDetails.data.success === true) {
        const paintingDetails = fetchedPaintingDetails?.data;
        mintId ? setMintId(mintId) : setMintId(paintingDetails.detail._id);
        const paintinOwner =
          paintingDetails.detail.currentBuyer?.walletAddress ===
          userDetails?.data?.walletAddress;
        const ownedMintsArry = paintingDetails.ownedMint.filter((item) => {
          return (
            item?.currentBuyer?._id === userDetails?.data?._id &&
            item._id !== paintingDetails.detail._id &&
            // item?.marketplace?.active === false &&
            // item?.num !== paintingDetails?.detail?.num &&
            (item?.marketplace === undefined ||
              item?.marketplace?.active === false)
          );
        });
        if (paintingDetails?.detail?.paintingID)
          paintingDetails.detail.paintingID.group = [...ownedMintsArry];
        await getAllBidsHistory(mintId || paintingDetails?.mints[0]?._id);
        setIsOwnerPainting(paintinOwner);
        setPaintingDetails(paintingDetails);
        setEditionDetails(paintingDetails.editionOverview);

        // use in future

        // const paintingsByCollection =
        //   await MarketplaceAPI.getPaintingsOnDetailsPage(1, 4, {
        //     'filters[collections]':
        //       paintingDetails.detail.paintingID?.theme?._id,
        //   });
        // setPaintingsByCollection(paintingsByCollection);
        // if (paintingsByCollection) setIsPaintingsByCollectionLoading(false);
        //
        // if (paintingDetails?.detail?.paintingID.artists?.length > 0) {
        //   setIsPaintingsByArtistsLoading(true);
        //   const paintingsByArtists =
        //     await MarketplaceAPI.getPaintingsOnDetailsPage(1, 4, {
        //       'filters[artists]':
        //         paintingDetails?.detail?.paintingID?.artists?._id,
        //     });
        //   setPaintingsByArtists(paintingsByArtists);
        //   if (paintingsByArtists) setIsPaintingsByArtistsLoading(false);
        // }
      }
    } catch (e: any) {
      setError(true);
      console.log('Error while fetching Painting Details', e.message);
    }
  };

  const getFilteredPaintings = async (filters) => {
    await getPaintingDetails(filters.paintingID, filters.mintID);
  };

  const addBid = async (amount) => {
    if (!amount) {
      error('Enter the Bid amount');
    }
    try {
      // ---------  Add Bid to Blockchain ----------- //
      const auctionTokenId =
        paintingDetails?.mints[0]?.auction?.tokenId || undefined;
      const centsPrice = (amount * 100).toFixed(0);
      const maticPrice = await dollarsToMatic(amount);
      if (auctionTokenId) {
        const addBidToBlockchain = await addBidToBlock(
          auctionTokenId,
          maticPrice,
          centsPrice,
        );
        const blockReturnValues =
          addBidToBlockchain?.events?.AuctionBid?.returnValues;
        if (blockReturnValues?._index) {
          const mintId = paintingDetails?.mints[0]?._id;

          // ---------- Add Bid to DB -------- //
          await MarketplaceAPI.saveBid(mintId, amount, 'bid')
            .then(async () => {
              success('Bid Added! ');
              await getAllBidsHistory(mintId);
            })
            .catch((err) => {
              error(err.message);
            });
        }
      }
    } catch (err: any) {
      console.log('er', err);
      error(err.message);
    }
  };

  const buyNft = async () => {
    try {
      const mint = paintingDetails?.mints[0] || undefined;
      const nftTokenId = mint?.tokenId;
      console.log('nftTokenId', nftTokenId);
      console.log('OATAuctionProxyAddress', OATAuctionProxyAddress);

      // ------------ Get Admin Approval for Buy ------------//
      const adminApprovalToBuyResponse = await MarketplaceAPI.approveNFTToBuy(
        nftTokenId,
        OATAuctionProxyAddress,
      );
      console.log('adminApprovalToBuyResponse', adminApprovalToBuyResponse);
      if (adminApprovalToBuyResponse?.status === 200) {
        const approvalResponse = adminApprovalToBuyResponse?.data?.data;
        if (approvalResponse?.events?.Approval) {
          const auctionTokenId = mint?.auction?.tokenId || undefined;
          const nftOwnerAddress = mint?.currentBuyer.walletAddress;
          const maticPrice = mint?.cryptoPrice;
          if (mint && auctionTokenId && nftOwnerAddress) {
            // --------- Buy now on Block side --------- //
            const buyNowToBlockResults = await buyNow(
              auctionTokenId,
              nftTokenId,
              nftOwnerAddress,
              maticPrice,
            );
            if (buyNowToBlockResults?.events?.BuyNow) {
              // ------ Update DB Records ------- //
              const buyNowToDb = await MarketplaceAPI.buyNow(
                mint?._id,
                mint?.paintingID,
                maticPrice,
              );
              if (buyNowToDb?.status === 200) {
                showSuccessModal(`${buyNowToDb?.data?.message}`);
              }
            }
          }
        }
      }
    } catch (e) {
      console.log('Error while buying nft ----->', e);
    }
  };

  const history: any = useHistory();
  useEffect(() => {
    const mintId = history?.location?.state?.mintID
      ? history.location?.state?.mintID
      : window.location.pathname.substring(5);
    const paintingID = history.location?.state?.paintingID;
    setAssestType(history?.location?.state?.assestType);
    getPaintingDetails(paintingID, mintId);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history, paintingDetails]);

  const buyNftMarketplace = async () => {
    setLoading(true);
    try {
      const sellNft = await buyNowMarketplace(
        paintingDetails?.detail?.tokenId,
        paintingDetails?.detail?.marketplace?.cryptoPrice,
        paintingDetails?.detail?.marketplace?.itemId,
        adminWalletAddress,
        walletType,
      );

      if (sellNft?.events?.ItemSold?.returnValues) {
        const response: any = await MarketplaceAPI.mintTransfer(
          paintingDetails?.detail?._id,
          sellNft?.events?.ItemSold?.transactionHash,
        );
        if (response.status === 200) {
          setLoading(false);
          showSuccessModal('NFT transfer successfully');
          dispatch(
            SuccessStateActions.setActionOnButtonClick(() => {
              history.push('/dashboard');
            }),
          );
        } else {
          setLoading(false);
          showErrorModal(response?.data?.message);
        }
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      showErrorModal(err);
      console.log('Error While Buying NFT Marketplace', err);
    }
  };

  const unlist = async () => {
    setLoading(true);
    try {
      const unListResponse = await MarketplaceAPI.unListMint(
        paintingDetails?.detail?._id,
        paintingDetails?.detail?.marketplace?.itemId,
        paintingDetails?.detail?.tokenId,
      );
      if (unListResponse?.status === 200) {
        showSuccessModal('Mint unlist successfully! ');
        // paintingDetails?.detail &&
        //   (await getListedPaintings(paintingDetails?.mints[0]));
        history.push('/dashboard');
      } else {
        setLoading(false);
      }
    } catch (err: any) {
      // console.log('err in unlist', err);
      setLoading(false);
      showErrorModal(err);
    }
  };

  const NftFetchError = () => {
    return <h3 className={styles.nftFetchError}>No Such NFT</h3>;
  };
  const isOwner =
    OwnedPainting.length > 0 &&
    OwnedPainting.filter((mint) => mintId !== mint._id).length > 0;

  return (
    <>
      <TopNav />
      <MainNav />
      {!paintingDetails && isError && <NftFetchError />}
      {!paintingDetails && !isError && (
        <div className={styles.nftFetchError}>
          <CircularProgress />
        </div>
      )}
      {paintingDetails && (
        <Main
          walletType={walletType}
          paintingDetails={{
            ...paintingDetails,
          }}
          unlistNft={() => unlist()}
          isOwnerPainting={isOwnerPainting}
          loading={loading}
          editionDetails={editionOverViewDetails}
          onSubmitBid={(amount: any) => {
            addBid(amount);
          }}
          onViewCurrentAuction={() => {
            setBidHistoryView(!showBidHistory);
          }}
          onBuyNowPress={async (isAuctionActive) => {
            if (isAuctionActive) {
              await buyNft();
            } else {
              await buyNftMarketplace();
            }
          }}
        />
      )}
      {showBidHistory && (
        <AuctionListing
          bidHistoryArray={bidHistory}
          paintingName={paintingDetails?.name || ''}
        />
      )}
      {OwnedPainting.length > 0 &&
        OwnedPainting.filter((mint) => mintId !== mint._id).length > 0 &&
        userDetails?.success && (
          <Grid
            paintingDetail={{
              ...paintingDetails.detail.paintingID,
              mintsCount: paintingDetails?.ownedMint?.length,
              mints: OwnedPainting,
            }}
            filterItems={getFilteredPaintings}
            mintId={mintId}
            ownMints
            isOwnerPainting={isOwnerPainting}
            owner={paintingDetails?.detail?.currentBuyer?.username || ''}
          />
        )}
      {availablePainting?.length > 1 &&
        availablePainting?.filter((mint) => mintId !== mint._id).length > 0 &&
        userDetails?.success && (
          <Grid
            paintingDetail={{
              ...paintingDetails.detail.paintingID,
              mintsCount: paintingDetails?.ownedMint?.length,
              mints: availablePainting,
            }}
            filterItems={getFilteredPaintings}
            mintId={mintId}
            isOwnerPainting={isOwnerPainting}
            owner={paintingDetails?.detail?.currentBuyer?.username || ''}
          />
        )}

      {/* use in future */}

      {/*   {!!paintingsByCollection && (
        <PaintingsList
          paintings={paintingsByCollection?.data?.data?.paintings}
          paintingDetails={{ name: paintingDetails?.theme?.name }}
          paintingName={paintingDetails?.name || ''}
          artistName={paintingDetails?.artists}
          mintExcluded={paintingDetails?.detail._id}
          onClick={handleItemClick}
          isListByCollection
          isListByArtist={false}
          isLoading={isPaintingsByCollectionLoading}
        />
      )}
      {!!paintingsByArtists && (
        <PaintingsList
          paintings={paintingsByArtists?.data?.data?.paintings}
          paintingDetails={{
            name: paintingDetails?.details?.paintingID?.artists[0]?.name,
          }}
          paintingName={getArtistNames(paintingDetails?.artists) || ''}
          artistName={paintingDetails?.artists}
          mintExcluded={paintingDetails?.detail?._id}
          onClick={handleItemClick}
          isListByCollection={false}
          isListByArtist
          isLoading={isPaintingsByArtistsLoading}
        />
      )}
      */}
      <br />
      <br />
      <Footer />
    </>
  );
};

export default MarketplaceStatic;
