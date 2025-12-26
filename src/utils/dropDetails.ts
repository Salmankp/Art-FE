import React from 'react';
import { DropsAPI } from '../api/dropsAPI';
import { useAppDispatch } from '../redux/hooks';
import { AuthenticationStateActions } from '../redux/slices/AuthenticationState';
import { error } from './toast';

import { getAccountInformation } from './web3';

export const getDropDetails = async (
  dispatch: ReturnType<typeof useAppDispatch>,
  dropId: string,
  setDropId: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
  try {
    if (dropId) {
      const latestPaintings = await DropsAPI.getDropsBySlug(dropId);
      dispatch(
        AuthenticationStateActions.set_latestDropPaintingDetails(
          latestPaintings?.data,
        ),
      );

      dispatch(
        AuthenticationStateActions.set_dropPaintings(latestPaintings?.data),
      );
    } else {
      const drop = await DropsAPI.getLatestDrop();
      const dropId = drop?.data?.dropId;
      setDropId(dropId);
    }
  } catch (err) {
    console.error(err, 'dropDetails');
    error('unable to fetch drops details, please contact support');
  }
};

export const getAccountBalance = async (
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  generatedAddress?: string,
): Promise<void> => {
  const accounts = await getAccountInformation(generatedAddress);
  accounts.balance && setBalance(+parseFloat(accounts.balance).toFixed(5));
};
