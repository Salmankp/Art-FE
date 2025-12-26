import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import HeadlessMultiSelect from 'pages/components/Marketplace/HeadlessMultiSelect';
import { useAppSelector } from 'redux/hooks';

import styles from '../styles/Marketplace/FilterBy.module.scss';

const useStyles = makeStyles({
  grid: {
    '& .MuiGrid-root .MuiGrid-item': {
      width: '100%',
      padding: 0,
    },
  },
  filterButton: {
    background: 'linear-gradient(180deg, #3FB5F5 0%, #B35AFF 100%)',
    border: '2px dashed #353945',
    boxSizing: 'border-box',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  price: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '12px',
  },

  slider: {
    width: '24px',
    height: '24px',
    filter: 'drop-shadow(0px 8px 16px rgba(15, 15, 15, 0.2))',
    left: 'calc(50% - 24px/2 - 92px)',
    top: 'calc(50% - 24px/2 + 42px)',
    border: '4px dashed #FCFCFD',
    boxSizing: 'border-box',
    boxShadow: '0px 8px 16px -4px rgba(15, 15, 15, 0.2)',
    borderRadius: '24px',
    transform: 'rotate(-180deg)',
  },
  sortCls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '230px',
    paddingBottom: '7%',
  },
  paddingNone: {
    padding: '0px !important',
  },
});

interface filter {
  rarity: any;
  artists: any;
  collections: any;
  saleType: string;
  genre: string;
  media: string;
}

interface filterOptions {
  rarity: any;
  artists: any;
  collections: any;
  saleType: any;
  genre: any;
  media: any;
}

const FilterSnipet: React.FC<{
  filterItems?: any;
  sortItems?: any;
  priceRange?: any;
  selectedFilters?: any;
  filter: filter;
  sortObj: any;
  handleSort: (sortObj: any) => void;
  handle: (keyName: string, value: string) => void;
}> = ({ filterItems, sortItems, handleSort, handle }) => {
  const filterOptions = useAppSelector(
    (state) => state.AuthenticationState.filters,
  );

  const classess = useStyles();
  const [priceSort, setPriceSort] = useState('');
  const [raritySort, setRaretySort] = useState('');
  const [recentSort, setRecentSort] = useState('');

  return (
    <div
      className={`${styles.FilterSortSection} ${classess.paddingNone}`}
      style={{ padding: '0px !important' }}
    >
      <Grid spacing={1}>
        <Grid item className={classess.grid}>
          <div className="marketplace-listing-filters">
            <div className={styles.Main}>
              <Grid item md={12}>
                <div className={styles.filterSection}>
                  <div className={styles.labelSection}>
                    <p>Filter by</p>
                    <div />
                  </div>
                  {filterOptions && (
                    <div className={styles.filterItemsSection}>
                      <div className={styles.items}>
                        <div className={styles.filterSelectWrap}>
                          <HeadlessMultiSelect
                            options={filterOptions.rarity}
                            onChange={
                              (values) => handle('rarity', values)
                              // setFilter({ ...filter, rarity: values })
                            }
                            label="Rarity"
                            isMarketplace={false}
                          />
                        </div>
                        <div className={styles.filterSelectWrap}>
                          <HeadlessMultiSelect
                            options={filterOptions.artists}
                            onChange={
                              (values) => handle('artists', values)
                              // setFilter({ ...filter, artists: values })
                            }
                            label="Artist"
                            isMarketplace={false}
                          />
                        </div>
                        <div className={styles.filterSelectWrap}>
                          <HeadlessMultiSelect
                            options={filterOptions.collections}
                            onChange={
                              (values) => handle('collections', values)
                              // setFilter({ ...filter, collections: values })
                            }
                            label="Collection"
                            isMarketplace={false}
                          />
                        </div>
                        <div className={styles.filterSelectWrap}>
                          <HeadlessMultiSelect
                            options={filterOptions.genre}
                            onChange={
                              (values) => handle('genre', values)
                              // setFilter({ ...filter, genre: values })
                            }
                            label="Genre"
                            isMarketplace={false}
                          />
                        </div>
                        <div className={styles.filterSelectWrap}>
                          <HeadlessMultiSelect
                            options={filterOptions.media}
                            onChange={
                              (values) => handle('media', values)
                              // setFilter({ ...filter, media: values })
                            }
                            label="Media"
                            isMarketplace={false}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item md={12} xs={12} sm={12}>
                <div className={styles.sortSection}>
                  <div className={styles.labelSection}>
                    <p>Sort by</p>
                    <div />
                  </div>
                  <div className={styles.sortItemsSection}>
                    <div className={styles.leftContainer}>
                      <div className={styles.sortItem}>
                        <p className={styles.heading}>
                          RARITY
                          {raritySort === 'ASC' && <ArrowUpward />}
                          {raritySort === 'DSC' && <ArrowDownward />}
                        </p>
                        <div className={styles.divider} />
                        <div className={styles.options} />
                        <div className={classess.sortCls}>
                          <p
                            className={`${styles.sortName} ${
                              raritySort === 'DSC' && styles.active
                            }`}
                            onClick={() => {
                              // sortItems({ field: 'rarity', order: 'DSC' });

                              setPriceSort('');
                              setRaretySort('DSC');
                              handleSort({ price: 0, rarity: 1, recent: 0 });
                            }}
                          >
                            Rare first
                          </p>
                          <p
                            className={`${styles.sortName} ${
                              raritySort === 'ASC' && styles.active
                            }`}
                            onClick={() => {
                              // sortItems({ field: 'rarity', order: 'ASC' });
                              setPriceSort('');
                              setRaretySort('ASC');
                              handleSort({ price: 0, rarity: -1, recent: 0 });
                            }}
                          >
                            Common first
                          </p>
                        </div>
                      </div>

                      <div className={styles.sortItem}>
                        <p className={styles.heading}>
                          PRICE
                          {priceSort === 'ASC' && <ArrowUpward />}
                          {priceSort === 'DSC' && <ArrowDownward />}
                        </p>
                        <div className={styles.divider} />
                        <div className={styles.options} />
                        <div className={classess.sortCls}>
                          <p
                            className={`${styles.sortName} ${
                              priceSort === 'ASC' && styles.active
                            }`}
                            onClick={() => {
                              // sortItems({ field: 'price', order: 'ASC' });
                              setRaretySort('');
                              setPriceSort('ASC');
                              handleSort({ price: -1, rarity: 0, recent: 0 });
                            }}
                          >
                            Low to High
                          </p>
                          <p
                            className={`${styles.sortName} ${
                              priceSort === 'DSC' && styles.active
                            }`}
                            onClick={() => {
                              // sortItems({ field: 'price', order: 'DSC' });
                              setRaretySort('');
                              setPriceSort('DSC');
                              handleSort({ price: 1, rarity: 0, recent: 0 });
                            }}
                          >
                            High to Low
                          </p>
                        </div>
                      </div>
                      <div className={styles.sortItem}>
                        <p className={styles.heading}>Purchases</p>
                        <div className={styles.divider} />
                        <div className={styles.options} />
                        <div className={classess.sortCls}>
                          <p
                            className={`${styles.sortName} ${
                              recentSort === 'Most Recent' && styles.active
                            }`}
                            onClick={() => {
                              // sortItems({ field: 'price', order: 'DSC' });
                              setRaretySort('');
                              setPriceSort('');
                              setRecentSort('Most Recent');
                              handleSort({ price: 0, rarity: 0, recent: 1 });
                            }}
                          >
                            Most Recent Purchases
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FilterSnipet;
