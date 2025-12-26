import { Message } from '@material-ui/icons';
import axios from 'axios';
import { error } from '../utils/toast';

const API_LINK = process.env.REACT_APP_BASE_URL;

const resolveUrl = (link: string) => {
  const URL = API_LINK + link;
  return URL;
};

export class UserAPI {
  static verify() {
    try {
      return axios
        .post(
          `${API_LINK}user/auth`,
          {},
          {
            headers: {
              'x-auth-token': localStorage.getItem('authToken'),
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            return {
              success: true,
              generated: res?.data?.user?.generated,
            };
          }

          return {
            success: false,
            generated: false,
          };
        })
        .catch((err) => {
          return {
            success: false,
            generated: false,
            err,
          };
        });
    } catch (err) {
      localStorage.clear();
      return {
        success: false,
        generated: false,
      };
    }
  }

  static async register(
    username: string,
    email: string,
    walletAddress: string,
    walletType: string,
    humanKey: string,
  ) {
    try {
      const reqData = {
        username,
        email,
        walletAddress,
        walletType,
        humanKey,
      };
      const res = await axios.post(resolveUrl('user/register'), reqData);
      return { success: true, data: res.data };
    } catch (err: any) {
      throw err?.response?.data;
    }
  }

  static async login(walletAddress, walletType, signature) {
    try {
      const reqData = {
        walletAddress,
        walletType,
        signature,
      };
      const res = await axios.post(resolveUrl('user/login'), reqData);
      const success = res?.data?.success;
      if (!success) {
        const message = res?.data?.message || 'unable to login';
        throw message;
      }
      return {
        success: true,
        data: res?.data?.data,
        mainData: res?.data,
      };
    } catch (err: any) {
      throw err?.response?.data;
    }
  }

  private static handlerError(err: any, msg: string) {
    console.error(err);
    if (err.response) {
      console.error(err?.response?.data);
      console.error(err?.response?.status);
      if (err?.response?.data?.message) {
        error(err?.response?.data?.message);
      }

      error(err?.response?.data);
      return;
    }

    error(msg);
  }

  static async getUserWalletBalance() {
    try {
      const res = await axios.get(resolveUrl('wallet/retrieveWalletBalance'), {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Something went wrong.');
      return { success: false };
    }
  }

  static async activeAuthenticatorApp(twoFACode: number, login, userToken) {
    try {
      const res = await axios.post(
        resolveUrl('user/validate2fa'),
        {
          twoFACode,
          login,
        },
        {
          headers: {
            'x-auth-token': userToken,
          },
        },
      );
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Invalid code');
      return { success: false };
    }
  }

  static async getQRCode(active, service) {
    try {
      const res = await axios.post(
        resolveUrl('user/active2fa'),
        {
          active,
          service,
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('authToken'),
          },
        },
      );
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Invalid code');
      return { success: false };
    }
  }

  static async accountVerification(code: any, email: string) {
    try {
      const res = await axios.post(resolveUrl('user/verifyEmail'), {
        code,
        email,
      });
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Not verified');
      return { success: false };
    }
  }

  static async getUserNonce(walletAddress, walletType) {
    try {
      const reqData = {
        walletAddress,
        walletType,
      };
      const res = await axios.post(resolveUrl('user/nonce'), reqData);
      const success = res?.data?.success;
      if (!success) {
        const message = res?.data?.message || 'Error Wile Fetching nonce';
        throw message;
      }
      return {
        success: true,
        data: res?.data?.data,
        mainData: res?.data,
      };
    } catch (err: any) {
      console.log('getUserNonce', err?.response);
      throw err?.response?.data;
    }
  }

  static async creatingWallet(token: any) {
    try {
      const res = await axios.get(resolveUrl('wallet/createWallet'), {
        headers: {
          'x-auth-token': token,
        },
      });
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Wallet not created.');
      return { success: false };
    }
  }

  static async userPaintings(pageNumber: any, numberOfRows: any) {
    const token = localStorage.getItem('authToken');
    try {
      const res = await axios.get(
        resolveUrl(
          `/user/paintings?page=${pageNumber}&numberOfRows=${numberOfRows}`,
        ),
        {
          headers: {
            'x-auth-token': localStorage.getItem('authToken'),
          },
        },
      );
      return { success: true, data: res.data };
    } catch (err) {
      if (token) {
        UserAPI.handlerError(err, 'Data not retrieved.');
      }
      return { success: false };
    }
  }

  static async getTransactions() {
    const token = localStorage.getItem('authToken');
    try {
      const res = await axios.get(resolveUrl(`transact`), {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });
      return { success: true, data: res.data };
    } catch (err) {
      if (token) {
        UserAPI.handlerError(err, 'Data not retrieved.');
      }
      return { success: false };
    }
  }

  static async getTransactionsHistory(userWalletAddress: string) {
    try {
      const res = await axios.get(
        resolveUrl(`user/transaction/history/${userWalletAddress}`),
      );
      return { success: true, response: res?.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Failed to get transactions history!');
      return { success: false };
    }
  }

  static async userDetail() {
    const token = localStorage.getItem('authToken');
    try {
      const res = await axios.get(resolveUrl('user/details'), {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });
      return { success: true, data: res.data?.data };
    } catch (err) {
      if (token) {
        UserAPI.handlerError(err, 'Something went wrong.');
      }
      return { success: false };
    }
  }

  static async getUserValidCoupon() {
    try {
      const res = await axios.get(resolveUrl('user/valid/coupon'), {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });
      return res.data?.data;
    } catch (err) {
      return false;
    }
  }

  static async updateUser(
    userFullname: string,
    userName: string,
    userEmail: string,
    firstName: string,
    lastName: string,
    userCountry: string,
    streetAddressOne: string,
    streetAddressTwo: string,
    subrub: string,
    zipCode: string,
    userRecoveryEmail: string,
    stateName: string,
  ) {
    try {
      const res = await axios.put(
        resolveUrl('user/updateUser'),
        {
          fullName: userFullname,
          username: userName,
          email: userEmail,
          firstName,
          lastName,
          country: userCountry,
          streetAddressLine1: streetAddressOne,
          streetAddressLine2: streetAddressTwo,
          suburb: subrub,
          zipCode,
          recoveryEmail: userRecoveryEmail,
          state: stateName,
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('authToken'),
          },
        },
      );
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Something went wrong.');
      return { success: false };
    }
  }

  static async contactUs(
    fName: string,
    LName: string,
    email: string,
    message: string,
    subj: string,
  ) {
    try {
      const res = await axios.post(resolveUrl('contact'), {
        user: {
          firstName: fName,
          lastName: LName,
          email,
        },
        body: message,
        subject: subj,
      });
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Something went wrong.');
      return { success: false };
    }
  }

  static async getSubscription(email: string) {
    try {
      const res = await axios.post(resolveUrl('newsletter/addEmail'), {
        email,
      });
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Something went wrong.');
      return { success: false };
    }
  }

  static async resendVerificationEmail() {
    try {
      const res = await axios.get(resolveUrl('user/verificationEmail'), {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Invalid code');
      return { success: false };
    }
  }

  static async resendTwoFaCodeEmail(username: string) {
    try {
      const res = await axios.post(resolveUrl('user/resend2FAEmail'), {
        username,
      });
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Invalid code');
      return { success: false };
    }
  }

  static async checkIfUserIsVerified() {
    try {
      const res = await axios.get(resolveUrl('user/checkUserVerified'), {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Invalid code');
      return { success: false };
    }
  }

  static async getCountries() {
    try {
      const res = await axios.get(
        'https://countriesnow.space/api/v0.1/countries',
      );
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Invalid code');
      return { success: false };
    }
  }

  static async getStates(countryName: string) {
    try {
      const res = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/states',
        { country: countryName },
      );
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Invalid code');
      return { success: false };
    }
  }

  static async verifyCaptcha(humanKey: string) {
    try {
      const res = await axios.post(resolveUrl('recaptcha/verify'), {
        humanKey,
      });
      return { success: true, data: res.data };
    } catch (err) {
      UserAPI.handlerError(err, 'Verification failed !');
      return { success: false };
    }
  }

  static async getUsersMints() {
    try {
      // get the data object from response.data
      const {
        data: { data },
      } = await axios.get(resolveUrl('user/mints'), {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
        },
      });
      return data;
    } catch (err) {
      UserAPI.handlerError(err, "Getting user's mints failed");
      throw new Error("Getting user's mints failed");
    }
  }

  static async getUserListedPaintings() {
    const token = localStorage.getItem('authToken');
    try {
      const res = await axios.get(resolveUrl('user/getlistedPaintings'), {
        headers: {
          'x-auth-token': token,
        },
      });
      return { success: true, data: res.data };
    } catch (err) {
      if (token) {
        UserAPI.handlerError(err, 'Data not retrieved.');
      }
      return { success: false };
    }
  }
}
