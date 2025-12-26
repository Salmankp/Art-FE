import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import BigNumber from 'bignumber.js';
import { ErrorStateActions } from 'redux/slices/ErrorState';
import { SuccessStateActions } from 'redux/slices/SuccessState';
import { maticLogos } from '../MarketPlaceStatic/Main';
import styles from '../styles/DropNew/Popup.module.scss';
import { cross } from '../../../assets';
import { error } from '../../../utils/toast';
import { getArkaneConnect, getArtistNames } from '../../../utils/helpers';
import { TransactionStateActions } from '../../../redux/slices/TransactionState';
import { getWeb3, getNetworkId } from '../../../utils/web3';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { DropsAPI } from '../../../api/dropsAPI';
import Stripe from '../Drops/StripeModal';
import Paypal from '../Drops/PaypalModal';
import showSuccessErrorModel from '../crateCollection/helpers/ShowSuccessErrorModel';

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
    onPaymentSuccess?: (val: boolean) => void;
  };
}

const Popup = ({ popupData }: dropCardProps) => {
  // TODO: REMOVE_FOR_GOLIVE
  let redirectPageName = window.location.pathname;
  const isTestPage = window.location.pathname === '/drop/horror-launch-test';

  if (isTestPage) {
    popupData.data.id =
      process.env.REACT_APP_ENVIRONMENT !== 'production'
        ? '61687f8bebe3159f2ac99ca3'
        : '6155151105e64b00147a782a';
    redirectPageName = 'drop/horror-launch-test';
  }

  const dispatch = useAppDispatch();
  const [purchaseDone, setPurchaseDone] = useState<boolean>(false);
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

  const getPaintingDataForTransaction = async (mintObj) => {
    const web3 = await getWeb3();
    const orderDetails = `${userDetails.userInfo.id}|${popupData.data.id}|${mintObj.tokenId}`;
    const orderDetailHex = web3.utils.toHex(orderDetails);
    return orderDetailHex;
  };

  // for venly payment
  const venlyTransaction = async () => {
    let mintObj;
    try {
      setDisabledMaticBuyButton(true);
      dispatch(TransactionStateActions.set_transactionState_started(true));
      mintObj = await (
        await DropsAPI.makeMintAvailbleForSale(popupData.data.id)
      )?.data?.data;
      console.log('mintObj', mintObj);
    } catch (e) {
      console.error(e);
      setDisabledMaticBuyButton(false);
      showSuccessErrorModel(
        dispatch,
        'NFT already purchased by someone else, Try with another Painting',
        ErrorStateActions.setErrorMessage,
        ErrorStateActions.setErrorModal,
      );
      // error('NFT already purchased by someone else, Try with another Painting');
    }
    try {
      if (mintObj) {
        const signer = await arkaneConnect.createSigner();

        const walletBalance = await arkaneConnect.api.getBalance(
          walletDetails.address.id,
        );
        console.log('walletDetails ======', walletBalance.balance);
        if (walletBalance.balance < popupData.data.cryptoPrice) {
          if (arkaneConnect.isPopupSigner(signer)) {
            signer.closePopup();
          }
          setDisabledMaticBuyButton(false);
          return showSuccessErrorModel(
            dispatch,
            'Your account balance is less',
            ErrorStateActions.setErrorMessage,
            ErrorStateActions.setErrorModal,
          );
          // return error('Your account balance is less');
        }
        const adminWalletAddress = process.env.REACT_APP_ADMIN_WALLET;
        const orderDetails = `${userDetails.userInfo.id}|${popupData.data.id}|${mintObj.tokenId}`;
        const transactionData = await signer.executeTransfer({
          walletId: walletDetails.address.id,
          to: adminWalletAddress,
          value: popupData.data.cryptoPrice,
          secretType: 'MATIC',
          data: orderDetails,
        });
        console.log('transactionData ===', transactionData);
        if (arkaneConnect.isPopupSigner(signer)) {
          signer.closePopup();
        }
        if (transactionData.status === 'SUCCESS') {
          setDisabledMaticBuyButton(false);

          showSuccessErrorModel(
            dispatch,
            'Your NFT will be processed soon',
            SuccessStateActions.setSuccessMessage,
            SuccessStateActions.setSuccessModal,
          );
          DropsAPI.checkoutMatic(
            transactionData.result,
            mintObj.mint.tokenId,
            popupData.data.cryptoPrice,
            mintObj.mint.paintingID,
          );
          dispatch(TransactionStateActions.set_transactionState_ended(false));
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
  const metaMaskTransaction = async (data, mint, value) => {
    try {
      const web3 = await getWeb3();
      await web3.eth
        .sendTransaction(data)
        .on('transactionHash', async (data) => {
          setDisabledMaticBuyButton(false);
          showSuccessErrorModel(
            dispatch,
            'Your NFT will be processed soon',
            SuccessStateActions.setSuccessMessage,
            SuccessStateActions.setSuccessModal,
          );
          const transactionData = { transactionHash: data };
          await DropsAPI.checkoutMatic(
            transactionData,
            mint.tokenId,
            value,
            mint.paintingID,
          );
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
          metaMaskTransaction(data, mint, value);
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
      const paintingPurchasePrice = popupData.data.cryptoPrice;

      const value = new BigNumber(paintingPurchasePrice)
        .multipliedBy(new BigNumber(10).pow(new BigNumber(18)))
        .toString();

      // TODO: Price should be added to validate here
      const mintData = await DropsAPI.makeMintAvailbleForSale(
        popupData.data.id,
      );
      const mintObj = mintData.data.data;
      const adminWalletAddress = process.env.REACT_APP_ADMIN_WALLET;
      console.log(value, `${popupData.data.cryptoPrice}`, mintObj);
      const orderDetailData = await getPaintingDataForTransaction(mintObj.mint);
      const metaMaskTransactionData = {
        from: metamaskWalledAddress,
        to: adminWalletAddress,
        value,
        data: orderDetailData,
      };

      if (mintObj) {
        return metaMaskTransaction(
          metaMaskTransactionData,
          mintObj.mint,
          value,
        );
      }
    } catch (err: any) {
      setPurchaseDone(false);
      dispatch(TransactionStateActions.set_transactionState_ended(false));
      if (err?.response.data?.message) {
        setDisabledMaticBuyButton(false);
        return error(err?.response.data?.message);
      }
    }
  };

  const [tab, setTab] = useState(1);
  const canPurchaseHandler = () =>
    popupData.data.amount > popupData.data.balance;
  const [paintingPaymentPopup, setPaintingPaymentPopup] = useState(true);
  // const [isPurchaseLoading, setPurchaseLoading] = useState(false);
  const history = useHistory();
  const maticCryptoPrice = popupData.data.cryptoPrice || '';
  const purchaseData =
    maticCryptoPrice && maticCryptoPrice.toLocaleString().toString();
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
              <div className={styles.title1}>
                {getArtistNames(popupData?.data?.artist || [])}
              </div>
              <div className={styles.title2}>{popupData.data.name}</div>
              {tab < 3 && (
                <div className={styles.price}>
                  {popupData.data.price}
                  USDs
                </div>
              )}
              {tab === 3 && (
                <div className={styles.price}>
                  {maticLogos(maticCryptoPrice)}
                </div>
              )}
            </div>
            <div className={styles.img}>
              <img src={popupData.data.previewUrl} alt={popupData.data.name} />
            </div>
          </div>
          {/* ----- Popup header ends */}

          <div className={styles.second}>
            {paintingPaymentPopup && !popupData.paymentSuccess ? (
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
                    MATIC
                  </div>
                </div>
                {/* ----- Payment tabs on the top ends */}

                <div className={styles.content}>
                  {/* ----- Stripe tab body starts */}
                  {tab === 1 && (
                    <>
                      <div style={{ paddingTop: 50 }}>
                        <Stripe
                          amount={popupData.data.price}
                          name={popupData.data.name}
                          buttonText="PURCHASE"
                          redirectPageName={redirectPageName}
                          quantity={1}
                          paintingId={popupData.data.id}
                        />
                      </div>
                    </>
                  )}
                  {/* ----- Stripe tab body ends */}

                  {/* ----- Paypal tab body starts */}
                  {tab === 2 && (
                    <>
                      <div style={{ paddingTop: 50 }}>
                        <Paypal
                          amount={popupData.data.price}
                          mints={popupData.data.mints}
                          paintingId={popupData.data.id}
                          onPaymentSuccess={popupData.onPaymentSuccess}
                        />
                      </div>
                    </>
                  )}
                  {/* ----- Paypal tab body ends */}

                  {/* ----- Matic tab body starts */}
                  {tab === 3 && (
                    <>
                      <>
                        <div className={styles.pricewrap}>
                          <div className={styles.txt}>Purchase amount:</div>
                          <div className={styles.price}>
                            {maticLogos(purchaseData)}
                          </div>
                        </div>
                        {/* ----- Matic price show ends */}

                        {/* ----- Matic purchase buttom starts */}
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

                      {/* ----- Matic price show starts */}

                      {/* ----- Matic purchase buttom ends */}
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.congWrap}>
                <div className={styles.title}> CONGRATULATIONS</div>
                <div className={styles.cntnt1}>
                  Purchase completed successfully.
                  <div className={styles.cntnt2}>
                    Purchase ONE Rise collection crate containing 8 random NFTs
                    from the Rise collection
                  </div>
                </div>
                <div className={styles.cntnt2}>
                  Your NFT will be added to your wallet within 30 minutes
                  depending on network traffic.
                </div>
                <button
                  onClick={() => {
                    popupData.setPopup(false);
                    history.push(redirectPageName);
                  }}
                >
                  TAKE ME BACK TO THE LIVE DROPS!
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Popup;
