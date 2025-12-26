import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import BigNumber from 'bignumber.js';
import { ErrorStateActions } from 'redux/slices/ErrorState';
import { SuccessStateActions } from 'redux/slices/SuccessState';
import Web3 from 'web3';
import styles from '../styles/DropNew/Popup.module.scss';
import { cross, purchasecoffin } from '../../../assets';
import { error } from '../../../utils/toast';
import { maticLogos } from '../MarketPlaceStatic/Main';
import { getArkaneConnect } from '../../../utils/helpers';
import { getNetworkId } from '../../../utils/web3';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { DropsAPI } from '../../../api/dropsAPI';
import Stripe from './StripeModal';
import Paypal from './PaypalModal';
import showSuccessErrorModel from './helpers/ShowSuccessErrorModel';

const NETWORK_ID =
  process.env.REACT_APP_ENVIRONMENT === 'production' ? 137 : 80001;

interface buttonFuncs {
  createOrder: () => Promise<void>;
  onApprove: (data) => Promise<void>;
  onError: (err: Error) => void;
}

declare global {
  interface Window {
    paypal: {
      Buttons: ({ createOrder, onApprove, onError }: buttonFuncs) => {
        render: (
          ref: React.MutableRefObject<HTMLInputElement>['current'],
        ) => void;
      };
    };
  }
}

interface dropCardProps {
  popupData: {
    popup: boolean;
    setPopup: Function;
    data: any;
    paymentSuccess?: boolean;
    userCoupon: any;
    onPaymentSuccess?: (value: string, success: boolean) => void;
  };
}

const Popup = ({ popupData }: dropCardProps) => {
  const redirectPageName = window.location.pathname;
  const dispatch = useAppDispatch();
  const [purchaseDone, setPurchaseDone] = useState<boolean>(false);
  const [stripeButtonDisable, setStripButtonDisable] = useState<boolean>(false);
  const [disabledMaticBuyButton, setDisabledMaticBuyButton] =
    useState<boolean>(false);
  const arkaneConnect = getArkaneConnect();
  let metaMaskRetries = 1;
  const userDetails = useAppSelector(
    (state) => state.AuthenticationState.userGeneralInfo,
  );

  const walletDetails = useAppSelector(
    (state) => state.AuthenticationState.walletDetails,
  );

  const getWeb3 = () => {
    let instance;
    if (window.ethereum) {
      instance = new Web3(window.ethereum);
    } else {
      instance = new Web3('https://rpc-mumbai.maticvigil.com');
    }

    return instance;
  };

  const getPaintingDataForTransaction = async (lootCrateId) => {
    const web3 = getWeb3();
    let orderDetails = `lootCrate|${userDetails.userInfo.id}|${lootCrateId}`;
    if (popupData.userCoupon) {
      orderDetails = `${orderDetails}|${popupData.userCoupon._id}`;
    }
    console.log('orderDetails ====', orderDetails);
    const orderDetailHex = web3.utils.toHex(orderDetails);
    return orderDetailHex;
  };

  // for venly payment
  const venlyTransaction = async () => {
    let crateMintData;
    try {
      setDisabledMaticBuyButton(true);
      crateMintData = await DropsAPI.makeLootCrateMintsAvailableForSale(
        popupData.data._id,
      );
      if (!crateMintData.data.success) {
        setDisabledMaticBuyButton(false);
        showSuccessErrorModel(
          dispatch,
          'Crate are not available',
          ErrorStateActions.setErrorMessage,
          ErrorStateActions.setErrorModal,
        );
      }
    } catch (e) {
      console.error(e);
      setDisabledMaticBuyButton(false);
      return error('Crate are not available');
    }
    try {
      if (crateMintData.data.success) {
        const arkaneAuthenticated = await arkaneConnect.checkAuthenticated();

        const signer = await arkaneConnect.createSigner();

        const walletBalance = await arkaneConnect.api.getBalance(
          walletDetails.address.id,
        );
        const cryptoPrice = popupData.userCoupon
          ? popupData.userCoupon.cryptoPrice
          : popupData.data.cryptoPrice;
        if (walletBalance.balance < cryptoPrice) {
          if (arkaneConnect.isPopupSigner(signer)) {
            signer.closePopup();
          }
          setDisabledMaticBuyButton(false);
          showSuccessErrorModel(
            dispatch,
            'Your account balance is less',
            ErrorStateActions.setErrorMessage,
            ErrorStateActions.setErrorModal,
          );
        }
        const { tokens, lootCrateId } = crateMintData.data.data;
        const adminWalletAddress = process.env.REACT_APP_ADMIN_WALLET;
        const orderDetails = `lootCrate|${userDetails.userInfo.id}|${lootCrateId}`;
        const transactionData = await signer.executeTransfer({
          walletId: walletDetails.address.id,
          to: adminWalletAddress,
          value: cryptoPrice,
          secretType: 'MATIC',
          data: orderDetails,
        });
        if (arkaneConnect.isPopupSigner(signer)) {
          signer.closePopup();
        }

        if (transactionData.status === 'SUCCESS') {
          const { onPaymentSuccess } = popupData;
          const maticTransData = await DropsAPI.checkoutMaticLootCrate(
            transactionData.result,
            tokens,
            cryptoPrice,
            lootCrateId,
            popupData?.userCoupon?._id,
          );
          if (onPaymentSuccess)
            onPaymentSuccess(
              transactionData.result.transactionHash,
              maticTransData?.data.success,
            );
          setDisabledMaticBuyButton(false);
        }
      }
    } catch (err) {
      setDisabledMaticBuyButton(false);
      showSuccessErrorModel(
        dispatch,
        'There was an issue with processing your transaction. Please contact support',
        ErrorStateActions.setErrorMessage,
        ErrorStateActions.setErrorModal,
      );
      throw err;
    }
  };

  // for meta mask payment
  const metaMaskTransaction = async (data, tokens, value, lootCrateId) => {
    try {
      const web3 = getWeb3();
      await web3.eth
        .sendTransaction(data)
        .on('transactionHash', async (data) => {
          showSuccessErrorModel(
            dispatch,
            'Your NFT will be processed soon',
            SuccessStateActions.setSuccessMessage,
            SuccessStateActions.setSuccessModal,
          );
          const transactionData = { transactionHash: data };
          const { onPaymentSuccess } = popupData;
          const maticTransData = await DropsAPI.checkoutMaticLootCrate(
            transactionData,
            tokens,
            value,
            lootCrateId,
            popupData?.userCoupon?._id,
          );
          if (onPaymentSuccess)
            onPaymentSuccess(data, maticTransData?.data.success);
          setDisabledMaticBuyButton(false);
        })
        .on('error', (error) => {
          setDisabledMaticBuyButton(false);
          return error;
        });
    } catch (err: any) {
      console.log('meta mask error code =====', err?.code);
      if (metaMaskRetries <= 5 && err?.code !== 4001) {
        metaMaskRetries += 1;
        return setTimeout(() => {
          metaMaskTransaction(data, tokens, value, lootCrateId);
        }, 2000);
      }
      setDisabledMaticBuyButton(false);
      showSuccessErrorModel(
        dispatch,
        'Sorry! Your transaction has failed, please refresh your window and try again',
        ErrorStateActions.setErrorMessage,
        ErrorStateActions.setErrorModal,
      );
      metaMaskRetries = 1;
      return false;
    }
  };

  const maticTransaction = async () => {
    try {
      setDisabledMaticBuyButton(true);
      const currentNetworkId = await getNetworkId();

      if (currentNetworkId !== NETWORK_ID) {
        showSuccessErrorModel(
          dispatch,
          'Please check your network settings on your wallet',
          ErrorStateActions.setErrorMessage,
          ErrorStateActions.setErrorModal,
        );
        return;
      }

      // Make sure user is connected with right account.
      const [metamaskWalledAddress] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // price need to purchase painting
      const cratePurchasePrice = popupData.userCoupon
        ? popupData.userCoupon.cryptoPrice
        : popupData.data.cryptoPrice;
      const value = new BigNumber(cratePurchasePrice)
        .multipliedBy(new BigNumber(10).pow(new BigNumber(18)))
        .toString();

      const crateMintData = await DropsAPI.makeLootCrateMintsAvailableForSale(
        popupData.data._id,
      );
      if (!crateMintData.data.success) {
        setDisabledMaticBuyButton(false);
        showSuccessErrorModel(
          dispatch,
          'Crate are not available',
          ErrorStateActions.setErrorMessage,
          ErrorStateActions.setErrorModal,
        );
        // return error('Crate are not available');
      }
      const { tokens, lootCrateId } = crateMintData.data.data;
      const adminWalletAddress = process.env.REACT_APP_ADMIN_WALLET;
      console.log(value, `${cratePurchasePrice}`, tokens);
      const orderDetailData = await getPaintingDataForTransaction(lootCrateId);
      const metaMaskTransactionData = {
        from: metamaskWalledAddress,
        to: adminWalletAddress,
        value,
        data: orderDetailData,
      };

      if (tokens) {
        return metaMaskTransaction(
          metaMaskTransactionData,
          tokens,
          value,
          lootCrateId,
        );
      }
    } catch (err: any) {
      setPurchaseDone(false);
      setDisabledMaticBuyButton(false);
      if (err?.response?.data?.message) {
        showSuccessErrorModel(
          dispatch,
          err?.response?.data?.message,
          ErrorStateActions.setErrorMessage,
          ErrorStateActions.setErrorModal,
        );
      }
    }
  };

  const [tab, setTab] = useState(1);
  const [paintingPaymentPopup, setPaintingPaymentPopup] = useState(true);
  // const [isPurchaseLoading, setPurchaseLoading] = useState(false);
  const history = useHistory();
  return (
    <>
      <Modal
        open={popupData.popup}
        onClose={() => {
          popupData.setPopup(false);
          setPaintingPaymentPopup(true);
        }}
        className={styles.modal}
      >
        <div className={styles.popupwrap}>
          {/* ----- Popup closer starts */}
          <div
            className={styles.cross}
            onClick={() => popupData.setPopup(false)}
          >
            <img src={cross} alt="cross" />
          </div>
          {/* ----- Popup closer ends */}

          {/* ----- Popup header starts */}
          <div className={styles.first}>
            <div className={styles.titlewrap}>
              <div className={styles.title1}>{popupData?.data?.artist}</div>
              <div className={styles.title2}>
                {popupData?.data?.numberOfNfts}
                &nbsp;NFTs
              </div>
            </div>
            <div className={styles.img}>
              <img src={purchasecoffin} alt={popupData?.data?.name} />
            </div>
          </div>
          {/* ----- Popup header ends */}

          <div className={styles.second}>
            {paintingPaymentPopup && (
              <>
                {/* ----- Payment tabs on the top starts */}
                <div className={styles.tabhead}>
                  <div
                    onClick={() => setTab(1)}
                    className={`${styles.head} ${tab === 1 && styles.active}`}
                  >
                    Credit Card
                  </div>
                  <div
                    onClick={() => setTab(2)}
                    className={`${styles.head} ${tab === 2 && styles.active}`}
                  >
                    Paypal
                  </div>
                  <div
                    onClick={() => setTab(3)}
                    className={`${styles.head} ${tab === 3 && styles.active}`}
                  >
                    Matic
                  </div>
                </div>
                {/* ----- Payment tabs on the top ends */}

                <div className={styles.content}>
                  {tab === 1 && (
                    <>
                      <div style={{ color: '#fff' }}>
                        Purchase ONE Rise collection crate containing 8 random
                        NFTs from the Rise Collection
                      </div>
                      <div style={{ paddingTop: 50 }}>
                        <Stripe
                          buttonDisabled={stripeButtonDisable}
                          setButtonDiabled={setStripButtonDisable}
                          amount={
                            popupData.userCoupon
                              ? popupData.userCoupon.price
                              : popupData?.data?.price
                          }
                          userCoupon={popupData.userCoupon}
                          name={popupData?.data?.name}
                          buttonText="PURCHASE"
                          redirectPageName={redirectPageName}
                          quantity={1}
                          lootCrateId={popupData?.data?._id}
                        />
                      </div>
                    </>
                  )}

                  {tab === 2 && (
                    <>
                      <div style={{ color: '#fff', paddingTop: '1rem' }}>
                        Purchase ONE Rise collection crate containing 8 random
                        NFTs from the Rise Collection
                      </div>
                      <div style={{ paddingTop: 50 }}>
                        <Paypal
                          amount={
                            popupData.userCoupon
                              ? popupData.userCoupon.price
                              : popupData?.data?.price
                          }
                          userCoupon={popupData.userCoupon}
                          lootCrateId={popupData.data._id}
                          onPaymentSuccess={popupData.onPaymentSuccess}
                        />
                      </div>
                    </>
                  )}

                  {tab === 3 && (
                    <>
                      <>
                        <div style={{ color: '#fff' }}>
                          Purchase ONE Rise collection crate containing 8 random
                          NFTs from the Rise Collection
                        </div>
                        <div className={styles.pricewrap}>
                          <div className={styles.txt}>Purchase amount:</div>
                          <div className={styles.price}>
                            {popupData.userCoupon
                              ? popupData.userCoupon?.cryptoPrice
                              : popupData?.data?.cryptoPrice
                                  .toLocaleString()
                                  .toString()}
                            {maticLogos('')}
                            &nbsp;
                          </div>
                        </div>

                        <div className={styles.btnwrap}>
                          <button
                            disabled={disabledMaticBuyButton}
                            onClick={() => {
                              if (disabledMaticBuyButton) return false;
                              if (walletDetails.walletType === 'venly') {
                                return venlyTransaction();
                              }
                              maticTransaction();
                            }}
                          >
                            {disabledMaticBuyButton ? 'LOADING...' : 'PURCHASE'}
                          </button>
                        </div>
                      </>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Popup;
