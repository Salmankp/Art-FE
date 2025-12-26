import Container, { Service } from 'typedi';
import Web3 from 'web3';

@Service()
export class Web3Instance {
  protected instance: Web3 | null = null;

  async getWeb3(): Promise<Web3 | null> {
    if (!this.instance) {
      if (window.ethereum) {
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        this.instance = new Web3(window.ethereum);
      } else {
        this.instance = new Web3('https://rpc-mumbai.maticvigil.com');
      }
    }
    return this.instance;
  }
}

export async function getWeb3(): Promise<any> {
  return Container.get(Web3Instance).getWeb3();
}

export async function getAccounts() {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return accounts;
}

export async function getBalance(address: string): Promise<any> {
  const web3 = await getWeb3();
  return web3.utils.fromWei(await web3.eth.getBalance(address));
}

export async function getNetworkId(): Promise<any> {
  const web3 = await getWeb3();
  return web3.eth.net.getId();
}

export async function getAccountInformation(
  generatedAddress?: string,
): Promise<{
  accounts: string[];
  balance: string;
}> {
  let accounts: string[] = [];
  let balance = '0';
  try {
    accounts = await getAccounts();
    balance = await getBalance(generatedAddress || accounts[0]);
  } catch (err: any) {
    console.error(err);
    if (err?.code === 4001) {
      alert('Please connect wallet to continue');
    }
  }
  return { accounts, balance };
}
