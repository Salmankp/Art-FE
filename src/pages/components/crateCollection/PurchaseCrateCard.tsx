import { Box, Button, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useState } from 'react';
import { parse } from 'query-string';
import { useHistory } from 'react-router-dom';
import styles from '../styles/CrateCollection/CrateCollection.module.scss';
import { UserAPI } from '../../../api/user';
// import assets
import Popup from './Popup';
import { LootCrateApi } from '../../../api/lootCrateAPI';
import { error } from '../../../utils/toast';

const CardContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 30px',
});

const StyledImg = styled('img')({
  borderRadius: '20px',
  height: '300px',
  width: '350px',
  // width: '100%',
  marginBottom: '10px',
});

const Text = styled(Typography)({
  color: 'white',
});

const StyledButton = styled(Button)({
  backgroundColor: '#F6921E',
  borderRadius: '20px',
  fontWeight: 'bold',
  margin: '10px 0px',
});

interface PurchaseCrateCardProps {
  collectionName: string;
  isLoading?: boolean | false;
  disabled?: boolean;
  crate: Crate;
  showRevealModalHandler: (show: boolean, mints: any) => void;
}

const PurchaseCrateCard = ({
  disabled,
  isLoading,
  crate,
  showRevealModalHandler,
}: PurchaseCrateCardProps) => {
  const [popup, setPopup] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string>('');
  const [isLogin] = useState<any>(localStorage.getItem('authToken'));
  const [userCoupon, setUserCoupon] = useState<any>();
  const loadOpenedMints = async () => {
    const mintsData = await LootCrateApi.getTokensData(paymentId);
    showRevealModalHandler(paymentSuccess, mintsData?.data?.data as Mint[]);
  };

  useEffect(() => {
    const queryParams = parse(location.search);
    if (
      queryParams.paymentMessage &&
      queryParams.paymentMessage === 'success'
    ) {
      const stripePaymentId = localStorage.getItem('stripePaymentId');
      setPaymentId(stripePaymentId || '');
      setPaymentSuccess(true);
    }
  }, []);
  const history: any = useHistory();

  const onPurchaseHandler = async () => {
    const couponData = await UserAPI.getUserValidCoupon();
    if (couponData) {
      setUserCoupon(couponData);
    } else {
      setUserCoupon(false);
    }
    console.log('coupn data', couponData);
    setPopup(true);
    // () => history.push('/auth#register');
  };

  const setButtonText = () => {
    if (!isLogin) {
      return 'Login to buy';
    }
    const buttonText = disabled ? 'Sold' : 'Buy RISE Crate';
    return buttonText;
  };

  useEffect(() => {
    if (paymentSuccess && paymentId) loadOpenedMints();
    if (!paymentSuccess && paymentId)
      error('Crates are not available you payment will be refund soon');
  }, [paymentSuccess, paymentId]);
  return (
    <div className={styles.mainPop}>
      <Popup
        popupData={{
          popup,
          setPopup,
          data: crate,
          paymentSuccess,
          userCoupon,
          onPaymentSuccess: (value: string, success: boolean) => {
            setPopup(false);
            setPaymentSuccess(success);
            setPaymentId(value);
          },
        }}
      />

      <div className={styles.btnTextWrap}>
        <button
          // disabled={disabled || !isLogin}
          onClick={() =>
            !isLogin ? history.push('/auth#login') : onPurchaseHandler()
          }
          className={styles.riseBtn}
        >
          {setButtonText()}
        </button>
      </div>
      <div className={styles.riseText}>
        {isLoading ? (
          <div className={styles.loading}>
            <CircularProgress size={22} />
          </div>
        ) : (
          <>
            <div style={{ color: '#fff' }}>
              <span>RISE Crate - </span>
              {`${crate?.numberOfNfts} NFTs`}
            </div>
            <div
              className={styles.cratePrice}
              style={{
                color: '#ED2425',
                fontSize: '23px',
                lineHeight: '12px',
                fontWeight: 'bold',
              }}
            >
              <span>$</span>
              {crate?.price}
            </div>
          </>
        )}
      </div>

      {/* Reveal loot dialog, plays the reveal video and shows the opened NFTs */}
      {/* Only render when show state is true, so that animation finished state resets on close without glitchy transition */}
      {/* {showRevealModal && openedMints && (
        <RevealLootDialog
          isOpen={paymentSuccess}
          handleClose={() => {
            setPaymentId('');
            setPaymentSuccess(false);
          }}
          openedMints={openedMints}
        />
      )} */}
    </div>
  );
};

export default PurchaseCrateCard;
