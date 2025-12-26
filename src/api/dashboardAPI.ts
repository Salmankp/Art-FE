import axios from 'axios';
import { error } from '../utils/toast';

const API_LINK = process.env.REACT_APP_BASE_URL;

const resolveUrl = (link: string) => {
  return new URL(link, API_LINK).href;
};

export class DashboardAPI {
  static async getPaintingsFromUser() {
    const token = window.localStorage.getItem('authToken');
    try {
      return await axios
        .get(resolveUrl(`user/paintings`), {
          params: { page: 1, numberOfRows: 10 },
          headers: { 'x-auth-token': window.localStorage.getItem('authToken') },
        })
        .then((res) => {
          if (res.status === 200) return res.data;
          return null;
        })
        .catch((err) => {
          if (token) {
            // error('Unable to fetch user paintings');
            error(err);
          }
          return null;
        });
    } catch (err) {
      if (token) {
        DashboardAPI.handlerError(err, 'Unable to fetch paintings');
      }
    }
  }

  static async getUserDetails() {
    const token = window.localStorage.getItem('authToken');
    try {
      const res = await axios
        .get(resolveUrl(`user/details`), {
          headers: { 'x-auth-token': window.localStorage.getItem('authToken') },
        })
        .then((res) => {
          if (res.status === 200) return res.data;
          return null;
        })
        .catch((err) => {
          if (token) {
            // error('Could not fetch details.');
            error(err);
          }
          return null;
        });
      return res;
    } catch (err) {
      if (token) {
        DashboardAPI.handlerError(err, 'Unable to fetch paintings');
      }
    }
  }

  static async userWalletSync() {
    const token = window.localStorage.getItem('authToken');
    try {
      const res = await axios
        .get(resolveUrl(`user/walletSync`), {
          headers: { 'x-auth-token': window.localStorage.getItem('authToken') },
        })
        .then((res) => {
          if (res.status === 200) return res.data;
          return null;
        })
        .catch((err) => {
          if (token) {
            // error('Could not fetch details.');
            error(err);
          }
          return null;
        });
      return res;
    } catch (err) {
      if (token) {
        DashboardAPI.handlerError(err, 'Unable to sync wallet');
      }
    }
  }

  static putUserSale = async (mintId: string, address: string) => {
    try {
      const res = await axios.post(
        resolveUrl(`user/sale`),
        {
          mintId,
          address,
        },
        {
          headers: { 'x-auth-token': window.localStorage.getItem('authToken') },
        },
      );
      return res;
    } catch (err) {
      DashboardAPI.handlerError(err, 'Unable to put for sale');
    }
  };

  private static handlerError(err: any, msg?: string) {
    console.error(err);
    if (err.response) {
      console.error(err?.response?.data);
      console.error(err?.response?.status);
    }
    throw new Error(msg ?? '');
  }
}
