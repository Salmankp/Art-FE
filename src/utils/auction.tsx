import axios from 'axios';
import { getWeb3 } from './web3';
import { OATAuctionProxyAddress } from './config';
import AuctionABI from '../contracts/OATAuctionImplementation.json';

export const getAuctionContract = async () => {
  const web3 = await getWeb3();
  const { abi } = AuctionABI;
  const auctionContract = new web3.eth.Contract(abi, OATAuctionProxyAddress);
  return auctionContract;
};

export const addBidToBlock = async (auctionTokenId, value, centsPrice) => {
  try {
    const contract = await getAuctionContract();
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const valueToWei = await web3.utils.toWei(value.toString());
    const addedBidResults = await contract.methods
      .bid(auctionTokenId, valueToWei, centsPrice)
      .send({
        from: accounts[0],
        gas: process.env.REACT_GAS_FEE,
        value: valueToWei,
      });
    return addedBidResults;
  } catch (e: any) {
    console.log('addBidToBlock--- error', e);
    return { error: e.message };
  }
};

export const buyNow = async (
  auctionTokenId,
  nftTokenId,
  nftOwnerAddress,
  maticPrice,
) => {
  try {
    const contract = await getAuctionContract();
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const weiPrice = await web3.utils.toWei(maticPrice.toString());
    const buyNowResults = await contract.methods
      .buyNow(auctionTokenId, nftTokenId, nftOwnerAddress)
      .send({
        from: accounts[0],
        gas: process.env.REACT_GAS_FEE,
        value: weiPrice,
      });
    console.log('BuyNow Results ======>', buyNowResults);
    return buyNowResults;
  } catch (e) {
    console.log('addBidToBlock--- error', e);
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
