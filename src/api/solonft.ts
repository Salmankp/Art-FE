import axios from 'axios';
// import { error } from '../utils/toast';

const API_LINK = process.env.REACT_APP_BASE_URL;

const resolveUrl = (link: string) => {
  return new URL(link, API_LINK).href;
};

export class SoloNFTAPI {
  static async getIndividualMint(mintID) {
    try {
      const res = await axios.get(resolveUrl(`artist/mint`), {
        params: { mintID },
        headers: { 'x-auth-token': process.env.REACT_APP_TOKEN },
      });
      return res;
    } catch (err) {
      SoloNFTAPI.handlerError(err, 'Unable to fetch Header details');
    }
  }

  static async getPaintings(paintingID) {
    try {
      const res = await axios.get(resolveUrl(`artist/mint`), {
        params: { page: 1, numberOfRows: 10, paintingID },
        headers: { 'x-auth-token': process.env.REACT_APP_TOKEN },
      });
      return res;
    } catch (err) {
      SoloNFTAPI.handlerError(err, 'Unable to fetch Bid paintings');
    }
  }

  static async getArtistPaintings(artistId) {
    try {
      const res = await axios.get(resolveUrl(`artist/${artistId}/painting`), {
        params: { page: 1, numberOfRows: 10 },
        headers: { 'x-auth-token': process.env.REACT_APP_TOKEN },
      });
      return res;
    } catch (err) {
      SoloNFTAPI.handlerError(err, 'Unable to fetch paintings 12345');
    }
  }

  static async getCollections(collectionId) {
    try {
      const res = await axios.get(
        resolveUrl(`world/${collectionId}/paintings`),
        {
          params: { page: 1, numberOfRows: 10 },
          headers: { 'x-auth-token': process.env.REACT_APP_TOKEN },
        },
      );
      return res;
    } catch (err) {
      SoloNFTAPI.handlerError(err, 'Unable to fetch paintings');
    }
  }

  static async sendBuyRequest(userEmail: string, mintId: string) {
    try {
      const res = await axios.put(
        resolveUrl(`/transact/user/${mintId}`),
        { userEmail },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      SoloNFTAPI.handlerError(err, 'Unable to fetch drops data');
    }
  }

  static async getSinglePainting(id: any) {
    try {
      const res = await axios.get(resolveUrl(`painting/${id}`), {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });
      return { success: true, data: res.data };
    } catch (err) {
      console.log('errerr :', err);
      // SoloNFTAPI.handlerError(err, "Unable to nft data");
      return { success: false };
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
