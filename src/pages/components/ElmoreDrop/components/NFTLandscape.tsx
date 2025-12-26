import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { parse } from 'query-string';
import moment from 'moment';
import { AuthenticationStateActions } from 'redux/slices/AuthenticationState';
import { useAppDispatch } from 'redux/hooks';
import { maticLogos } from 'pages/components/MarketPlaceStatic/Main';
import { getArtistNames } from 'utils/helpers';
import styles from 'pages/components/styles/DropNew/NFT2.module.scss';
import Time1 from 'pages/components/DropNew/Time1';
import Tabs1 from 'pages/components/DropNew/Tabs1';
import Popup from 'pages/components/DropNew/Popup';
import { error } from 'utils/toast';

import NFTViewModal from 'pages/components/MedallionDrop/NFTViewModal';

import { bidElmoreButton } from 'utils/bidElmoreButton';
import { DropNftStatus, DropType } from 'utils/interfaces';
import {
  classicDrop,
  legendaryDrop,
  masterpieceDrop,
  rareDrop,
  uniqueDrop,
  blueLogo,
  Sold,
  extraordinaryDrop,
} from 'assets';
import { DropsAPI } from 'api/dropsAPI';
import { useAppSelector } from '../../../../redux/hooks';
import { NFT } from './dropDetail';

const NFTLandscape: React.FC<{
  data: NFT;
  modalHandler: (data: any) => void;
  location;
  signature: any;
  autoRerender: number;
  setIsAutoRerender: (value: number) => void;
}> = ({
  data,
  modalHandler,
  location,
  setIsAutoRerender,
  autoRerender,
  signature,
}) => {
  const history = useHistory();
  const [popup, setPopup] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLogin] = useState<any>(localStorage.getItem('authToken'));
  const [viewNFTModal, setViewNFTModal] = useState(false);
  const isDropFinished = data?.isDropFinished;
  const isComingSoon = data?.isComingSoon;
  const isDropNearLive =
    moment.duration(moment(data.dropDate).diff(moment())).asHours() - 2 <= 0;
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
  const handleNFTViewModal = (isOpen: boolean) => {
    setViewNFTModal(isOpen);
  };
  const isMoonmaid = location.pathname === '/drop/moonmaid';

  const getBidStatus = (isSold: boolean): DropNftStatus => {
    if (isDropFinished) return 'DROP ENDED';
    if (!isComingSoon && !isDropFinished && !isSold) {
      return 'BUY NOW';
    }

    if (data.isComingSoon) {
      return 'COMING SOON';
    }

    return 'SOLD OUT';
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
      case 'Limited':
        return blueLogo;
      case 'Extraordinary':
        return extraordinaryDrop;
      default:
        return '';
    }
  };
  function scrollToTop() {
    window.scrollTo(0, 0);
  }
  const maticCryptPrice = data.cryptoPrice;
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
              <div className={styles.timeandthreed}>
                <div
                  className={styles.logoAuthor}
                  style={{ marginBottom: '2rem' }}
                >
                  {data?.authorBadge && (
                    <img src={data.authorBadge} alt={data.name} />
                  )}
                </div>
                <Time1
                  timeData={{
                    date: data.dropDate,
                    data: { ...data, bidBtn },
                    isMetalLaunch: false,
                  }}
                  setIsAutoRerender={setIsAutoRerender}
                  autoRerender={autoRerender}
                />
                <div className={styles.nftthreed}>
                  {data.preview3DUrl ? (
                    <img src={data.preview3DUrl} alt={data.preview3DUrl} />
                  ) : (
                    <div style={{ height: '624px', width: '476px' }} />
                  )}

                  <div
                    onClick={() => threeDBox(data.id)}
                    className={styles.nftbadge}
                  >
                    <span>View</span>
                    3D
                    <br />
                    NFT
                  </div>
                </div>
                <div
                  style={{
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {signature && <img src={signature.url} />}
                </div>
              </div>
              <div className={styles.mainimg}>
                <div className={styles.imgtagSold}>
                  {data.previewUrl ? (
                    <img src={data.previewUrl} alt={data.previewUrl} />
                  ) : (
                    <div style={{ height: '700px', width: '433px' }} />
                  )}
                  {data.isSold && !data.isComingSoon && (
                    <img src={Sold} alt="" className={styles.soldImg} />
                  )}
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
            </div>
            <div className={styles.cntnt}>
              <div className={styles.titlewrap}>
                <div className={styles.titleinnerwrap}>
                  <div className={styles.title1}>
                    {getArtistNames(data?.artist || [])}
                  </div>
                  <div className={styles.title2}>{data.name}</div>

                  {/* {data.fractionalOwnership === 'true' && ( */}
                  <div className={styles.title3} style={{ maxWidth: '460px' }}>
                    {data.desc}
                  </div>
                </div>
              </div>
              <div className={styles.btnandtabswrap}>
                <div className={styles.btnpricewrap}>
                  <div className={styles.editionpricewrap}>
                    {data?.totalMints && (
                      <div className={styles.edition}>
                        {data?.totalMints}
                        &nbsp;EDITIONS
                      </div>
                    )}
                    <div className={styles.price}>
                      <span>$</span>
                      {data.price}
                      <span>&nbsp;USD | </span>
                      {maticLogos(maticCryptPrice)}
                      &nbsp;
                    </div>
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
                          history.push('/auth#login');
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
                <Tabs1 data={data} modalHandler={modalHandler} />
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default NFTLandscape;
