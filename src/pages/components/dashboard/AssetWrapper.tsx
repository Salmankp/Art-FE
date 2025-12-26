import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import PaintingsContainer from 'pages/components/dashboard/BoxWraper';
import Filters from 'pages/components/Filters/filterSnipet';
import PaginationComponent from 'pages/components/pagination/paginationComp';
import { ungroupPainting } from 'pages/components/dashboard/helper';
import { sortPaintings, groupPaintings } from 'utils/helper';
import {
  sortNFTsByRarity,
  hasFiltersList,
  filterNFTs,
} from 'pages/controllers/DashboardController';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { AuthenticationStateActions } from 'redux/slices/AuthenticationState';
import styles from '../styles/dashboard/Grid.module.scss';

interface filterTypes {
  rarity: any;
  artists: any;
  collections: any;
  saleType: string;
  genre: string;
  media: string;
}

interface AssetWrapperTypes {
  paintings: any;
  ischecked?: any;
  paintingsLimit: any;
  isUnList: any;
  isDashboard: boolean;
  isMyAsset: boolean;
  isMarketplaceListings: boolean;
  handleReact?: (paintings: any) => void;
}

const DEFAULT_FILTERS = {
  rarity: '',
  artists: '',
  collections: '',
  saleType: '',
  genre: '',
  media: '',
};

const DEFAULT_SORTS = {
  price: 1,
  rarity: 0,
  paintings: 2,
};
const AssetsWrapper: React.FC<AssetWrapperTypes> = ({
  paintings,
  ischecked,
  paintingsLimit,
  isUnList,
  isDashboard,
  isMyAsset,
  isMarketplaceListings,
  handleReact,
}) => {
  const dispatch = useAppDispatch();
  console.log('PAINTING', paintings);
  const pagesCalc = Math.abs(paintings.length / paintingsLimit);
  const [pages, setPages] = useState(Math.ceil(pagesCalc));
  const [paintingsState, setPaintings] = useState([]);

  const filterOptions = useAppSelector(
    (state) => state.AuthenticationState.filters,
  );

  const dashboardPagination = useAppSelector(
    (state) => state.AuthenticationState.dashboardPagination,
  );
  const [currentPage, setCurrentPage] = useState(dashboardPagination || 1);
  const [sortObj, setSortObj] = useState(DEFAULT_SORTS);
  const [filter, setFilter] = useState<filterTypes>(DEFAULT_FILTERS);

  const handleSort = (updateSort: any) => {
    setSortObj(updateSort);
    setCurrentPage(1);
    dispatch(AuthenticationStateActions.set_dashboardPagination(1));
  };

  const filterHandle = (keyName: string, updatedData: any) => {
    setFilter({ ...filter, [keyName]: updatedData });
  };

  const setPage = (paintingsState) => {
    const pagesCalc = Math.abs(paintingsState.length / paintingsLimit);
    setPages(Math.ceil(pagesCalc));
  };

  const sortByPrice = () => {
    const sortedPaintingsByPrice = sortPaintings(
      { paintings: paintingsState },
      'price',
      sortObj.price,
    );
    setPaintings(sortedPaintingsByPrice.paintings);
  };

  const sortByRarity = () => {
    const sortedList = sortNFTsByRarity(sortObj, filterOptions, paintingsState);
    setPaintings(sortedList);
  };

  const sortByRecentGrouped = () => {
    const ungroupList = ungroupPainting(paintingsState);
    const recentSort = ungroupList.sort(
      (a: any, b: any) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );
    const groupedList = groupPaintings({ paintings: recentSort });
    setPaintings(groupedList.paintings);
  };
  const sortByRecentUnGrouped = () => {
    const recentSort = paintingsState.sort(
      (a: any, b: any) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );

    setPaintings(recentSort);
  };

  const sort = (sortObj) => {
    if (sortObj) {
      if (sortObj.price !== 0) {
        sortByPrice();
      } else if (sortObj.rarity !== 0) {
        sortByRarity();
      }
      if (sortObj.recent !== 0 && !ischecked) {
        sortByRecentUnGrouped();
      } else if (sortObj.rarity !== 0 && ischecked) {
        sortByRecentGrouped();
      }
    }
  };

  useEffect(() => {
    setPaintings(paintings);
  }, [paintings]);

  useEffect(() => {
    setPage(paintingsState);
  }, [paintingsState]);

  useEffect(() => {
    sort(sortObj);
  }, [sortObj]);

  const moveInPages = (index) => {
    setCurrentPage(index);
    dispatch(AuthenticationStateActions.set_dashboardPagination(index));
  };

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (filter) {
      const payload = {
        paintingIDKeyBaseList: ['rarity', 'genre', 'media'],
        paintingIDObjBaseList: ['collections'],
        paintingIDArryBaseList: ['artists'],
        hasFilterList: hasFiltersList(filter),
        filter,
        paintings,
      };

      const filteredPaintings = filterNFTs(payload);
      setPaintings(filteredPaintings);
    }
  }, [filter]);

  // pagination component
  console.log('🚀 ~ file: AssetWrapper.tsx ~ line 221 ~ paintings', paintings);
  console.log(
    '🚀 ~ file: AssetWrapper.tsx ~ line 257 ~ badges',
    paintingsState,
  );

  return (
    <div>
      <div className={styles.dataContainer}>
        <Grid container>
          <Grid item>
            <Filters
              handle={filterHandle}
              handleSort={handleSort}
              filter={filter}
              sortObj={sortObj}
            />
          </Grid>
        </Grid>

        {paintings && paintings?.length > 0 && (
          <PaintingsContainer
            paintings={paintingsState || []}
            currentPage={currentPage}
            paintingsLimit={paintingsLimit}
            isDashboard={isDashboard}
            isUnlist={isUnList}
            isMyAsset={isMyAsset}
            isMarketplaceListings={isMarketplaceListings}
            handleReact={handleReact}
          />
        )}
      </div>
      <div>
        <PaginationComponent
          handle={moveInPages}
          count={pages}
          page={currentPage}
        />
      </div>
    </div>
  );
};

export default AssetsWrapper;
AssetsWrapper.defaultProps = {
  handleReact: undefined,
};
