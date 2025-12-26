import { MarketplaceAPI } from 'api/marketplaceAPI';
import { UserAPI } from 'api/user';
import {
  convertValues,
  alphabeticOrder,
  listToOptions,
} from 'pages/components/dashboard/helper';
import { DashboardAPI } from '../api/dashboardAPI';
import { useAppDispatch } from '../redux/hooks';
import { AuthenticationStateActions } from '../redux/slices/AuthenticationState';
import {
  sortPaintings,
  groupPaintings,
  groupedListedPaintings,
  completedOwnedCollection,
} from './helper';

export const getUserDetails = async (
  dispatch: ReturnType<typeof useAppDispatch>,
): Promise<void> => {
  // const user = await DashboardAPI.getUserDetails();
  // const userPaintings = await DashboardAPI.getPaintingsFromUser();

  const user = await DashboardAPI.getUserDetails();
  await DashboardAPI.userWalletSync();
  const userPaintings = await DashboardAPI.getPaintingsFromUser();
  const userListedPaintings = await UserAPI.getUserListedPaintings();
  const userListedPaintingsCount = userListedPaintings?.data?.paintings?.length;
  const { data } = await MarketplaceAPI.getFilters();
  if (data?.data) {
    dispatch(
      AuthenticationStateActions.set_filters({
        rarity: convertValues(data.data.rarity),
        media: alphabeticOrder(convertValues(data.data.media)),
        saleType: alphabeticOrder(convertValues(data.data.saleType)),
        genre: alphabeticOrder(convertValues(data.data.genre)),
        collections: alphabeticOrder(listToOptions(data.data.collections)),
        artists: alphabeticOrder(listToOptions(data.data.artists)),
      }),
    );
  }

  if (user === null) dispatch(AuthenticationStateActions.set_userDetails([]));
  else dispatch(AuthenticationStateActions.set_userDetails(user));

  if (userPaintings === null)
    dispatch(AuthenticationStateActions.set_userPaintings([]));
  else {
    const sortesList = sortPaintings(userPaintings, 'price');
    const groupedList = groupPaintings(sortesList);
    const completed = completedOwnedCollection(groupedList.paintings);
    const listedCount = userListedPaintingsCount;

    groupedList.count.completed = completed;
    groupedList.count.listedPaintings = listedCount;
    dispatch(AuthenticationStateActions.set_userPaintings(groupedList));
  }
  if (!userListedPaintings.success) {
    dispatch(AuthenticationStateActions.set_userListedPaintings([]));
    dispatch(AuthenticationStateActions.set_userListedPaintingsCount(0));
  } else {
    const groupUserListedPaintings = groupedListedPaintings(
      userListedPaintings?.data?.paintings,
    );

    dispatch(
      AuthenticationStateActions.set_userListedPaintings(
        groupUserListedPaintings,
      ),
    );
    dispatch(
      AuthenticationStateActions.set_userListedPaintingsCount(
        userListedPaintingsCount,
      ),
    );
  }
};
