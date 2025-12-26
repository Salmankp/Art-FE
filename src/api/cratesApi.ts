import axios from 'axios';

const API_LINK = process.env.REACT_APP_BASE_URL;

const resolveUrl = (link: string) => {
  return new URL(link, API_LINK).href;
};

// TODO: should probably type the return data when types get implemented
export class CratesAPI {
  static getCrateContainer = async (slug: string) => {
    try {
      // pull data object out of response.data
      console.log('slug ====', slug);
      const {
        data: { data },
      } = await axios.get(resolveUrl(`${slug}`), {
        headers: { 'x-auth-token': window.localStorage.getItem('authToken') },
      });
      return data;
    } catch (error: any) {
      console.log('errror ===', error);
      CratesAPI.handlerError(error, 'Unable to fetch crate container');
    }
  };

  private static handlerError(error: any, msg: string) {
    console.error(error);
    if (error.response) {
      console.error(error?.response?.data);
      console.error(error?.response?.status);
    }
    throw new Error(msg);
  }
}
