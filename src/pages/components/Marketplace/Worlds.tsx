import React, { useState, useEffect, useRef } from 'react';
import SearchBar from 'material-ui-search-bar';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';

import {
  CircularProgress,
  Container,
  Box as MBox,
  Grid,
} from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { FilterStateActions } from 'redux/slices/FiltersState';
import PaginationComponent from '../pagination/paginationComp';
import styles from '../styles/Marketplace/Worlds.module.scss';
import EverscapesTitle from './EverscapesTitle';
import Footer from '../Everscapes/Footer';
import {
  artefyLogo,
  marketplaceListingCollectorLogo,
} from '../../../assets/index';
import Card from './Card';
import FilterBy from './FilterBy';
import { useAppSelector } from '../../../redux/hooks';
import { MarketplaceAPI } from '../../../api/marketplaceAPI';
import { error } from '../../../utils/toast';

const Worlds: React.FC<{ worlds: string; worldId: string }> = ({
  worlds,
  worldId,
}) => {
  const dispatch = useDispatch();
  const storedSelectedPage = useAppSelector((state) => state.FiltersState.page);
  const storedSelectedFilters = useAppSelector(
    (state) => state.FiltersState.filters,
  );

  const [data, setData] = useState<any[]>([] as any[]);
  const [paginationNumber, setPaginationNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(storedSelectedPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [userListedPainting, setUserListedPainting] = useState<any[]>([]);
  const history: any = useHistory();
  const loggedInUser = useAppSelector(
    (state) => state.AuthenticationState.loggedIn,
  );

  const limit = window.innerWidth > 700 ? 16 : 4;
  const searchText = useRef<string>('');

  const worldLogos = {
    Everscapes: <EverscapesTitle />,
    Artefy: (
      <div className={styles.artefyIcon}>
        <img src={artefyLogo} alt="artery-logo" />
      </div>
    ),
  };

  const getWorldsLogo = (data: string) => {
    return worldLogos[data];
  };

  const getFiltersObject = (filters) => {
    const filtersObject = Object.entries(filters).reduce((a, [k, v]) => {
      const calculations = v ? ((a[k] = v), a) : a;
      return calculations;
    }, {});
    const obj = {};
    for (const [key, value] of Object.entries(filtersObject)) {
      if (Array.isArray(value) && (value as any).length) {
        obj[`filters[${key}]`] = `${(value as any).map((d) => d.value)}`;
      } else {
        obj[`filters[${key}]`] = value;
      }
    }

    return obj;
  };
  const getOrder = useAppSelector((state) => state.FiltersState.sortingFilters);
  const { order } = getOrder;
  const getFilteredList = async (filters, isSearch, isSort) => {
    let filtersObject;
    if (!isSearch) filtersObject = getFiltersObject(filters);
    if (isSearch || isSort) filtersObject = filters;

    if (!filtersObject) {
      return;
    }
    try {
      setLoading(true);
      const paintings = await MarketplaceAPI.getSortPaintings(
        worldId,
        currentPage,
        limit,
        filtersObject,
        searchText.current,
      );

      if (paintings?.data?.data?.paintings.length === 0 && currentPage !== 1) {
        setCurrentPage(1);
        dispatch(FilterStateActions.setPage(1));
        setLoading(true);
        return;
      }
      setPaginationNumber(paintings?.data?.data?.paginator?.totalPages);
      const paintingsData = paintings?.data?.data?.paintings;
      if (filters['sort[order]'] === 'dsc') {
        const cryptoPriceArray = paintingsData.map((item) => {
          let tempMints = item.mints;
          tempMints = [
            ...tempMints.sort(
              (a, b) => b.marketplace.cryptoPrice - a.marketplace.cryptoPrice,
            ),
          ];
          return { mints: tempMints, ...item };
        });
        setData(cryptoPriceArray);
      }
      if (filters['sort[order]'] === 'asc') {
        const cryptoPriceArray = paintingsData.map((item) => {
          let tempMints = item.mints;
          tempMints = {
            ...tempMints.sort(
              (a, b) => a.marketplace.cryptoPrice - b.marketplace.cryptoPrice,
            ),
          };
          return { mints: tempMints, ...item };
        });
        setData(cryptoPriceArray);
      }
      if (order === '') {
        const cryptoPriceArray = paintingsData.map((item) => {
          let tempMints = item.mints;
          tempMints = {
            ...tempMints.sort(
              (a, b) => a.marketplace.cryptoPrice - b.marketplace.cryptoPrice,
            ),
          };
          return { mints: tempMints, ...item };
        });
        setData(cryptoPriceArray);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const getSortFilteredList = async (filters, isSearch, isSort) => {
    let filtersObject;
    if (!isSearch) filtersObject = getFiltersObject(filters);
    if (isSearch || isSort) filtersObject = filters;
    if (!filtersObject) return;
    try {
      setLoading(true);
      const paintings = await MarketplaceAPI.getSortPaintings(
        worldId,
        currentPage,
        limit,
        filtersObject,
        searchText.current,
      );

      if (paintings?.data?.data?.paintings.length === 0 && currentPage !== 1) {
        setCurrentPage(1);
        dispatch(FilterStateActions.setPage(1));
        setLoading(true);
        return;
      }
      setPaginationNumber(paintings?.data?.data?.paginator?.totalPages);
      setData(paintings?.data?.data?.paintings);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const userListedMints = useAppSelector(
    (state) => state.AuthenticationState.userListedPaintings,
  );
  const paintingSyncService = async () =>
    await MarketplaceAPI.paintingSyncService(
      loggedInUser?.userInfo?.walletType,
    );

  const getFilteredPaintings = (filters) => {
    getFilteredList(filters, false, false);
  };

  const getSortedPaintings = (sortItems) => {
    const { field, order, ...otherFilters } = sortItems;
    getFilteredList(
      {
        ...getFiltersObject(otherFilters),
        'sort[field]': field,
        'sort[order]': order.toLowerCase(),
      },
      false,
      true,
    );
  };

  useEffect(() => {
    paintingSyncService();
    setCurrentPage(storedSelectedPage);
    setUserListedPainting(userListedMints);
  }, []);

  useEffect(() => {
    setUserListedPainting(userListedMints);
  }, [limit, worldId]);

  const pushToSoloNFTWithArtistId = (item) => {
    console.log('MINT ID', item);
    history.push(
      `/solonft?mintId=${item._id}&paintingId=${item.paintingID._id}&artistId=${item.paintingID.artist._id}&collectionId=${item.paintingID.theme._id}`,
    );
  };

  if (!data) {
    return (
      <>
        <Container>
          <MBox sx={{ mx: 'auto', width: 30 }} padding={20}>
            <CircularProgress style={{ marginLeft: 15, marginBottom: 20 }} />
            <h3>Loading...</h3>
          </MBox>
        </Container>
      </>
    );
  }

  const handlePriceRangeFilter = (range) => {
    const timer = setTimeout(() => {
      console.log(range);
      clearTimeout(timer);
    }, 3000);
  };

  const onCancelSearch = () => {
    searchText.current = '';
    getFilteredList(storedSelectedFilters, false, false);
  };
  return (
    <div className={styles.Worlds}>
      <Grid spacing={1}>
        <div className={styles.searchContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.leftContainer}>{getWorldsLogo(worlds)}</div>
          </div>
          <img
            className={styles.collectorLogo}
            src={marketplaceListingCollectorLogo}
          />
        </div>
      </Grid>
      <FilterBy
        filterItems={getFilteredPaintings}
        sortItems={getSortedPaintings}
        priceRange={handlePriceRangeFilter}
        isMarketplace
        currentPage={currentPage}
        setLoading={setLoading}
        setCurrentPage={setCurrentPage}
      />
      <SearchBar
        className={styles.SearchBar}
        placeholder="Search Assets by name"
        value={searchText.current}
        onChange={(newValue) => {
          if (newValue === '') {
            onCancelSearch();
            newValue.toLowerCase();
          } else {
            searchText.current = newValue.trim();
          }
        }}
        onRequestSearch={() => {
          if (searchText.current) {
            getSortFilteredList(storedSelectedFilters, false, false);
          } else {
            error('Text is required in Searchbar!');
          }
        }}
        onCancelSearch={onCancelSearch}
        searchIcon={<SearchIcon style={{ color: '#ffffff' }} />}
        closeIcon={<CloseIcon style={{ color: '#ffffff' }} />}
      />
      {loading && (
        <MBox display="flex" justifyContent="center">
          <CircularProgress style={{ width: '2.5rem', height: '2.5rem' }} />
        </MBox>
      )}
      {!loading && data?.length === 0 && (
        <h4 className="no-record-msg">
          No listings currently match your search
        </h4>
      )}
      {!loading && data?.length > 0 && (
        <div className={styles.CardsSection}>
          <div className={styles.flexCardContainer}>
            {data.map((item, index) => {
              return (
                <Card
                  loggedInUser={loggedInUser}
                  data={item}
                  userListedMints={userListedPainting}
                  key={index.toString()}
                  type="listing"
                  hasOverlay
                  favorites
                  showButton
                  clickHandler={() => pushToSoloNFTWithArtistId(item)}
                />
              );
            })}
          </div>
        </div>
      )}
      {paginationNumber > 1 ? (
        <div className={styles.paginationContainer}>
          <PaginationComponent
            count={paginationNumber}
            handle={setCurrentPage}
            page={currentPage}
          />
        </div>
      ) : (
        <div className={styles.noPaginationSpace} />
      )}
      <Footer />
    </div>
  );
};

export default Worlds;
