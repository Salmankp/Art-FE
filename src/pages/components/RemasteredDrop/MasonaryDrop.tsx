import React, { useState } from 'react';
import { Container, Button, Typography, Box } from '@material-ui/core';
import { useHistory } from 'react-router';
import { AuthenticationStateActions } from '../../../redux/slices/AuthenticationState';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import styles from '../styles/RemasteredDrop/MasonaryDrop.module.scss';
import { orangeLogo } from '../../../assets';
import PlatinumModal from './PlatinumModal';
import { NFT } from '../DropNew/DropDetails';
import { getArtistBio, getArtistNames } from '../../../utils/helpers';
import Popup from '../DropNew/Popup';
import NFTBoxRarity from '../DropNew/NFTBoxRarity';

const MasonaryDetail: React.FC<{
  masanoryImage: string;
  rarityBadge: string;
  rarityText: string;
  aboutArtWork: string;
  aboutNft: string;
  aboutArtist: string;
  artistName: string;
  collection: string;
  name: string;
  edition: string;
  price: string;
  currency: string;
  collMaster: string;
  nftBtn: string;
  platinumBtn: string;
  preview3DUrl: string;
  isComingSoon: boolean;
  isFinished: boolean;
  isDropEnd: boolean;
  data: NFT;
}> = ({
  masanoryImage,
  rarityBadge,
  rarityText,
  artistName,
  collection,
  name,
  edition,
  price,
  currency,
  collMaster,
  nftBtn,
  platinumBtn,
  aboutArtWork,
  aboutNft,
  aboutArtist,
  isComingSoon,
  isFinished,
  isDropEnd,
  preview3DUrl,
  data,
}) => {
  const [showDetail, setShowDetail] = useState(true);
  const [tab, setTab] = useState(1);
  const [currentNav, setCurrentNav] = useState<'Art' | 'NFT' | 'Artist'>('Art');
  const [details, setDetails] = useState(aboutArtWork);

  const [paymentPopup, setPaymentPopup] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [popup, setPopup] = useState<boolean>(false);
  // const [handleDisable, setHandleDisable] = useState<boolean>(true);

  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );

  const dispatch = useAppDispatch();
  const history = useHistory();

  const threeDBox = (id) => {
    document.getElementById('3d-display')?.scrollIntoView({
      behavior: 'smooth',
    });
    dispatch(AuthenticationStateActions.set_dropVideoSrc(id));
  };

  const getTextOnBuyNowButton = () => {
    if (!loggedIn) return 'Login To Buy';
    if (isComingSoon && loggedIn)
      // && !isDropEnd && !isFinished
      return 'Coming Soon';
    if (isDropEnd && loggedIn)
      // && !isComingSoon && !isFinished
      return 'Drop Ended';
    if (isFinished && loggedIn)
      // && !isDropEnd && !isComingSoon
      return 'Sold Out';
    if (loggedIn && !isFinished && !isDropEnd && !isComingSoon) {
      // setHandleDisable(false);
      return 'Buy Now';
    }
  };

  const handleDisable = () => {
    if (!loggedIn) {
      return false;
    }
    return !(loggedIn && !isFinished && !isDropEnd && !isComingSoon);
  };
  return (
    <>
      <Popup
        popupData={{
          popup: paymentPopup,
          setPopup: setPaymentPopup,
          data,
          paymentSuccess,
          onPaymentSuccess: (value: boolean) => setPaymentSuccess(value),
        }}
      />
      <Typography component="div" style={{ position: 'relative' }}>
        <PlatinumModal
          popupData={{
            preview3D: preview3DUrl,
            artistName,
            name,
            aboutArtWork,
            popup,
            setPopup,
          }}
        />
        <img
          src={masanoryImage}
          style={{
            width: '100%',
            display: 'block',
            borderRadius: '15px',
          }}
          className={styles.masonaryImage}
        />
        <Button
          className={styles.infoButton}
          onClick={() => {
            setShowDetail(!showDetail);
            setDetails(aboutArtWork);
          }}
        >
          <span className={styles.btnText}>
            {showDetail ? 'HIDE INFO' : 'SHOW INFO'}
          </span>
        </Button>
        <NFTBoxRarity rarity={rarityText} />
      </Typography>
      {showDetail && (
        <Box className={styles.detailsWrapper}>
          <Typography component="div" className={styles.cardTopInfo}>
            <Typography component="div" className={styles.nameEditionWrap}>
              <Typography component="div" className={styles.collectionWrap}>
                <div className={styles.artistName}>{artistName}</div>
                <div className={styles.collection}>{name}</div>
                <div className={styles.name}>{collection}</div>
              </Typography>
              <Typography component="div">
                <Typography className={styles.editionWrap} component="div">
                  {edition && <div>{edition}</div>}
                </Typography>
                <Typography component="div" className={styles.currencyPrice}>
                  <span className={styles.price}>$</span>
                  <span className={styles.price}>{price}</span>
                  <sup className={styles.curreny}>{currency}</sup>
                </Typography>
              </Typography>
            </Typography>

            {collMaster && (
              <Typography component="div" className={styles.collMaster}>
                <span style={{ marginRight: '5px' }}>Collection |</span>
                <span style={{ color: '#fff' }}>{collMaster}</span>
              </Typography>
            )}
          </Typography>
          <Typography component="div" className={styles.btnWrapper}>
            <Typography component="div" className={styles.leftWrap}>
              <Button
                onClick={() => threeDBox(data.id)}
                className={styles.previewNft}
              >
                {nftBtn}
              </Button>
              {/* <Button
                onClick={() => setPopup(true)}
                className={styles.platinumBtn}
              >
                {platinumBtn}
              </Button> */}
            </Typography>
            <Typography component="div" className={styles.rightWrap}>
              <Button
                className={isComingSoon ? styles.comingSoon : styles.buynowBtn}
                disabled={handleDisable()}
                onClick={() => {
                  if (loggedIn) setPaymentPopup(true);
                  if (!loggedIn) history.push('/auth');
                }}
              >
                {getTextOnBuyNowButton()}
              </Button>
            </Typography>
          </Typography>
          <Typography component="div" className={styles.tabswrap}>
            <Typography component="div" className={styles.headwrap}>
              <Typography
                component="div"
                onClick={() => {
                  setCurrentNav('Art');
                  setDetails(aboutArtWork);
                  setTab(1);
                }}
                className={`${styles.head} ${tab === 1 && styles.active}`}
              >
                About the Artwork
              </Typography>
              <Typography component="div" className={styles.divider} />
              <Typography
                component="div"
                onClick={() => {
                  setCurrentNav('NFT');
                  setDetails(aboutNft);
                  setTab(2);
                }}
                className={`${styles.head} ${tab === 2 && styles.active}`}
              >
                About the NFT
              </Typography>
              <Typography component="div" className={styles.divider} />
              <Typography
                component="div"
                onClick={() => {
                  setCurrentNav('Artist');
                  setDetails(aboutArtist);
                  setTab(3);
                }}
                className={`${styles.head} ${tab === 3 && styles.active}`}
              >
                About the Artist
              </Typography>
            </Typography>
            <Typography
              component="div"
              className={styles.bodywrap}
              dangerouslySetInnerHTML={{ __html: details }}
            />
          </Typography>
        </Box>
      )}
    </>
  );
};

const MasonaryDrop: React.FC<{ itemData: NFT[] }> = ({ itemData }) => {
  return (
    <>
      <Container
        style={{ maxWidth: '1120px' }}
        className={styles.masonaryContainer}
      >
        <Typography component="div" className={styles.gridContainer}>
          {itemData.map((item, index) => (
            <Typography component="div" key={index} className={styles.gridItem}>
              <MasonaryDetail
                masanoryImage={item?.previewUrl}
                rarityBadge={orangeLogo}
                rarityText={item?.rarity}
                artistName={getArtistNames(item?.artist || [])}
                collection={item?.collection}
                name={item?.name}
                edition={`${item?.totalMints} EDITIONS`}
                price={`${item?.price}` || `${item?.cryptoPrice}`}
                currency={item?.price ? 'USD' : 'MATIC'}
                collMaster={item?.collection}
                preview3DUrl={item?.preview3DUrl}
                nftBtn="Preview NFT"
                platinumBtn="View Platinum"
                aboutArtWork={item?.aboutArtWork}
                isComingSoon={item?.isComingSoon}
                isDropEnd={item?.isDropFinished}
                isFinished={item?.isSold}
                aboutNft={item?.aboutNFT}
                aboutArtist={getArtistBio(item?.aboutArtist || [], true)}
                data={item}
              />
            </Typography>
          ))}
        </Typography>
      </Container>
    </>
  );
};

export default MasonaryDrop;
