import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import styles from '../styles/dashboard/Hero.module.scss';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { info, success, error } from '../../../utils/toast';
import { AuthenticationStateActions } from '../../../redux/slices/AuthenticationState';
import { wallet, refresh, infoImg } from '../../../assets';
import { getBalance } from '../../../utils/web3';
import { transferMetaMask, transferVenly } from '../../../utils/helpers';
import { checkAmount, checkWalletAddress } from '../../../utils/validate';
import { SupportedWallets } from '../../Auth';
import {
  MATIC_TRANSFER_NOT_SUCCESS,
  MATIC_TRANSFER_SUCCESS,
} from '../../../utils/constants';

interface WalletProps {
  data: any;
  onRefreshClick: () => void;
  onAmountChange: (value) => void;
  onUserWalletAddress: (value) => void;
  onFundTransfer: () => void;
  checkIfVerify: () => void;
  copyToClipBoard: () => void;
}

const Wallet: React.FC<WalletProps> = ({
  data,
  onRefreshClick,
  onAmountChange,
  onUserWalletAddress,
  onFundTransfer,
  checkIfVerify,
  copyToClipBoard,
}) => {
  const balance = data?.balance || 0;
  const refreshingTime = data?.refreshingTime || '00:00';
  const amount = data?.amount || '';
  const userWalletAddress = data?.userWalletAddress || '';
  const userData = data?.userData || '';

  return (
    <div className={styles.grid2}>
      <div className={styles.heading}>
        {' '}
        <span>Wallet</span>
        <img src={wallet} alt="vector" />
      </div>
      <hr className={styles.rule} />
      <div className={styles.row}>
        <span className={styles.title}> MATIC Balance</span>
        <span className={styles.value}>{`${balance} MATIC`}</span>
      </div>
      <div className={styles.lastrefresh}>
        <div className={styles.refbtn}>
          <button onClick={onRefreshClick}>
            <img src={refresh} alt="refresh" />
          </button>
        </div>
        <div className={styles.refwrap}>
          <span>Last Refresh:</span>
          {refreshingTime}
        </div>
      </div>
      <hr />
      <div className={styles.input}>
        <div className={styles.text}>
          To send MATIC enter the amount and the recipient wallet address below
          and press send.
        </div>
        <div className={styles.input1}>
          <input
            type="number"
            value={amount}
            className={styles.amount}
            placeholder="Amount To Send"
            min={0}
            onChange={(e) => onAmountChange(e.target.value)}
          />
          <input
            type="text"
            value={userWalletAddress}
            className={styles.address}
            placeholder="Address to send"
            onChange={(e) => onUserWalletAddress(e.target.value)}
          />
          {userData && !userData?.verified && (
            <button className={styles.send} onClick={checkIfVerify}>
              Send
            </button>
          )}
          {userData && userData?.verified && (
            <button className={styles.send} onClick={onFundTransfer}>
              Send
            </button>
          )}
        </div>

        <div className={styles.text}>
          To receive MATIC copy and share your wallet address below with your
          payer.
        </div>
        <div className={styles.input2}>
          <input
            type="text"
            className={styles.id}
            placeholder="dhaiuysdtausdgaiuyweiqii32u89rwe9dsai674"
            defaultValue={userData?.walletAddress}
          />
          <button className={styles.copy} onClick={copyToClipBoard}>
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

const WalletInfo: React.FC<{ onRefreshClick: any }> = ({ onRefreshClick }) => {
  const userDetails = useAppSelector(
    (state) => state.AuthenticationState.userDetails,
  );

  const userPaintings = useAppSelector(
    (state) => state.AuthenticationState.userPaintings,
  );

  const userInformation = useAppSelector(
    (state) => state.AuthenticationState.userGeneralInfo,
  );

  const walletData = useAppSelector(
    (state) => state.AuthenticationState.walletDetails,
  );

  const userListedPaintingsCount = useAppSelector(
    (state) => state.AuthenticationState.userListedPaintingsCount,
  );

  const userData = userInformation?.userInfo || '';
  const counts = userPaintings?.count || '';

  const dispatch = useAppDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [refreshingTime, setRefreshingTime] = useState<any>('');
  const [amount, setAmount] = useState<any>('');
  const [userWalletAddress, setUserWalletAddress] = useState<any>();
  const [balance, setBalance] = useState<any>(0);
  const [isRefresh, setIsRefresh] = useState<any>(false);

  const setUserBalance = async () => {
    if (!userDetails.data) return;
    if (walletData.walletType === 'venly') {
      const { balance } = walletData?.address?.balance || 0;
      setBalance((+balance).toFixed(4));
      return;
    }
    if (walletData.walletType === 'metamask') {
      const { balance } = walletData?.address?.balance || 0;
      setBalance((+balance).toFixed(4));
      return;
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const balance = await getBalance(accounts[0]);
    setBalance((+balance).toFixed(4));
  };

  useEffect(() => {
    setUserBalance();
  }, [userInformation]);

  const logOut = () => {
    localStorage.clear();
    dispatch(AuthenticationStateActions.set_logged_in(false));
    dispatch(AuthenticationStateActions.set_walletDetails({}));
    history.push('/auth');
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(userData?.walletAddress);
    info('Copied to clipboard');
  };

  const checkIfVerify = () => {
    error('Please verify you account.');
  };

  const getRefreshTime = () => {
    setUserBalance();
    const refreshTime = new Date().toLocaleTimeString();
    setRefreshingTime(refreshTime);
  };

  const transferFund = async () => {
    if (!checkAmount(amount)) return;
    if (!checkWalletAddress(userWalletAddress)) return;
    console.log('CheckForNotValidAddress ===========');
    const type = userDetails?.data;
    const address = walletData?.address?.id;
    const price = amount.toString();
    if (type?.walletType === SupportedWallets.METAMASK) {
      const tnxHash = await transferMetaMask(price, userWalletAddress);
      if (typeof tnxHash === 'object') {
        success(MATIC_TRANSFER_SUCCESS);
        setUserBalance();
        return;
      }
      error(tnxHash);
      return;
    }
    if (type?.walletType === SupportedWallets.VENLY) {
      const signer = await transferVenly(price, address, userWalletAddress);
      if (signer) {
        success(MATIC_TRANSFER_SUCCESS);
        setUserBalance();
      } else {
        error(MATIC_TRANSFER_NOT_SUCCESS);
      }
    }
  };

  const UserInfoContainer: React.FC = () => {
    return (
      <div className={styles.grid1}>
        <div className={styles.name}>{userData?.username}</div>
        <div className={`${styles.id} ${styles.txt}`}>
          <span>{userData?.walletAddress}</span>
        </div>
        <div className={styles.table}>
          <div className={styles.wrapper}>
            <div className={styles.row}>Owned NFTs</div>
            <div className={styles.value}>{counts?.nftCount || '0'}</div>
          </div>
          <hr />
          <div className={styles.wrapper}>
            <div className={styles.row}>Listed NFTs</div>
            <div className={styles.value}>
              {userListedPaintingsCount || '0'}
            </div>
          </div>
          <hr />
          <div className={styles.wrapper}>
            <div className={styles.row}>Artists</div>
            <div className={styles.value}>{counts?.artistCount || '0'}</div>
          </div>
          <hr />
          <div className={styles.wrapper}>
            <div className={styles.row}>Collections</div>
            <img className={styles.infoIcon2} src={infoImg} alt="N/A" />
            <div className={styles.tooltipWrapper2}>
              <p>
                No. of collections that you have bought at least one asset from.
              </p>
            </div>
            <div className={styles.value}>{counts?.collectionCount || '0'}</div>
          </div>
          <hr />
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <div>Completed</div>
            </div>
            <img className={styles.infoIcon} src={infoImg} alt="N/A" />
            <div className={styles.tooltipWrapper}>
              <p>Number of completed collections</p>
            </div>
            <div
              className={counts?.completed ? styles.completed : styles.value}
            >
              {counts?.completed || '0'}
            </div>
          </div>
        </div>
        <button onClick={logOut}>Log Out</button>
      </div>
    );
  };

  const walletInfo = {
    balance,
    refreshingTime,
    amount,
    userWalletAddress,
    userData,
  };

  return (
    <Container>
      <div className={styles.container}>
        <UserInfoContainer />
        <Wallet
          data={walletInfo}
          onRefreshClick={() => {
            setIsRefresh(true);
            getRefreshTime();
            onRefreshClick();
          }}
          onAmountChange={(value) => setAmount(value)}
          onUserWalletAddress={(value) => setUserWalletAddress(value)}
          onFundTransfer={transferFund}
          checkIfVerify={checkIfVerify}
          copyToClipBoard={copyToClipBoard}
        />
      </div>
    </Container>
  );
};

export default WalletInfo;
