import axios from 'axios';

import Web3 from 'web3';
import { OATMarketplaceProxyAddress, OatProxyAddress } from './config';
import MarketPlaceABI from '../contracts/OATMarketPlaceImplementation.json';
import OATContractABI from '../contracts/OATImplementation.json';
import { checkMetaMaskNet, getVenlyWeb3Instance } from './helpers';

export const getMarketplaceContract = async (web3) => {
  const { abi } = MarketPlaceABI;
  const marketplaceContract = new web3.eth.Contract(
    abi,
    OATMarketplaceProxyAddress,
  );
  return marketplaceContract;
};

const getWeb3 = () => {
  let instance;
  if (window.ethereum) {
    instance = new Web3(window.ethereum);
  } else {
    instance = new Web3('https://rpc-mumbai.maticvigil.com');
  }

  return instance;
};

export const getOATContract = async (web3) => {
  const { abi } = OATContractABI;
  const OATContract = new web3.eth.Contract(abi, OatProxyAddress);
  return OATContract;
};

export const getGasPriceFromPolygon = async () => {
  const gasStationResponse = await axios.get(
    'https://gasstation-mainnet.matic.network/',
  );
  if (gasStationResponse?.status === 200) {
    return gasStationResponse?.data?.fastest;
  }
  return undefined;
};

const getNftApproved = async (mintTokenId, account, web3) => {
  const OATContract = await getOATContract(web3);
  const isAlreadyApproved = await OATContract.methods
    .getApproved(mintTokenId)
    .call();
  const gasStationPrice = await getGasPriceFromPolygon();
  const gasPriceToWei = web3.utils.toWei(gasStationPrice.toString(), 'gwei');
  if (
    isAlreadyApproved.toLowerCase() !== OATMarketplaceProxyAddress.toLowerCase()
  ) {
    const estimateGas = await OATContract.methods
      .approve(OATMarketplaceProxyAddress, mintTokenId)
      .estimateGas({ from: account });
    const approved = await OATContract.methods
      .approve(OATMarketplaceProxyAddress, mintTokenId)
      .send({ from: account, gas: estimateGas, gasPrice: gasPriceToWei });

    if (approved?.events?.Approval) {
      return true;
    }
    return false;
  }
  return true;
};

export const addNftToMarketplace = async (
  mintTokenId,
  maticPrice,
  serviceFee,
  walletType,
) => {
  try {
    await checkMetaMaskNet();
    const web3 =
      walletType === 'venly' ? await getVenlyWeb3Instance() : getWeb3();
    const contract = await getMarketplaceContract(web3);
    const accounts = await web3.eth.getAccounts();
    const valueToWei = await web3.utils.toWei(maticPrice);
    const serviceFeeInWei = await web3.utils.toWei(serviceFee.toString());

    const isNFTApproved = await getNftApproved(mintTokenId, accounts[0], web3);
    if (isNFTApproved) {
      const gasStationPrice = await getGasPriceFromPolygon();
      const gasPriceToWei = web3.utils.toWei(
        gasStationPrice.toString(),
        'gwei',
      );
      const estimateGas = await contract.methods
        .listNft(mintTokenId, valueToWei, BigInt(serviceFeeInWei))
        .estimateGas({ from: accounts[0] });
      const addedNftResult = await contract.methods
        .listNft(mintTokenId, valueToWei, BigInt(serviceFeeInWei))
        .send({
          from: accounts[0],
          gas: estimateGas,
          gasPrice: gasPriceToWei,
        });
      console.log(
        'Add Nft to Marketplace ====> Add to marketplace contract',
        addedNftResult,
      );
      return addedNftResult;
    }
  } catch (e: any) {
    console.log('error', e);
    throw e?.message;
  }
};

export const dollarsToMatic = async (usdPrice) => {
  const fetchedResult = await axios.get(
    'https://api.coinlore.net/api/ticker/?id=33536',
  );
  const USDPriceOfOneMatic = fetchedResult?.data[0]?.price_usd || 0;
  const convertedMaticPrice = usdPrice / USDPriceOfOneMatic;
  return convertedMaticPrice;
};
export const buyNowMarketplace = async (
  mintTokenId,
  price,
  itemId,
  adminWalletAddress,
  walletType,
) => {
  try {
    await checkMetaMaskNet();
    const web3 =
      walletType === 'venly' ? await getVenlyWeb3Instance() : getWeb3();
    const contract = await getMarketplaceContract(web3);
    const accounts = await web3.eth.getAccounts();
    const priceInWei = await web3.utils.toWei(price.toString());
    const estimateGas = await contract.methods
      .sellItem(mintTokenId, itemId, adminWalletAddress)
      .estimateGas({ from: accounts[0], value: priceInWei });
    const gasStationPrice = await getGasPriceFromPolygon();
    const gasPriceToWei = web3.utils.toWei(gasStationPrice.toString(), 'gwei');

    const buyNowResults = await contract.methods
      .sellItem(mintTokenId, itemId, adminWalletAddress)
      .send({
        from: accounts[0],
        value: priceInWei,
        gas: estimateGas,
        gasPrice: gasPriceToWei,
      });
    return buyNowResults;
  } catch (e: any) {
    throw e?.message;
  }
};

export const maticToDollar = async (maticPrice) => {
  const fetchedResult = await axios.get(
    'https://api.coinlore.net/api/ticker/?id=33536',
  );
  const USDPriceOfOneMatic = fetchedResult?.data[0]?.price_usd || 0;
  return maticPrice * USDPriceOfOneMatic;
};

export const currentDollarPrice = async () => {
  const fetchedResult = await axios.get(
    'https://api.coinlore.net/api/ticker/?id=33536',
  );
  return fetchedResult?.data[0]?.price_usd || 0;
};

export const getListedTokens = async (walletType = 'metamask') => {
  try {
    const web3 =
      walletType === 'venly' ? await getVenlyWeb3Instance() : getWeb3();
    const contract = await getMarketplaceContract(web3);
    const listedTokens = await contract.methods.getListed().call();
    if (listedTokens?.length) {
      const listedTokenInObjects = listedTokens.map((a) => {
        const cloneListedTokenObject = { ...a };
        // TODO A patch to fix contract issue will be Fixed
        if (cloneListedTokenObject?.itemId === '1') {
          return {};
        }
        const maticPrice = web3.utils.fromWei(cloneListedTokenObject?.price);
        cloneListedTokenObject.price = maticPrice;
        return { ...cloneListedTokenObject };
      });
      return listedTokenInObjects;
    }
    return [];
  } catch (e) {
    console.log('Error while Getting Token from blockchain', e);
  }
};

// export const getGasPriceFromPolygon = async () => {
//   return await axios.get('https://gasstation-mainnet.matic.network/');
// };
const resolveUrl = (link: string) => {
  const url = new URL(link, process.env.REACT_APP_BASE_URL).href;
  return url;
};
export const searchMarketplace = async (
  page: number,
  limit: number,
  search: string,
) => {
  return await axios({
    method: 'GET',
    url: resolveUrl(`/marketplace/sortedPaintings`),
    params: {
      page,
      limit,
      search,
    },
  });
};
