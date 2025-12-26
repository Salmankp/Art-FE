import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Filters {
  filters: any;
  filtersSelection: any;
  page: number;
  sortingFilters: any;
}

const initialState: Filters = {
  filters: {
    rarity: '',
    artists: '',
    collections: '',
    saleType: '',
    genre: '',
    media: '',
  },
  filtersSelection: {
    Collection: [],
    Rarity: [],
    Artist: [],
    Genre: [],
    Media: [],
  },
  page: 1,
  sortingFilters: {
    field: '',
    order: '',
  },
};

export const filterSlice = createSlice({
  name: 'FilterState',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setFiltersSelection: (state, action: PayloadAction<any>) => {
      state.filtersSelection = action.payload;
    },
    setSortingFilters: (state, action: PayloadAction<any>) => {
      state.sortingFilters = action.payload;
    },
  },
});

export const FilterStateActions = filterSlice.actions;
export default filterSlice.reducer;
