import axios from 'axios';

const API_LINK = process.env.REACT_APP_BASE_URL;

const resolveUrl = (link: string) => {
  return new URL(link, API_LINK).href;
};

export class DropsAPI {
  static async getSingleDrop(worldId: string) {
    try {
      const res = await axios.get(resolveUrl('drop'), {
        params: { page: 1, numberOfRows: 10, worldId },
      });
      return res;
    } catch (err) {
      DropsAPI.handlerError(err, 'Unable to fetch drops');
    }
  }

  static async getPaintingAvailableMintsCount(paintingId: string) {
    return axios.get(resolveUrl(`mint/available-count/${paintingId}`), {
      headers: {
        'x-auth-token': window.localStorage.getItem('authToken'),
      },
    });
  }

  static async maticWalletTrasaction(hash: string, mintId: string) {
    try {
      const res = await axios.post(
        resolveUrl(`/transact/metamaskWalletTransaction`),
        {
          mintId,
          transactionHash: hash,
        },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      DropsAPI.handlerError(
        err,
        'Unable to process metamask wallet transaction',
      );
    }
  }

  static async getLatestDrop() {
    try {
      const res = await axios.get(resolveUrl(`drop/latest`));
      return res;
    } catch (err) {
      DropsAPI.handlerError(err, 'Unable to fetch latest drops');
    }
  }

  static async getLatestDropStats(slug: string) {
    try {
      const res = await axios.get(resolveUrl(`drop/stats/${slug}`));
      return res;
    } catch (err) {
      DropsAPI.handlerError(err, 'Unable to fetch latest drops');
    }
  }

  static async getDropPaintings(dropId: string) {
    try {
      const res = await axios.put(
        resolveUrl(`drop/${dropId}/latestPaintings`),
        {
          data: { drop: dropId, by: 'id' },
        },
      );
      return res;
    } catch (err) {
      DropsAPI.handlerError(err, 'Unable to fetch drops');
    }
  }

  static async getDropsBySlug(slug: string) {
    try {
      const res = await axios.get(resolveUrl(`${slug}/latest-paintings`), {});
      return res;
    } catch (err) {
      DropsAPI.handlerError(err, 'Unable to fetch drops');
    }
  }

  static async getDropDetails(dropId: string) {
    try {
      const res = await axios.get(resolveUrl(`drop`), {
        params: { page: 1, numberOfRows: 10, dropId },
      });
      return res;
    } catch (err) {
      DropsAPI.handlerError(err, 'Unable to fetch drops data');
    }
  }

  static async makeMintAvailbleForSale(paintingID) {
    return await axios.get(
      resolveUrl(`/painting/setNFTForSale/${paintingID}`),
      {
        headers: {
          'x-auth-token': window.localStorage.getItem('authToken'),
        },
      },
    );
  }

  static async makeLootCrateMintsAvailableForSale(lootCrateId) {
    return await axios.get(
      resolveUrl(`/loot-crate/setMintsForSale/${lootCrateId}`),
      {
        headers: {
          'x-auth-token': window.localStorage.getItem('authToken'),
        },
      },
    );
  }

  static async setMintStatus(tokenId, purchaseStatus, txnHash) {
    try {
      const res = await axios.post(
        resolveUrl(`/painting/updateNFTAfterTransaction`),
        {
          success: purchaseStatus,
          tokenId,
          txnHash,
        },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      DropsAPI.handlerError(err, 'Unable to fetch drops data');
    }
  }

  static async sendBuyRequest(mintId: string) {
    try {
      const res = await axios.put(
        resolveUrl(`transact/user/${mintId}`),
        {},
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      DropsAPI.handlerError(err, 'Unable to fetch drops data');
    }
  }

  private static handlerError(err: any, msg?: string) {
    if (err.response) {
      console.error(err?.response?.data);
      console.error(err?.response?.status);
    }

    throw new Error(msg ?? '');
  }

  static async checkoutMatic(
    paymentEvent: any,
    nftId: number,
    amount: number,
    paintingID: string,
  ) {
    try {
      const res = await axios.post(
        resolveUrl(`/payment/matic/checkout`),
        {
          paymentEvent,
          nftId,
          amount,
          paintingID,
        },
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      DropsAPI.handlerError(err, 'Unable to fetch drops data');
    }
  }

  static async checkoutMaticLootCrate(
    paymentEvent: any,
    tokens: Array<any>,
    amount: number,
    lootCrateId: string,
    couponId: string,
  ) {
    try {
      const checkoutData: any = {
        paymentEvent,
        tokens,
        amount,
        lootCrateId,
      };
      if (checkoutData) {
        checkoutData.couponId = couponId;
      }

      const res = await axios.post(
        resolveUrl(`/payment/matic/loot-crate/checkout`),
        checkoutData,
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      DropsAPI.handlerError(err, 'Unable to fetch drops data');
    }
  }
}
