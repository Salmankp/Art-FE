import axios from 'axios';

const API_LINK = process.env.REACT_APP_BLOCKCHAIN_API_PORT;

const resolveUrl = (link: string) => {
  return new URL(link, API_LINK).href;
};

export class BlockchainAPI {
  static async purchaseArtwork(
    password: string | null,
    value: string,
    nftId: string,
  ) {
    try {
      const res = await axios.post(
        resolveUrl(`artefy/sale/purchaseArtwork`),
        { password, value, nftId },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      console.log('RESPONSE', res);
      return res;
    } catch (err) {
      console.log('er', err);
      BlockchainAPI.handlerError(err, 'Unable to purchase artwork');
    }
  }

  static async approveForNFTTransfer(
    password: string | null,
    to: string,
    nftId: string,
  ) {
    try {
      const res = await axios.post(
        resolveUrl(`artefy/nft/approveForNFTTransfer`),
        { password, nftId, to },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      BlockchainAPI.handlerError(err, 'Unable to approve');
    }
  }

  static async sellArtwork(
    password: string | null,
    price: string,
    nftId: string,
  ) {
    try {
      const res = await axios.post(
        resolveUrl(`artefy/sale/sellMyArtwork`),
        { password, nftId, price },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      BlockchainAPI.handlerError(err, 'Unable to purchase artwork');
    }
  }

  private static handlerError(err: any, msg?: string) {
    console.error(err);
    if (err.response) {
      console.error(err?.response?.data);
      console.error(err?.response?.status);
    }
    throw new Error(msg ?? '');
  }
}
