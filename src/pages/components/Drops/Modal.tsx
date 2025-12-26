import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { SecretType } from '@arkane-network/arkane-connect';
import styles from '../styles/Drops/ModalsDrops.module.scss';
import { error, success } from '../../../utils/toast';
import classes from '../styles/Auth/Form.module.scss';
import { getArkaneConnect, maticLogo } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { TransactionStateActions } from '../../../redux/slices/TransactionState';
import { getContract } from '../../../utils/getContractInstance';
import { DropsAPI } from '../../../api/dropsAPI';
import { OatProxyAddress } from '../../../utils/config';
// import Stripe from './StripeModal';

const API_LINK = process.env.REACT_APP_BASE_URL;

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

const Paypal: React.FC<{
  purchaseStatus: boolean;
  amount: number;
  purchaseHandler: () => void;
  mints: any;
  verifyCaptcha: any;
  expireCaptcha: any;
  humanKey: any;
}> = (props) => {
  let mintId: any;
  for (const i of props.mints) {
    if (!i.sale.sold && i.sale.active) {
      mintId = i._id;
      break;
    }
  }

  const paypal = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: () => {
          return axios
            .post(
              `${API_LINK}transact/${mintId}/createOrder`,
              {},
              {
                headers: {
                  'x-auth-token': localStorage.getItem('authToken'),
                },
              },
            )
            .then((res) => res.data.orderID);
        },
        onApprove: async (data: any) => {
          const orderRes = await axios
            .post(
              `${API_LINK}transact/${mintId}/getOrderDetails`,
              {
                orderID: data.orderID,
              },
              {
                headers: {
                  'x-auth-token': localStorage.getItem('authToken'),
                },
              },
            )
            .then((res) => {
              if (res.statusText === 'OK') success('Transaction Successful');
            });
        },
        onError: (err) => {
          error('Transaction not success, Refresh and try again!');
          console.error(err);
        },
      })
      .render(paypal.current);
  }, [mintId]);

  return (
    <div className={styles.PayPalContainer}>
      <div>
        <div ref={paypal} />
      </div>
      {!props.purchaseStatus ? (
        <div className={styles.amountContainer}>
          <p>Purchase amount:</p>
          <p>
            <span>$</span>
            {props.amount?.toLocaleString().toString()}
          </p>
        </div>
      ) : (
        <p className={styles.purchaseCompleteText}>
          Purchase completed successfully.
        </p>
      )}
      <div className={styles.btnContainer}>
        {props.purchaseStatus && <p>NFT has been added to your wallet</p>}
      </div>
    </div>
  );
};

const Matic: React.FC<{
  purchaseStatus: boolean;
  amount: number;
  purchaseHandler: (captchaKey) => void;
  balance: number;
  isUser: any;
  verificationFunc: any;
  verifyCaptcha: any;
  expireCaptcha: any;
  humanKey: any;
}> = (props) => {
  const canPurchaseHandler = () => props.amount > props.balance;
  const Maticbalance = props?.amount?.toLocaleString().toString();
  const MaticBalance = () => maticLogo(props.balance);
  return (
    <div className={styles.MaticContainer}>
      {!props.purchaseStatus && (
        <div className={styles.balanceContainer}>
          <p>YOUR BALANCE</p>

          <div className={styles.container}>
            {canPurchaseHandler()
              ? 'YOU HAVE INSUFFICIENT FUNDS IN YOUR WALLET'
              : MaticBalance()}
          </div>
        </div>
      )}
      {!props.purchaseStatus ? (
        <div className={styles.amountContainer}>
          <p>Purchase amounts:</p>
          {maticLogo(Maticbalance)}
        </div>
      ) : (
        <p className={styles.purchaseCompleteText}>
          Purchase completed successfully.
        </p>
      )}
      <div className={styles.btnContainer}>
        {props.purchaseStatus && <p>NFT has been added to your wallet</p>}

        <div className={classes.dropsCaptchaClass}>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_CLIENT_KEY}
            onChange={props.verifyCaptcha}
            onExpired={props.expireCaptcha}
          />
        </div>
        {props.isUser && (
          <button
            onClick={() => props.purchaseHandler(props.humanKey)}
            style={{
              width: `${props.purchaseStatus && '100%'}`,
              cursor: 'pointer',
            }}
            disabled={props?.amount > props?.balance}
          >
            {console.log('props.purchaseStatus', props.purchaseStatus)}
            {props.purchaseStatus ? 'SEE NFT IN DASHBOARD' : 'PURCHASE'}
          </button>
        )}
      </div>
    </div>
  );
};

const Modal: React.FC<any> = (props) => {
  const [currentNav, setCurrentNav] = React.useState<
    'Matic' | 'Paypal' | 'Stripe'
  >('Matic');
  const [humanKey, setHumanKey] = React.useState<string>('');
  const [userData, setUserData] = React.useState<any>();
  const [contracts, setContracts] = React.useState<any>();
  const [walletAddress, setWalletAddress] = React.useState<any>();

  const arkaneConnect = getArkaneConnect();

  const walletDetails = useAppSelector(
    (state) => state.AuthenticationState.walletDetails,
  );
  const dispatch = useAppDispatch();

  const userInformation = useAppSelector(
    (state) => state.AuthenticationState.userGeneralInfo,
  );

  useEffect(() => {
    if (userInformation) {
      setUserData(userInformation?.userInfo);
    }
  }, []);

  const checkIfVerify = () => {
    error('Please verify you account.');
  };
  console.log('props =====', props);

  const verifyCaptcha = (res) => {
    console.log('res', res);
    if (res) {
      setHumanKey(res);
    }
  };
  const expireCaptcha = () => {
    setHumanKey('');
    setTimeout(() => {
      window.grecaptcha.reset();
    }, 2000);
  };

  useEffect(() => {
    const init = async () => {
      const isAuth = await arkaneConnect.checkAuthenticated();
      if (
        isAuth.isAuthenticated &&
        userInformation?.userInfo &&
        walletDetails.walletType === 'venly'
      ) {
        setContracts(await getContract());
        setWalletAddress(walletDetails.address.id);
      }
    };
    init();
  }, []);

  const transferViaVenly = async () => {
    dispatch(TransactionStateActions.set_transactionState_started(true));
    const mint = props.mints.filter(
      (mint) => !mint.sale.sold && mint.sale.active,
    )[0];

    console.log('MINT: ', mint);

    const signer = await arkaneConnect.createSigner();
    // (signer as any).popup.close();
    console.log(signer);

    await signer.executeContract({
      secretType: SecretType.MATIC,
      walletId: walletDetails?.address?.id,
      to: OatProxyAddress,
      value: mint.sale.price,
      functionName: 'purchaseArtwork',
      inputs: [{ type: 'uint256', value: mint.tokenId }],
    });

    console.log('Signer exectued : ');

    await DropsAPI.sendBuyRequest(mint._id);

    // remove Loader
    dispatch(TransactionStateActions.set_transactionState_ended(false));
    success('successfully purchased');
  };

  return (
    <>
      {props.showModal && (
        <div className={styles.ModalContainer}>
          <div className={styles.backdrop} onClick={props.modalToggle} />
          <div className={styles.DataContainer}>
            <div className={styles.leftContainer}>
              <p>{props.artist.name}</p>
              <p className={styles.bold}>{props.title}</p>
              {props.fractionalOwnership === 'true' && (
                <p className={styles.fractionalData}>
                  Auction includes ownership of original artwork
                </p>
              )}
              <img src={props.image} alt={props.title} />
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.navContainer}>
                <p
                  className={currentNav === 'Matic' ? styles.active : ''}
                  onClick={() => {
                    props.purchaseStateHandler();
                    setCurrentNav('Matic');
                  }}
                >
                  MATIC
                </p>
                <p
                  className={currentNav === 'Paypal' ? styles.active : ''}
                  onClick={() => {
                    props.purchaseStateHandler();
                    setCurrentNav('Paypal');
                  }}
                >
                  PAYPAL
                </p>

                <p
                  className={currentNav === 'Stripe' ? styles.active : ''}
                  onClick={() => {
                    props.purchaseStateHandler();
                    setCurrentNav('Stripe');
                  }}
                >
                  STRIPE
                </p>
              </div>
              {currentNav === 'Matic' && (
                <Matic
                  purchaseHandler={() => {
                    try {
                      if (walletDetails.walletType === 'venly') {
                        transferViaVenly();
                        return;
                      }

                      props.purchaseHandler(props, humanKey);
                    } catch (err) {
                      error((err as any).message);
                    }
                  }}
                  purchaseStatus={props.purchaseState}
                  amount={props.minCryptoPrice}
                  balance={props.balance}
                  isUser={userData}
                  verificationFunc={checkIfVerify}
                  verifyCaptcha={verifyCaptcha}
                  expireCaptcha={expireCaptcha}
                  humanKey={humanKey}
                />
              )}
              {currentNav === 'Paypal' && (
                <Paypal
                  purchaseHandler={() => {
                    props.purchaseHandler(props, 'Paypal');
                  }}
                  purchaseStatus={props.purchaseState}
                  amount={props.minPrice}
                  mints={props.mints}
                  verifyCaptcha={verifyCaptcha}
                  expireCaptcha={expireCaptcha}
                  humanKey={humanKey}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
