import axios from 'axios';

const API_LINK = process.env.REACT_APP_BASE_URL;

const resolveUrl = (link: string) => {
  return new URL(link, API_LINK).href;
};

export class LootCrateApi {
  static async getTokensData(paymentId: string) {
    try {
      console.log('paymentId ===', paymentId);
      const res = await axios.get(
        resolveUrl(`/mint/loot-crate-transfer/${paymentId}`),
        {
          headers: {
            'x-auth-token': window.localStorage.getItem('authToken'),
          },
        },
      );
      return res;
    } catch (err) {
      LootCrateApi.handlerError(err, 'Unable to fetch tokens data');
    }
  }

  private static handlerError(err: any, msg?: string) {
    if (err.response) {
      console.error(err?.response?.data);
      console.error(err?.response?.status);
    }

    throw new Error(msg ?? '');
  }
}
