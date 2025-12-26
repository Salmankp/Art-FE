import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch } from '../redux/hooks';
import { AuthenticationStateActions } from '../redux/slices/AuthenticationState';
import { error } from './toast';
import { removeAllTrailingSlashes } from './helper';

export const InjectAxiosInterceptors = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (err) => {
        if (
          err?.response?.status === 401 &&
          window.location.pathname !== '/auth'
        ) {
          error(err?.response?.message, 5000);
          localStorage.clear();
          dispatch(AuthenticationStateActions.set_logged_in(false));
          dispatch(AuthenticationStateActions.set_walletDetails({}));
          history.push('/auth');
          return Promise.reject(err);
        }

        return Promise.reject(err);
      },
    );

    axios.interceptors.request.use((request) => {
      request.url = removeAllTrailingSlashes(request.url);
      return request;
    });
  }, []);
  return <></>;
};
