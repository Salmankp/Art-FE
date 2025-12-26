import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { parse } from 'query-string';
import { Box, Typography } from '@material-ui/core';
import moment from 'moment';
import { maticLogos } from '../MarketPlaceStatic/Main';
import { getArtistNames } from '../../../utils/helpers';
import { AuthenticationStateActions } from '../../../redux/slices/AuthenticationState';
import { useAppDispatch } from '../../../redux/hooks';
import Time from './Time';
import Tabs from './Tabs';
import Popup from './Popup';
import { bidButton } from '../../../utils/bidButton';
import styles from '../styles/DropNew/NFT.module.scss';
import { error } from '../../../utils/toast';

import { DropType } from '../../../utils/interfaces';
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
} from '../../../assets';
import { NFT } from './DropDetails';
import { DropsAPI } from '../../../api/dropsAPI';
import ComicCoverImage from './HeavyMetalMasComicsSvgs';

const NFTPortrait: React.FC<{
  location: any;
  data: NFT;
  autoRerender: number;
  modalHandler: (data: any) => void;
  setIsAutoRerender: (value: number) => void;
}> = ({ location, data, modalHandler, setIsAutoRerender, autoRerender }) => {
  const history = useHistory();
  const [popup, setPopup] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLogin] = useState<any>(localStorage.getItem('authToken'));
  const isDropFinished = data?.isDropFinished;
  const isComingSoon = data?.isComingSoon;

  const isDropNearLive =
    moment
      .duration(moment(data.dropDate).subtract(2, 'hours').diff(moment()))
      .asHours() > -22;

  const bidBtn = bidButton(isLogin, data.isSold, isDropFinished, isComingSoon);

  const isMetalLaunch = location.pathname === '/drop/heavy-metal-mas';
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
  const maticPrice = data.cryptoPrice;
  return (
    <div
      className={styles.outerwrap}
      id={`${data.id}`}
      style={{ position: 'relative' }}
    >
      {data.comicSideBannerUrl && (
        <Box className={styles.purchaseContainer}>
          <Typography
            style={{ color: '#fff', fontSize: '1.22rem', lineHeight: '1' }}
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
          <ComicCoverImage
            paintingTitle={data.comicSideBannerUrl || tarnaatag}
          />
        </Box>
      )}
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
            </div>
            <div className={styles.bottom}>
              {data?.collection && (
                <div className={styles.col}>
                  <span>Collection |</span>
                  {data?.collection}
                </div>
              )}
              <div className={styles.badgewrap}>
                {getDropImg(data.rarity as DropType) && (
                  <img src={getDropImg(data.rarity as DropType)} alt="badge" />
                )}
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
            {isMetalLaunch ? (
              <Time
                timeData={{ date: data.dropEndDate, data, isMetalLaunch: true }}
                setIsAutoRerender={setIsAutoRerender}
                autoRerender={autoRerender}
              />
            ) : (
              <Time
                timeData={{ date: data.dropDate, data, isMetalLaunch: false }}
                setIsAutoRerender={setIsAutoRerender}
                autoRerender={autoRerender}
              />
            )}
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
              <div className={styles.title3} style={{ maxWidth: '440px' }}>
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
              {!isComingSoon && (
                <div className={styles.edition}>
                  {data.totalMints}
                  EDITIONS
                </div>
              )}
              <div className={styles.price}>
                <span>$</span>
                {data.price}
                <span>USD |</span>
                {maticLogos(maticPrice)}
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
                  disabled={bidBtn.disabled}
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
    </div>
  );
};

export default NFTPortrait;
