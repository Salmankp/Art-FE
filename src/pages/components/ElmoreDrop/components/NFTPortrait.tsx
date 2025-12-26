import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { parse } from 'query-string';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
import { AuthenticationStateActions } from 'redux/slices/AuthenticationState';
import { useAppDispatch } from 'redux/hooks';
import Time from 'pages/components/DropNew/Time';
import Tabs from 'pages/components/DropNew/Tabs';
import Popup from 'pages/components/DropNew/Popup';
import { bidElmoreButton } from 'utils/bidElmoreButton';
import styles from 'pages/components/styles/DropNew/NFT.module.scss';
import Platinum from 'pages/components/ElmoreDrop/components/Platinum';
import FantasyPlatinum from 'pages/components/ElmoreDrop/components/fantasyPlatinum';
import { error } from 'utils/toast';
import { DropType } from 'utils/interfaces';
import {
  classicDrop,
  legendaryDrop,
  masterpieceDrop,
  rareDrop,
  uniqueDrop,
  Sold,
  sellingfast,
  whiteLogo,
  extraordinaryDrop,
  tarnaatag,
  logoImage,
  valentineLogo,
} from 'assets';
import { DropsAPI } from 'api/dropsAPI';
import { getArtistNames } from 'utils/helpers';
import { maticLogos } from 'pages/components/MarketPlaceStatic/Main';
import PaltniumStrip from 'pages/Drops/components/PaltniumStrip';
import NFTViewModal from 'pages/components/MedallionDrop/NFTViewModal';
import { NFT } from './dropDetail';
import { useAppSelector } from '../../../../redux/hooks';

const NFTPortrait: React.FC<{
  location: any;
  viewNFT: string | undefined;
  data: NFT;
  signature: any;
  autoRerender: number;
  modalHandler: (data: any) => void;
  setIsAutoRerender: (value: number) => void;
}> = ({
  location,
  data,
  modalHandler,
  setIsAutoRerender,
  autoRerender,
  signature,
  viewNFT,
}) => {
  const history = useHistory();
  const [popup, setPopup] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLogin] = useState<any>(localStorage.getItem('authToken'));
  const isDropFinished = data?.isDropFinished;
  const isComingSoon = data?.isComingSoon;
  const [viewNFTModal, setViewNFTModal] = useState(false);

  const isDropNearLive =
    moment
      .duration(moment(data.dropDate).subtract(2, 'hours').diff(moment()))
      .asHours() > -22;

  const bidBtn = bidElmoreButton(
    isLogin,
    data.isSold,
    isDropFinished,
    isComingSoon,
  );

  useEffect(() => {
    const queryParams = parse(location.search);
    if (
      queryParams.paymentMessage &&
      queryParams.paymentMessage === 'success' &&
      !popup &&
      data.id === queryParams.paintingId
    ) {
      setPopup(true);
      setPaymentSuccess(true);
    }
  }, []);

  const videoId = useAppSelector(
    (state) => state.AuthenticationState.dropVideoSrc,
  );

  const isMoonmaid = location.pathname === '/drop/moonmaid';

  const handleNFTViewModal = (isOpen: boolean) => {
    setViewNFTModal(isOpen);
  };

  const getDropImg = (name: DropType) => {
    switch (name) {
      case 'Classic':
        return classicDrop;
      case 'Legendary':
        return legendaryDrop;
      case 'Masterpiece':
        return masterpieceDrop;
      case 'Rare':
        return rareDrop;
      case 'Unique':
        return uniqueDrop;
      case 'Common':
        return whiteLogo;
      case 'Extraordinary':
        return extraordinaryDrop;
      default:
        return '';
    }
  };

  const dispatch = useAppDispatch();

  const threeDBox = (id) => {
    document.getElementById('3d-display')?.scrollIntoView({
      behavior: 'smooth',
    });
    dispatch(AuthenticationStateActions.set_dropVideoSrc(id));
    if (isMoonmaid) {
      setViewNFTModal(true);
    }
  };
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  const buyNowHandler = async () => {
    try {
      if (isDropFinished || data.isSold) {
        return false;
      }
      setPaymentSuccess(false);
      const mintsData = await DropsAPI.getPaintingAvailableMintsCount(data.id);
      if (!mintsData.data.data.availableMints)
        return error(
          'NFT already purchased by someone else, Try with another Painting',
        );
      setPopup(true);
    } catch (e) {
      console.error(e);
      error('NFT already purchased by someone else, Try with another Painting');
    }
  };
  const isPlatinum = [
    '61f132da2933bbcd4c11004f',
    '61e8e72317a1cdd9b4985fa2',
  ].includes(data.id);

  const isExploringFantasy = location.pathname === '/drop/exploring-fantasy';
  const exploringFantasyId = [
    '61fcc3973a79d1c93816e12d',
    '61fcc8113a79d1c93816e172',
  ].includes(data.id);
  console.log('*****', data.id);
  const maticPrice = data.cryptoPrice;
  return (
    <>
      <div
        className={styles.outerwrap}
        id={`${data.id}`}
        style={{ position: 'relative' }}
      >
        <Popup
          popupData={{
            popup,
            setPopup,
            data,
            paymentSuccess,
            onPaymentSuccess: (value: boolean) => setPaymentSuccess(value),
          }}
        />
        <div className={styles.wrap}>
          <div className={styles.imgandcntnt}>
            <div className={styles.img}>
              <div className={styles.mainimg}>
                <div className={styles.imgtagsoldPotrait}>
                  {data.previewUrl ? (
                    <img src={data.previewUrl} alt="img" />
                  ) : (
                    <div style={{ height: '624px', width: '476px' }} />
                  )}
                  {data.isSold && !data.isComingSoon && (
                    <img src={Sold} alt="" className={styles.soldImg} />
                  )}
                </div>
                <div className={styles.nftthreed}>
                  <img src={data.preview3DUrl} alt="img" />
                  {viewNFT ? (
                    <img
                      onClick={() => threeDBox(data.id)}
                      className={styles.viewNFTBadge}
                      src={viewNFT}
                    />
                  ) : (
                    <div
                      onClick={() => threeDBox(data.id)}
                      className={styles.nftbadge}
                    >
                      <span>View</span>
                      3D
                      <br />
                      NFT
                    </div>
                  )}
                </div>
              </div>
              <div
                style={{ width: '100%', textAlign: 'end', paddingTop: '1rem' }}
              >
                {signature && <img src={signature.url} alt="signature" />}
              </div>
              <div className={styles.bottom}>
                {data?.collection && (
                  <div className={styles.col}>
                    <span>Collection | </span>
                    {data?.collection}
                  </div>
                )}
                <div className={styles.badgewrap}>
                  {getDropImg(data.rarity as DropType) && (
                    <img
                      src={getDropImg(data.rarity as DropType)}
                      alt="badge"
                    />
                  )}
                  &nbsp;
                  {data.rarity}
                </div>
              </div>
            </div>
            <div className={styles.cntnt}>
              {data?.authorBadge && (
                <img
                  className={styles.lgo}
                  src={data.authorBadge}
                  alt={data.name}
                />
              )}

              <Time
                timeData={{
                  date: data.dropDate,
                  data: { ...data, bidBtn },
                  isMetalLaunch: false,
                }}
                setIsAutoRerender={setIsAutoRerender}
                autoRerender={autoRerender}
              />
              {data.comicSideBannerUrl && (
                <Box className={styles.purchaseContainer2}>
                  <Typography
                    style={{
                      color: '#fff',
                      fontSize: '1.22rem',
                      lineHeight: '1',
                    }}
                    className={styles.typoWrap}
                  >
                    Purchase this
                    <br />
                    artwork to
                    <br />
                    receive a digital
                    <br />
                    link to chapter
                    <br />
                    one of
                    {data.name}
                  </Typography>
                  <div>
                    <img
                      style={{ width: '100%' }}
                      src={data.comicSideBannerUrl || tarnaatag}
                      className={styles.tarnaatag}
                    />
                  </div>
                </Box>
              )}
              <div className={styles.titlewrap}>
                <div className={styles.title1}>
                  {getArtistNames(data?.artist || [])}
                </div>
                <div className={styles.title2}>{data?.name}</div>
                {/* {data.fractionalOwnership === 'true' && ( */}
                <div
                  className={styles.title3}
                  style={{
                    maxWidth: '440px',
                    minHeight: '100px',
                  }}
                >
                  {data.desc}
                </div>
                {/* )} */}
                {data.name === 'Count Dracula' && (
                  <div>
                    <img src={sellingfast} className={styles.sellingfast} />
                  </div>
                )}
                {data.name === 'Vampire Bride' && (
                  <div>
                    <img src={sellingfast} className={styles.sellingfast} />
                  </div>
                )}
              </div>
              <div className={styles.btnpricewrap}>
                {data?.totalMints ? (
                  <div className={styles.edition}>
                    {data.totalMints}
                    &nbsp;EDITIONS
                  </div>
                ) : (
                  <> </>
                )}
                <div className={styles.price}>
                  <span>$</span>
                  {data.price}
                  <span>&nbsp;USD | </span>
                  {maticLogos(maticPrice)}
                  &nbsp;
                </div>
                <div className={styles.button}>
                  <button
                    onClick={() => {
                      if (
                        isLogin &&
                        (isDropFinished || data.isSold || isComingSoon)
                      ) {
                        return false;
                      }
                      if (!isLogin) {
                        history.push('/auth#register');
                        scrollToTop();
                      } else if (isLogin) {
                        setPaymentSuccess(false);
                        setPopup(true);
                      }
                    }}
                    style={{
                      cursor: isLogin && isComingSoon ? 'not-allowed' : '',
                      fontSize: '18px',
                      backgroundColor: `${bidBtn.background}`,
                    }}
                  >
                    {bidBtn.title}
                  </button>
                </div>
                <div className={styles.badgePic}>
                  <img src={data.silverBadge} alt="" />
                </div>
              </div>
              <Tabs data={data} modalHandler={modalHandler} />
            </div>
          </div>
        </div>
        {exploringFantasyId ? (
          <FantasyPlatinum id={data.id} />
        ) : (
          isPlatinum && <Platinum />
        )}
        {data.PlatinumBadge ? <PaltniumStrip {...data} /> : <></>}
      </div>
      <div className={styles.border} />
      {isMoonmaid && (
        <NFTViewModal
          handleModal={handleNFTViewModal}
          isOpen={viewNFTModal}
          videoId={videoId}
        />
      )}
    </>
  );
};

export default NFTPortrait;
