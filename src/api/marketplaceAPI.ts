import axios from 'axios';
import { getListedTokens } from '../utils/marketplace';

const resolveUrl = (link: string) => {
  const url = new URL(link, process.env.REACT_APP_BASE_URL).href;
  return url;
};

export class MarketplaceAPI {
  static async getPaintings(
    worldID: string,
    page: number,
    limit: number,
    filters = {},
  ) {
    return axios({
      method: 'GET',
      url: resolveUrl(`/marketplace`),
      params: {
        page,
        limit,
        ...filters,
      },
    });
  }

  static async getSortPaintings(
    worldID: string,
    page: number,
    limit: number,
    filters = {},
    search: string,
  ) {
    return axios({
      method: 'GET',
      url: resolveUrl(`/marketplace/sortedPaintings`),
      params: {
        page,
        limit,
        ...filters,
        search,
      },
    });
  }

  static async paintingSyncService(walletType = 'metamask') {
    const listedTokens = await getListedTokens(walletType);
    return axios({
      method: 'POST',
      url: resolveUrl('/marketplace/syncMarketplacePaintings'),
      data: {
        listedTokens,
      },
    });
  }

  static async getPaintingsOnDetailsPage(
    page: number,
    limit: number,
    filters = {},
  ) {
    return axios({
      method: 'GET',
      url: resolveUrl(`/marketplace`),
      params: {
        page,
        limit,
        ...filters,
      },
    });
  }

  static async painting(paintingId: string) {
    return axios({
      method: 'GET',
      url: resolveUrl(`/marketplace/getNftsOfPainting/${paintingId}`),
    });
  }

  static async getPaintingDetails(paintingId: string, mintId: string) {
    return axios({
      method: 'GET',
      url: resolveUrl(`/user/painting/details`),
      params: {
        paintingId,
        ...(mintId && { mintId }),
      },
      headers: {
        'x-auth-token': localStorage.getItem('authToken'),
      },
    });
  }

  static async getPaintingEditionsOverview(mintId: string) {
    return axios({
      method: 'GET',
      url: resolveUrl(`/marketplace/getPaintingEditionsOverview`),
      params: {
        mintId,
      },
      headers: {
        'x-auth-token': localStorage.getItem('authToken'),
      },
    });
  }

  static async getBidAuction(mintId: string) {
    return axios({
      method: 'GET',
      url: resolveUrl(`/marketplace/getBid`),
      params: {
        mintId,
      },
      headers: {
        'x-auth-token': localStorage.getItem('authToken'),
      },
    });
  }

  static async saveBid(mint: number, price: number, type: string) {
    try {
      const res = await axios.post(
        resolveUrl(`/marketplace/addBid`),
        {
          price,
          mint,
          type,
        },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      MarketplaceAPI.handleError(err, 'Unable to fetch drops data');
    }
  }

  static async approveNFTToBuy(nftTokenId: any, to: any) {
    try {
      const res = await axios.post(
        resolveUrl(`/marketplace/approveNftForBuy`),
        {
          nftTokenId,
          to,
        },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );

      return res;
    } catch (err: any) {
      throw err?.response?.data;
      // MarketplaceAPI.handleError(err, 'failed while approveNFTToBuy');
    }
  }

  static async buyNow(mintId: any, paintingId: any, price: any) {
    try {
      const res = await axios.post(
        resolveUrl(`/marketplace/buyNow`),
        {
          mintId,
          paintingId,
          price,
        },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      MarketplaceAPI.handleError(err, 'failed while approveNFTToBuy');
    }
  }

  private static handleError(err: any, msg?: string) {
    console.error(err);
    if (err.response) {
      console.error(err?.response?.data);
      console.error(err?.response?.status);
    }
    console.log(err);
  }

  static async getFilters() {
    return axios({
      method: 'GET',
      url: resolveUrl('/marketplace/getFilters'),
    });
  }

  static async addMintToMarketplace(
    txnHash: string,
    itemId: number,
    mintId: string,
    price: number,
  ) {
    try {
      const res = await axios.post(
        resolveUrl(`/marketplace/addMint`),
        {
          txnHash,
          itemId,
          mintId,
          price,
        },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err: any) {
      throw err?.response?.data;
    }
  }

  static async updateMintPrice(
    mintId: string,
    itemId: string,
    tokenId: string,
    price: number,
    commission: number,
  ) {
    try {
      const res = await axios.post(
        resolveUrl(`/marketplace/updateMintPrice`),
        {
          mintId,
          itemId,
          tokenId,
          price,
          commission,
        },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      MarketplaceAPI.handleError(err, 'error');
    }
  }

  static async mintTransfer(mintId: string, txnHash: string) {
    try {
      const res = await axios.post(
        resolveUrl(`/marketplace/sellNft`),
        {
          mintId,
          txnHash,
        },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );

      return res;
    } catch (err: any) {
      throw err?.response?.data?.message;
    }
  }

  static async unListMint(mintId: string, itemId: string, tokenId: string) {
    try {
      const res = await axios.post(
        resolveUrl(`/marketplace/unlistNft`),
        {
          mintId,
          itemId,
          tokenId,
        },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err: any) {
      throw err?.response?.data?.message;
    }
  }

  static async byNowMarketplace(mintId: string, commission: number) {
    try {
      const res = await axios.post(
        resolveUrl(`/marketplace/assureMintPrice`),
        {
          mintId,
          commission,
        },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      MarketplaceAPI.handleError(err, 'error');
    }
  }
}
