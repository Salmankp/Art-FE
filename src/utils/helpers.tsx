import React from 'react';
import Arakane, {
  ArkaneConnect,
  WindowMode,
  SecretType,
} from '@arkane-network/arkane-connect';
import { VenlyConnect } from '@venly/connect';
import {
  ConstructorOptions,
  AuthenticationResult,
} from '@arkane-network/arkane-connect/dist/src/connect/connect';
import Web3 from 'web3';
import { Tooltip } from '@material-ui/core';
import {
  maticIcon,
  greenLogo,
  orangeLogo,
  yellowLogo,
  redLogo,
  purpleLogo,
  skyblueLogo,
  blueLogo,
  whiteLogo,
} from '../assets';
import { UserAPI } from '../api/user';
import { AuthenticationStateActions } from '../redux/slices/AuthenticationState';
import { error } from './toast';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import PaintingRarity from '../types/painting/PaintingRarity';

import {
  checkEmail,
  checkReCaptcha,
  checkUsername,
  checkTerms,
} from './validate';
import { getAccountInformation, getWeb3 } from './web3';
import { SupportedWallets } from '../pages/Auth';

const { Venly } = require('@venly/web3-provider');

export type AuthenticationResponse = AuthenticationResult & {
  address: string | undefined;
};

export type ArtefyRegisterRequest = {
  username: string;
  email: string;
  termsAndCondition?: any;
  humanKey: string;
  walletAddress: string;
  walletType: string;
};

export const CREDENTIALS = {
  TEST_WIDGET: 'Testaccount',
  ARKANE_WIDGET: 'Artefy',
  CHAIN: 'MATIC',
};

declare global {
  interface Window {
    grecaptcha: any;
  }
}

let arkaneConnect;
let address;
let profile: AuthenticationResult;
let dispatch;

const Helper = () => {
  dispatch = useAppDispatch();
  return null;
};
export default Helper;

export const venlyOptions: ConstructorOptions =
  process.env.REACT_APP_ENVIRONMENT !== 'production'
    ? { windowMode: WindowMode.POPUP, environment: 'staging' }
    : { windowMode: WindowMode.POPUP };

export const venlyWidgetId =
  process.env.REACT_APP_ENVIRONMENT !== 'production'
    ? CREDENTIALS.TEST_WIDGET
    : CREDENTIALS.ARKANE_WIDGET;

export const getArkaneConnect = () => {
  if (!arkaneConnect) {
    // eslint-disable-next-line no-undef
    arkaneConnect = new VenlyConnect(venlyWidgetId, venlyOptions);
    // Avoid opening Venly wallet again and again
    // arkaneConnect.checkAuthenticated().then((result) =>
    //   result.notAuthenticated(() => {
    //     arkaneConnect.authenticate();
    //   }),
    // );
  }
  return arkaneConnect;
};

const initArakaneWidget = async (idpHint?: {
  idpHint: 'google' | 'facebook' | 'twitter';
}): Promise<AuthenticatorResponse | boolean> => {
  try {
    arkaneConnect = getArkaneConnect();
    const account = await arkaneConnect.flows.getAccount(CREDENTIALS.CHAIN, {
      idpHint,
    });
    address = account.wallets.find(
      (wallet) => wallet.balance?.symbol === CREDENTIALS.CHAIN,
    );

    dispatch(
      AuthenticationStateActions.set_walletDetails({
        walletType: 'venly',
        address,
        profile: account.isAuthenticated,
      }),
    );
    return { ...account, ...address };
  } catch (err) {
    console.error(err);
    error((err as any).message);
    return false;
  }
};

export const connect = async () => {
  const data = await getAccountInformation();
  const wallet = {
    accounts: data.accounts,
    primaryAccount: data.accounts[0],
    balance: data.balance,
  };
  return wallet;
};

export const checkMetaMaskNet = async () => {
  if (!window.ethereum) return;
  const chain = parseInt(
    await window.ethereum.request({ method: 'eth_chainId' }),
    10,
  );

  if (
    (process.env.REACT_APP_ENVIRONMENT === 'local' ||
      process.env.REACT_APP_ENVIRONMENT === 'development') &&
    chain !== 80001
  ) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      });
    } catch (e) {
      await addNetwork(80001);
    }
  }

  if (process.env.REACT_APP_ENVIRONMENT === 'production' && chain !== 137) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }],
      });
    } catch (e) {
      await addNetwork(137);
    }
  }
  return true;
};

export const saveLoginInfo = (data) => {
  window.localStorage.setItem('authToken', data.token);
  const profileStatus: any = { profileStatus: data?.user?.verified };
  const loginInformation = {
    authToken: data.token,
    userInfo: data?.user,
    profileStatus: data?.user?.verified,
  };
  dispatch(AuthenticationStateActions.set_logged_in(true));
  dispatch(AuthenticationStateActions.set_user_general_info(loginInformation));
};

export const register = async (data: ArtefyRegisterRequest) => {
  const {
    username,
    email,
    termsAndCondition,
    humanKey,
    walletAddress,
    walletType,
  } = data;
  if (!username) throw new Error('Please enter your username.');
  if (!checkEmail(email, email).status)
    throw new Error(checkEmail(email, email).message);
  if (!termsAndCondition)
    throw new Error('You need to accept terms and conditions');
  if (!checkReCaptcha(humanKey))
    throw new Error('Please verify you are not robot');

  const res = await UserAPI.register(
    username,
    email,
    walletAddress,
    walletType,
    humanKey,
  );
  if (res.success) {
    if (walletType === SupportedWallets.METAMASK) {
      return loginWithMetaMask();
    }
    if (walletType === SupportedWallets.VENLY) {
      return loginWithArakane();
    }
  } else {
    setTimeout(() => {
      window.grecaptcha.reset();
    }, 2000);
  }
};

export const registerFacebook = async (): Promise<
  AuthenticatorResponse | boolean
> => {
  return await initArakaneWidget({ idpHint: 'facebook' });
};

export const registerGoogle = async (): Promise<
  AuthenticatorResponse | boolean
> => {
  return await initArakaneWidget({ idpHint: 'google' });
};

export const registerTwitter = async (): Promise<
  AuthenticatorResponse | boolean
> => {
  return await initArakaneWidget({ idpHint: 'twitter' });
};

export const registerArakane = async (): Promise<
  AuthenticatorResponse | boolean
> => {
  return await initArakaneWidget();
};

export async function addNetwork(id) {
  let networkData;

  switch (id) {
    //  bsctestnet

    case 137:
      networkData = [
        {
          chainId: '0x89',
          chainName: 'Polygon',
          rpcUrls: ['https://polygon-rpc.com/'],
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
          },
          blockExplorerUrls: ['https://polygonscan.com/'],
        },
      ];

      break;

    //  bscmainet

    case 80001:
      networkData = [
        {
          chainId: '0x13881',
          chainName: 'MaticTest',
          rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18,
          },
          blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        },
      ];
      break;
    default:
      break;
  }

  //  agregar red o cambiar red

  return window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: networkData,
  });
}

const getNonceString = async (walletAddress, walletType) => {
  try {
    const res = await UserAPI.getUserNonce(walletAddress, walletType);
    if (!res?.data?.nonce) return '';
    const nonceString = `I am signing my one-time nonce for artefy.io: ${res.data.nonce}`;
    return nonceString;
  } catch (e) {
    console.log('getNonceString', e);
    throw e;
  }
};
const getUserNonceForMetaMask = async (
  walletAddress,
  walletType,
  isRegistrationRequest,
) => {
  try {
    if (isRegistrationRequest) return false;
    const nonceString = await getNonceString(walletAddress, walletType);
    if (!nonceString) return false;
    const web3 = await getWeb3();
    const signature = await web3.eth.personal.sign(
      web3.utils.fromUtf8(nonceString),
      walletAddress,
      (err, signature) => {
        if (err) return;
        return { walletAddress, signature };
      },
    );
    return signature;
  } catch (e) {
    console.log('getUserNonceForMetaMask', e);
    throw e;
  }
};

const getUserNonceForVenly = async (
  profile,
  walletType,
  isRegistrationRequest,
) => {
  if (isRegistrationRequest) return '';
  const nonceString = await getNonceString(profile.address, walletType);
  if (!nonceString) return false;
  const arkaneConnect = getArkaneConnect();
  const signer = await arkaneConnect.createSigner(WindowMode.POPUP, true);
  const signature = await signer.signMessage({
    walletId: profile.id,
    secretType: 'MATIC',
    data: nonceString,
  });
  return signature.result.signature;
};
export const loginWithArakane = async (
  profileAddress: any = '',
  isRegistrationRequest: any = false,
): Promise<any> => {
  try {
    let res;
    if (profileAddress) {
      const signature = await getUserNonceForVenly(
        profileAddress,
        SupportedWallets.VENLY,
        isRegistrationRequest,
      );
      res = await UserAPI.login(
        (profileAddress as any).address,
        SupportedWallets.VENLY,
        signature,
      );
    }
    if (!profileAddress) {
      const profile: any = await initArakaneWidget();
      const signature = await getUserNonceForVenly(
        profile,
        SupportedWallets.VENLY,
        isRegistrationRequest,
      );
      if (!profile) return false;
      res = await UserAPI.login(
        (profile as any).address,
        SupportedWallets.VENLY,
        signature,
      );
    }
    if (res.success) return saveLoginInfo(res.data);
    return res?.data?.token;
  } catch (err: any) {
    console.log('err', err);
    throw err;
  }
};

export const rarityColor = (rarity) => {
  switch (rarity.toLowerCase()) {
    case 'extraordinary':
      return '#F68D20';

    case 'masterpiece':
      return '#ED2425';

    case 'classic':
      return '#B35AFF';

    case 'rare':
      return '#01AAEC';

    case 'limited':
      return '#28419D';
  }
};

export const loginWithMetaMask = async (isRegistrationRequest: any = false) => {
  try {
    const walletInfo = await connect();
    const response = await checkMetaMaskNet();

    if (!response) return;
    const signature = await getUserNonceForMetaMask(
      walletInfo.primaryAccount,
      SupportedWallets.METAMASK,
      isRegistrationRequest,
    );

    const res = await UserAPI.login(
      walletInfo.primaryAccount,
      SupportedWallets.METAMASK,
      signature,
    );
    saveLoginInfo(res.data);
    return res?.data?.token;
  } catch (err: any) {
    console.log('err', err);
    throw err;
  }
};

export const signUpWithMetaMask = async () => {
  try {
    const walletInfo = await connect();
    const response = await checkMetaMaskNet();
    if (!response) return false;
    return walletInfo;
  } catch (e) {
    console.log('signUpWithMetaMask Error src/utils/helpers.tsx===> ', e);
    throw e;
  }
};

export const transferMetaMask = async (amount, toAddress) => {
  const web3 = await getWeb3();
  const value = web3.utils.toWei(amount, 'ether');
  const [currentMMWallet] = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  const transactionParameters = {
    from: currentMMWallet,
    to: toAddress,
    value,
  };
  try {
    const tnxHash = await web3.eth.sendTransaction(transactionParameters);
    return tnxHash;
  } catch (e: any) {
    return e?.message;
  }
};

export const transferVenly = async (price, address, toAddress) => {
  try {
    const arkaneConnect = getArkaneConnect();
    const signer = await arkaneConnect.createSigner();
    await signer.executeTransfer({
      walletId: address,
      to: toAddress,
      value: price,
      secretType: SecretType.MATIC,
    });
    return true;
  } catch (e) {
    console.log(`e :`, e);
    return false;
  }
};

export const rarityLogo = (rarity: string) => {
  if (rarity === PaintingRarity.Unique) return greenLogo;
  if (rarity === PaintingRarity.Legendary) return yellowLogo;
  if (rarity === PaintingRarity.Extraordinary) return orangeLogo;
  if (rarity === PaintingRarity.Masterpiece) return redLogo;
  if (rarity === PaintingRarity.Classic) return purpleLogo;
  if (rarity === PaintingRarity.Rare) return skyblueLogo;
  if (rarity === PaintingRarity.Limited) return blueLogo;
  if (rarity === PaintingRarity.Common) return whiteLogo;
};
export const maticLogo = (price) => {
  return (
    <>
      <span>
        {price}
        {'  '}
        <Tooltip title="MATIC" placement="top" arrow>
          <img
            src={maticIcon}
            alt="logo"
            style={{ width: '22px', height: '17px' }}
          />
        </Tooltip>
      </span>
    </>
  );
};
export const getArtistNames = (artists: any): string => {
  let finalNamesString = '';
  if (!artists?.length) return '';
  if (artists?.length === 1) return artists[0]?.name;
  artists?.forEach((artist, index) => {
    if (index === artists?.length - 1) {
      finalNamesString += `& ${artist?.name}`;
      return finalNamesString;
    }
    artists?.length === 2
      ? (finalNamesString += `${artist?.name} `)
      : (finalNamesString += `${artist?.name}, `);
  });
  return finalNamesString;
};

export const getArtistBio = (artists: any, decorate: boolean): string => {
  let finalNamesString = '';
  if (!artists?.length) return '';
  if (artists?.length === 1)
    return decorate
      ? `${artists[0].name.bold()}:<br> ${artists[0]?.bio}<br>`
      : `${artists[0].name}: ${artists[0]?.bio}`;
  artists?.forEach((artist, index) => {
    if (index === artists?.length - 1) {
      finalNamesString += decorate
        ? `${artist?.name.bold()}:<br> ${artist?.bio}<br>`
        : `${artist?.name}: ${artist?.bio}      `;
      return finalNamesString;
    }
    finalNamesString += decorate
      ? `${artist?.name.bold()}:<br> ${artist?.bio}<br>`
      : `${artist?.name}: ${artist?.bio}`;
  });
  return finalNamesString;
};

export const getVenlyWeb3Instance = async () => {
  const provider = await Venly.createProviderEngine({
    clientId: venlyWidgetId,
    secretType: 'MATIC',
    ...venlyOptions,
  });

  const web3 = new Web3(provider);
  return web3;
};
