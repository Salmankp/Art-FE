import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import { Grid } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { components } from 'react-select';
import { FilterStateActions } from 'redux/slices/FiltersState';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import styles from '../styles/Marketplace/FilterBy.module.scss';
import { MarketplaceAPI } from '../../../api/marketplaceAPI';
import HeadlessMultiSelect from './HeadlessMultiSelect';
import filterArtistList from '../../../utils/filteredArtistList';
import createFilterObjectWithStates from './helpers/CreateFilterObjectWithStates';

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
});

const PriceRangeSlider = withStyles({
  root: {
    color: 'transparent',
    padding: '5px 0',
    borderRadius: 10,
    // backgroundImage: `url("https://artefy-assets.s3.ap-southeast-2.amazonaws.com/assets/images/range-slider-bg.png")`,
    backgroundImage: 'linear-gradient(90deg, #15D6F2 -15.84%, #B35AFF 81.22%)',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#3FB5F5',
    border: '4px solid white',
    marginTop: -12,
    marginLeft: -13,
    '&:focus, &:hover, &$active': {},
  },
  mark: {
    color: 'transparent',
  },
  markLabel: {
    color: 'white',
    fontWeight: 600,
  },
  active: {
    color: 'transparent',
  },
  track: {
    height: 0,
    color: 'transparent',
    opacity: 0,
  },
  rail: {
    color: 'transparent',
    opacity: 0,
    height: 0,
  },
})(Slider);

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '100%',
  }),
  menu: (provided, state) => ({
    ...provided,
    width: '100%',
    height: state.selectProps.height,
    borderRadius: state.selectProps.borderRadius,
  }),
  input: (provided) => ({
    ...provided,
    height: '37px',
    width: 'auto',
    borderRadius: '100%',
  }),
  option: (provided) => ({
    ...provided,
    color: 'black',
    padding: 20,
  }),
  control: () => ({
    display: 'flex',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  },
};

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

export const SelectOption = (props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
      <components.Option {...props}>{props.data.label}</components.Option>
      <div
        style={{
          border: '1px solid red',
          padding: 5,
        }}
        onClick={() => {
          // console.log('Closed', props.selectProps.value);
          // props.selectProps.onMenuClose();
          // if (props.selectProps.hasValue) {
          props.selectProps.onChange({
            close: true,
            ...props.selectProps.value,
          });
          // }
        }}
      >
        <span>Close</span>
      </div>
    </div>
  );
};

const FilterBy: React.FC<{
  filterItems: any;
  sortItems: any;
  priceRange: any;
  isMarketplace?: boolean;
  currentPage: number;

  setLoading: (value: boolean) => void;
  setCurrentPage: (value: number) => void;
}> = ({
  filterItems,
  sortItems,
  priceRange,
  isMarketplace,
  currentPage,
  setCurrentPage,
  setLoading,
}) => {
  const dispatch = useDispatch();
  const storedSelectedOptions = useAppSelector(
    (state) => state.FiltersState.filtersSelection,
  );

  const storedSelectedFilters = useAppSelector(
    (state) => state.FiltersState.filters,
  );

  const storedSelectedPage = useAppSelector((state) => state.FiltersState.page);

  const [filterOptions, setFilterOption] = useState<filterOptions>({
    rarity: [],
    artists: [],
    collections: [],
    saleType: [],
    genre: [],
    media: [],
  });

  const [filter, setFilter] = useState<filter>({
    rarity: '',
    artists: '',
    collections: '',
    saleType: '',
    genre: '',
    media: '',
  });
  const classess = useStyles();
  const storedSortFilters = useAppSelector(
    (state) => state.FiltersState.sortingFilters,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [priceSort, setPriceSort] = useState(
    storedSortFilters.field === 'price' ? storedSortFilters.order : '',
  );
  const [raritySort, setRaretySort] = useState(
    storedSortFilters.field === 'rarity' ? storedSortFilters.order : '',
  );
  const [recentSort, setRecentSort] = useState(
    storedSortFilters.field === 'updatedAt' ? storedSortFilters.order : '',
  );
  const marks = [
    {
      value: 0,
      scaledValue: 0,
      label: '$0',
    },
    {
      value: 100,
      scaledValue: 100000,
      label: '$100000',
    },
  ];
  const getStringWithFirstCapitalLetter = (string) => {
    let newString = '';
    string
      .toLowerCase()
      .split(' ')
      .forEach((str, i) => {
        const newWord = str.charAt(0).toUpperCase() + str.slice(1);
        i > 0 ? (newString += ` ${newWord}`) : (newString += newWord);
      });
    return newString;
  };

  const convertValues = (data) => {
    return Object.entries(data).map(([value, label]: any, i) => ({
      id: `${i}${++i}${i++}${value}`,
      label: getStringWithFirstCapitalLetter(label),
      value,
    }));
  };

  const alphabeticOrder = (list) => {
    return list.sort((a: any, b: any) => a.label.localeCompare(b.label));
  };

  const listToOptions = (list: Array<any>) => {
    const collection: Array<any> = [];
    let i = 0;
    for (const item of list) {
      const [value = '', label = ''] = Object.entries(item)[0];
      collection.push({
        id: `${i}${++i}${i++}${value}`,
        value,
        label: getStringWithFirstCapitalLetter(label),
      });
      i++;
    }
    return collection;
  };

  const onSortItemClick = (sortItem) => {
    switch (sortItem) {
      case 'Price': {
        setRaretySort('');
        setRecentSort('');
        if (!priceSort) {
          setPriceSort('ASC');
          dispatch(
            FilterStateActions.setSortingFilters({
              field: 'price',
              order: 'ASC',
            }),
          );
          sortItems({ ...filter, field: 'price', order: 'ASC' });
        }
        if (priceSort === 'ASC') {
          sortItems({ ...filter, field: 'price', order: 'DSC' });
          setPriceSort('DSC');
          dispatch(
            FilterStateActions.setSortingFilters({
              field: 'price',
              order: 'DSC',
            }),
          );
        }
        if (priceSort === 'DSC') {
          sortItems({ ...filter, field: 'price', order: '' });
          setPriceSort('');
          dispatch(
            FilterStateActions.setSortingFilters({
              field: '',
              order: '',
            }),
          );
        }
        break;
      }
      case 'Rarity': {
        setPriceSort('');
        setRecentSort('');
        if (!raritySort) {
          sortItems({ ...filter, field: 'rarity', order: 'ASC' });
          setRaretySort('ASC');
          dispatch(
            FilterStateActions.setSortingFilters({
              field: 'rarity',
              order: 'ASC',
            }),
          );
        }
        if (raritySort === 'ASC') {
          sortItems({ ...filter, field: 'rarity', order: 'DSC' });
          setRaretySort('DSC');
          dispatch(
            FilterStateActions.setSortingFilters({
              field: 'rarity',
              order: 'DSC',
            }),
          );
        }
        if (raritySort === 'DSC') {
          sortItems({ ...filter, field: 'rarity', order: '' });
          setRaretySort('');
          dispatch(
            FilterStateActions.setSortingFilters({
              field: '',
              order: '',
            }),
          );
        }
        break;
      }
      case 'Recent': {
        setRaretySort('');
        setPriceSort('');
        if (!recentSort) {
          sortItems({ ...filter, field: 'updatedAt', order: 'DSC' });
          setRecentSort('DSC');
          dispatch(
            FilterStateActions.setSortingFilters({
              field: 'updatedAt',
              order: 'DSC',
            }),
          );
        }
        if (recentSort === 'DSC') {
          sortItems({ ...filter, field: '', order: '' });
          setRecentSort('');
          dispatch(
            FilterStateActions.setSortingFilters({
              field: '',
              order: '',
            }),
          );
        }
        break;
      }
      default:
        break;
    }
  };

  const getFilteredAndSortedMarketplace = () => {
    setLoading(true);
    if (priceSort) {
      sortItems({
        field: 'price',
        order: priceSort.toLowerCase(),
        ...filter,
      });
      return;
    }
    if (raritySort) {
      sortItems({
        field: 'rarity',
        order: raritySort.toLowerCase(),
        ...filter,
      });
      return;
    }
    if (recentSort) {
      sortItems({
        field: 'updatedAt',
        order: recentSort.toLowerCase(),
        ...filter,
      });
      return;
    }
    filterItems(filter);
  };

  useEffect(() => {
    if (isMarketplace) {
      const updateFiltersObject = createFilterObjectWithStates(
        storedSelectedOptions,
        filter,
      );
      setFilter(updateFiltersObject);

      dispatch(FilterStateActions.setFilters(filter));
    }
  }, [filter]);

  useEffect(() => {
    if (isMarketplace) {
      dispatch(FilterStateActions.setPage(currentPage));
      getFilteredAndSortedMarketplace();
    }
  }, [filter, currentPage]);

  useEffect(() => {
    (async () => {
      const { data } = await MarketplaceAPI.getFilters();
      // array which holds all values
      const artistArray = data.data.artists;
      const result: any = [];
      artistArray.map((item: any) => {
        if (
          !filterArtistList?.includes(
            `${Object.values(item)[0]}`.toLocaleLowerCase(),
          )
        ) {
          result.push(item);
        }
        return false;
      });
      setFilterOption({
        ...filterOptions,
        artists: result || [],
      });
      setFilterOption((current) => ({
        ...current,
        rarity: convertValues(data.data.rarity),
        media: alphabeticOrder(convertValues(data.data.media)),
        saleType: alphabeticOrder(convertValues(data.data.saleType)),
        genre: alphabeticOrder(convertValues(data.data.genre)),
        collections: alphabeticOrder(listToOptions(data.data.collections)),
        artists: alphabeticOrder(listToOptions(result)),
      }));
    })();

    // if (isMarketplace) {
    //   setFilter(storedSelectedFilters);
    //   filterItems(filter);
    // }
  }, []);

  return (
    <>
      <div className={styles.FilterSortSection}>
        <Grid spacing={1}>
          <Grid item spacing={3} className={classess.grid}>
            <div className="marketplace-listing-filters">
              <div className={styles.Main}>
                <Grid item md={12}>
                  <div className={styles.filterSection}>
                    <div className={styles.labelSection}>
                      <p>Filter by</p>
                      <div />
                    </div>

                    <div className={styles.filterItemsSection}>
                      <div className={styles.items}>
                        <div className={styles.filterSelectWrap}>
                          <HeadlessMultiSelect
                            options={filterOptions.rarity}
                            onChange={(values) =>
                              setFilter({ ...filter, rarity: values })
                            }
                            label="Rarity"
                            isMarketplace
                          />
                        </div>
                        <div className={styles.filterSelectWrap}>
                          <HeadlessMultiSelect
                            options={filterOptions.artists}
                            onChange={(values) =>
                              setFilter({ ...filter, artists: values })
                            }
                            label="Artist"
                            isMarketplace
                          />
                        </div>
                        <div className={styles.filterSelectWrap}>
                          <HeadlessMultiSelect
                            options={filterOptions.collections}
                            onChange={(values) =>
                              setFilter({ ...filter, collections: values })
                            }
                            label="Collection"
                            isMarketplace
                          />
                        </div>
                        <div className={styles.filterSelectWrap}>
                          <HeadlessMultiSelect
                            options={filterOptions.genre}
                            onChange={(values) =>
                              setFilter({ ...filter, genre: values })
                            }
                            label="Genre"
                            isMarketplace
                          />
                        </div>
                        <div className={styles.filterSelectWrap}>
                          <HeadlessMultiSelect
                            options={filterOptions.media}
                            onChange={(values) =>
                              setFilter({ ...filter, media: values })
                            }
                            label="Media"
                            isMarketplace
                          />
                        </div>
                        {/* Hide for now */}
                        {/* <div className={styles.filterItemWrap}>
                          <p>SaleType</p>
                          <div className={styles.filterItem}>
                            <Select
                              options={filterOptions.saleType}
                              styles={customStyles}
                              classNamePrefix="select"
                              components={{
                                IndicatorSeparator: () => null,
                              }}
                              onChange={(e: any) =>
                                setFilter({
                                  ...filter,
                                  saleType: e?.value || '',
                                })
                              }
                            />
                          </div>
                        </div> */}
                      </div>
                    </div>
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
                        {/* Hide for now */}
                        <div className={styles.sortItem}>
                          <p
                            className={styles.heading}
                            onClick={() => onSortItemClick('Rarity')}
                          >
                            RARITY
                            {raritySort === 'ASC' && <ArrowUpward />}
                            {raritySort === 'DSC' && <ArrowDownward />}
                          </p>
                          <div className={styles.divider} />
                          <div className={styles.options} />
                          <p
                            className={`${styles.sortName} ${
                              raritySort === 'DSC' && styles.active
                            }`}
                            onClick={() => {
                              sortItems({
                                ...filter,
                                field: 'rarity',
                                order: 'DSC',
                              });
                              setPriceSort('');
                              setRaretySort('DSC');
                              setRecentSort('');
                              dispatch(
                                FilterStateActions.setSortingFilters({
                                  field: 'rarity',
                                  order: 'DSC',
                                }),
                              );
                            }}
                          >
                            Rare first
                          </p>
                          <p
                            className={`${styles.sortName} ${
                              raritySort === 'ASC' && styles.active
                            }`}
                            onClick={() => {
                              sortItems({
                                ...filter,
                                field: 'rarity',
                                order: 'ASC',
                              });
                              setPriceSort('');
                              setRaretySort('ASC');
                              setRecentSort('');
                              dispatch(
                                FilterStateActions.setSortingFilters({
                                  field: 'rarity',
                                  order: 'DSC',
                                }),
                              );
                            }}
                          >
                            Common first
                          </p>
                        </div>

                        <div className={styles.sortItem}>
                          <p
                            className={styles.heading}
                            onClick={() => onSortItemClick('Price')}
                          >
                            PRICE
                            {priceSort === 'ASC' && <ArrowUpward />}
                            {priceSort === 'DSC' && <ArrowDownward />}
                          </p>
                          <div className={styles.divider} />
                          <div className={styles.options} />
                          <p
                            className={`${styles.sortName} ${
                              priceSort === 'ASC' && styles.active
                            }`}
                            onClick={() => {
                              sortItems({
                                ...filter,
                                field: 'price',
                                order: 'ASC',
                              });
                              setRaretySort('');
                              setPriceSort('ASC');
                              setRecentSort('');
                              dispatch(
                                FilterStateActions.setSortingFilters({
                                  field: 'price',
                                  order: 'ASC',
                                }),
                              );
                            }}
                          >
                            Low to High
                          </p>
                          <p
                            className={`${styles.sortName} ${
                              priceSort === 'DSC' && styles.active
                            }`}
                            onClick={() => {
                              sortItems({
                                ...filter,
                                field: 'price',
                                order: 'DSC',
                              });
                              setRaretySort('');
                              setRecentSort('');
                              setPriceSort('DSC');
                              dispatch(
                                FilterStateActions.setSortingFilters({
                                  field: 'price',
                                  order: 'DSC',
                                }),
                              );
                            }}
                          >
                            High to Low
                          </p>
                        </div>
                        <div className={styles.sortItem}>
                          <p
                            className={styles.heading}
                            onClick={() => onSortItemClick('Recent')}
                          >
                            LISTING
                            {recentSort === 'DSC' && <ArrowDownward />}
                          </p>
                          <div className={styles.divider} />
                          <div className={styles.options} />
                          <p
                            className={`${styles.sortName} ${
                              recentSort.toUpperCase() === 'DSC' &&
                              styles.active
                            }`}
                            onClick={() => {
                              sortItems({
                                ...filter,
                                field: 'updatedAt',
                                order: 'DSC',
                              });
                              setRaretySort('');
                              setPriceSort('');
                              setRecentSort('DSC');
                              dispatch(
                                FilterStateActions.setSortingFilters({
                                  field: 'updatedAt',
                                  order: 'dsc',
                                }),
                              );
                            }}
                          >
                            Most Recent Listing
                          </p>
                        </div>
                      </div>
                      {/* Hide for now */}
                      {/* <div className={styles.rightContainer}>
                        <p className={styles.price}>PRICE RANGE</p>
                        <PriceRangeSlider
                          defaultValue={[0, 100000]}
                          getAriaValueText={valueText}
                          className="price-range-slider"
                          aria-labelledby="track-inverted-range-slider"
                          marks={marks}
                          onChange={(e, value) => priceRange(value)}
                        />
                      </div> */}

                      {isMarketplace && (
                        <div className={styles.ownedListedWraper}>
                          <div className={styles.ownedIndicatorWrapper}>
                            <div className={styles.ownedIndicatorCircle} />
                            <p className={styles.ownedIndicatorText}>OWNED</p>
                          </div>
                          <div className={styles.listedWrapper}>
                            <div className={styles.listedIndicatorCircle} />
                            <p className={styles.listedIndicatorText}>LISTED</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default FilterBy;
