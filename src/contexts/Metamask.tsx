import React, { useState, createContext, useContext } from 'react';
import { getAccountInformation } from '../utils/web3';

import { error } from '../utils/toast';

interface MetamaskContext {
  user: {
    accounts: string[];
    balance: string | undefined;
    primaryAccount: string;
  };
  connect: () => void;
}

interface MetamaskProviderProps {
  children: JSX.Element;
}

const Metamask = createContext<MetamaskContext>({
  user: {
    accounts: [],
    balance: '0',
    primaryAccount: '',
  },
  connect: () => {},
});

const MetamaskProvider = (props: MetamaskProviderProps) => {
  const [addresses, setAdresses] = useState<string[]>([]);
  const [balance, setBalance] = useState<string>();

  async function checkNetwork() {
    if (!window.ethereum) return;
    const chain = parseInt(
      await window.ethereum.request({ method: 'eth_chainId' }),
      10,
    );
    if (!(chain === 80001 || chain === 137)) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }],
        });
        window.location.reload();
      } catch (e) {
        error('Please switch to Matic network');
      }
    }
  }

  async function connect() {
    const data = await getAccountInformation();
    setAdresses(data?.accounts);
    setBalance(data?.balance);
    await checkNetwork();
  }

  const wallet = {
    user: { accounts: addresses, primaryAccount: addresses[0], balance },
    connect,
  };
  return <Metamask.Provider value={wallet}>{props.children}</Metamask.Provider>;
};

export const useMetamask = () => {
  return useContext(Metamask);
};

export default MetamaskProvider;
