import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { parse } from 'query-string';

import { BlockchainAPI } from '../api/blockchainAPI';
import { DropsAPI } from '../api/dropsAPI';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

import { TransactionStateActions } from '../redux/slices/TransactionState';
import { getAccountBalance, getDropDetails } from '../utils/dropDetails';
import { error, success } from '../utils/toast';
import { getWeb3 } from '../utils/web3';

import MainNavbar from './components/Navbar/MainNav';
import DropCard from './components/Drops/DropCard';
import DropCardSection, {
  RegisterContainer,
} from './components/Drops/DropCardSection';
import DropDetails from './components/Drops/DropDetails';
import ImageStack from './components/Drops/ImageStack';
import Modal from './components/Drops/Modal';
import StartCollection from './components/Drops/StartCollection';
import Footer from './components/Everscapes/Footer';
import { checkReCaptcha } from '../utils/validate';
import { OATSaleImplementation } from '../types/OATSaleImplementation';
import { OATSaleABI, OatSaleProxyAddress } from '../utils/config';

type stackType = 'everscapes' | 'artefy' | 'classic-club';

const Drops: React.FC<RouteComponentProps> = ({ location }) => {
  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );
  const dropDetails = useAppSelector(
    (state) => state.AuthenticationState.dropDetails,
  );
  const generated = useAppSelector(
    (state) => state.AuthenticationState.generated,
  );
  const userDetails = useAppSelector(
    (state) => state.AuthenticationState.userDetails,
  );

  const walletDetails = useAppSelector(
    (state) => state.AuthenticationState.walletDetails,
  );
  const dispatch = useAppDispatch();

  const queryParams = parse(location.search);
  const [dropId, setDropId] = useState<string>(queryParams.dropId as string);

  const history = useHistory();

  const [showModal, setShowModal] = useState<boolean>(false);
  // const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [, setShowErrorModal] = useState<boolean>(false);
  const [currentModalData, setCurrentModalData] = useState();
  const [balance, setBalance] = useState<number>(0);
  const [purchaseDone, setPurchaseDone] = useState<boolean>(false);

  useEffect(() => {
    if (history.location.state === 'top') {
      window.scrollTo(0, 0);
    }
  }, [history]);

  useEffect(() => {
    let mounted = true;
    if (loggedIn && mounted) {
      getDropDetails(dispatch, dropId, setDropId);
      getAccountBalance(setBalance, userDetails.address);
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, dropId, loggedIn, userDetails]);

  const modalToggleHandler = (data: any) => {
    setCurrentModalData({ ...data });
    setShowModal((prev) => !prev);
  };

  const purchaseRequest = async (data: any, captchaKey) => {
    let tokenData: any = '';
    const paintingID = data._id;
    for (const i of data.mints) {
      if (!i.sale.sold && i.sale.active) {
        tokenData = {
          tokenId: i.tokenId,
          mintId: i._id,
          crypto_price: i.sale.cryptoPrice,
        };
        break;
      }
    }

    if (generated) {
      try {
        const pass = prompt('Enter the password');

        const value = new BigNumber(tokenData.crypto_price)
          .multipliedBy(new BigNumber(10).pow(new BigNumber(18)))
          .toString();

        // start loader
        dispatch(TransactionStateActions.set_transactionState_started(true));
        await BlockchainAPI.purchaseArtwork(pass, value, tokenData.tokenId)
          .then((res) => {
            success('NFT purchased successfully');
            setPurchaseDone(true);
            return res;
          })
          .catch((err) => {
            error('Request not processed');
            throw err;
          });
        DropsAPI.sendBuyRequest(tokenData.mintId);

        // remove loader
        dispatch(TransactionStateActions.set_transactionState_ended(false));
        success('sucessfully purchased');
      } catch (error) {
        // remove loader
        dispatch(TransactionStateActions.set_transactionState_ended(false));
        console.error(error);
        setPurchaseDone(false);
      }
    } else {
      if (!checkReCaptcha(captchaKey)) return;
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (
          walletDetails.walletType !== 'venly' &&
          accounts[0] !== userDetails?.data?.walletAddress
        ) {
          error('Please switch to the registered metamask account');
          return;
        }

        const value = new BigNumber(tokenData.crypto_price)
          .multipliedBy(new BigNumber(10).pow(new BigNumber(18)))
          .toString();

        // add loader
        dispatch(TransactionStateActions.set_transactionState_started(true));

        const web3 = await getWeb3();

        const OATSaleImplementation = new web3.eth.Contract(
          OATSaleABI as any,
          OatSaleProxyAddress,
        ) as unknown as OATSaleImplementation;

        const painting = await DropsAPI.makeMintAvailbleForSale(paintingID);

        await OATSaleImplementation.methods
          .purchaseArtwork(painting.data.tokenId)
          .send({
            from:
              walletDetails.walletType === 'venly'
                ? walletDetails.address.address
                : accounts[0],
            value,
          })
          .once('confirmation', async (trnx) => {
            try {
              console.log('transaction hash', trnx);
              await DropsAPI.sendBuyRequest(tokenData.mintId);
              await DropsAPI.setMintStatus(
                tokenData.tokenId,
                true,
                'transactionHash',
              );
              setPurchaseDone(true);
              success('NFT purchased successfully');
            } catch (e) {
              error('Something went wrong try again later');
            }
          })
          .on('error', async (err) => {
            console.log('on error', err);
            await DropsAPI.setMintStatus(
              tokenData.tokenId,
              purchaseDone,
              'transactionHash',
            );
            error(err?.message);
            throw err;
          });
        // remove Loader
        dispatch(TransactionStateActions.set_transactionState_ended(false));
      } catch (err) {
        // remove loader
        setShowErrorModal(true);

        console.log('error in catch', err);
        dispatch(TransactionStateActions.set_transactionState_ended(false));
        console.error('error in error catch', err);

        error('This NFT has been purchased. Would you like to purchase other?');
      }
    }
  };

  return (
    <>
      <Modal
        {...currentModalData}
        showModal={showModal}
        modalToggle={() => setShowModal(false)}
        balance={balance}
        purchaseHandler={purchaseRequest}
        purchaseState={purchaseDone}
        purchaseStateHandler={() => setPurchaseDone(false)}
      />
      <MainNavbar />
      <ImageStack type={queryParams.world as stackType} />
      <DropCard
        data={{
          world: queryParams.world as stackType,
          description: dropDetails?.description,
          dropName: dropDetails?.name.toUpperCase(),
          details: [
            `${dropDetails?.paintings?.length} Collectables`,
            `${dropDetails?.artists?.length} Artists`,
            `${dropDetails?.collections?.length} Collections`,
            'Direct Sale',
          ],
        }}
      />
      <DropCardSection type={queryParams.world as stackType} />
      <StartCollection />
      <DropDetails payableModalHandler={modalToggleHandler} />
      <RegisterContainer />
      <Footer />
    </>
  );
};

export default Drops;
