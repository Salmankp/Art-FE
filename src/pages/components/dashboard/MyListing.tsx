import React, { useEffect, useState } from 'react';
import { CircularProgress, Box as MBox } from '@material-ui/core';
import { AuthenticationStateActions } from 'redux/slices/AuthenticationState';
import {
  groupedListedPaintings,
  groupPaintings,
  sortPaintings,
} from 'utils/helper';
import {
  ungroupPainting,
  getExistedMints,
} from 'pages/components/dashboard/helper';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { DashboardAPI } from 'api/dashboardAPI';
import { UserAPI } from 'api/user';
import AssetsWraper from './AssetWrapper';

const MyListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const [listedPaintings, setListedPaintings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userPaintings = useAppSelector(
    (state) => state.AuthenticationState.userPaintings,
  );

  const handleReact = (listedPaintings: any, itemObj: any) => {
    const ungroupList = ungroupPainting(userPaintings?.paintings);
    const exist = ungroupList.filter((item) => {
      return item.tokenId === itemObj.tokenID;
    });
    if (exist.length === 0) {
      ungroupList.push(itemObj);
    }
    const getUserAssets = getExistedMints(ungroupList, listedPaintings);
    const sorted = sortPaintings(
      { ...userPaintings, paintings: getUserAssets },
      'price',
    );
    const groupped = groupPaintings(sorted);
    dispatch(AuthenticationStateActions.set_userPaintings(groupped));
  };

  const getListedPaintings = async (itemObj?: any) => {
    try {
      setIsLoading(true);
      const { success, data } = await UserAPI.getUserListedPaintings();
      if (success) {
        itemObj && handleReact(data?.paintings, itemObj);
        const groupedPaintings = groupedListedPaintings(data?.paintings);
        setListedPaintings(groupedPaintings);
        dispatch(
          AuthenticationStateActions.set_userListedPaintings(groupedPaintings),
        );
        dispatch(
          AuthenticationStateActions.set_userListedPaintingsCount(
            data?.paintings.length,
          ),
        );
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.log('Error while fetching listed paintings ==> ', e);
    }
  };

  const handleListing = async (item: any) => {
    setIsLoading(true);
    await DashboardAPI.userWalletSync();
    getListedPaintings(item);
  };

  useEffect(() => {
    getListedPaintings();
  }, []);

  if (isLoading)
    return (
      <MBox
        style={{ minHeight: 550 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MBox textAlign="center">
          <CircularProgress />
          <h3>Loading...</h3>
        </MBox>
      </MBox>
    );

  return (
    <MBox style={{ minHeight: 550 }}>
      {listedPaintings.length > 0 && (
        <AssetsWraper
          isDashboard
          isMarketplaceListings
          isUnList={false}
          isMyAsset={false}
          paintingsLimit={8}
          paintings={listedPaintings}
          handleReact={handleListing}
        />
      )}
      {listedPaintings.length === 0 && (
        <MBox
          style={{ minHeight: 550 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <h2 style={{ color: '#fff' }}>No Items to show</h2>
        </MBox>
      )}
    </MBox>
  );
};

export default MyListing;
