import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DropDetailsInter,
  latestDropPaintingDetails,
} from '../../utils/interfaces';

interface AuthenticationState {
  loggedIn: boolean;
  generated: boolean;
  userDetails: any;
  userPaintings: any;
  filters: any;
  userListedPaintings: any;
  userListedPaintingsCount: number;
  marketplacePaintings: any;
  dashboardPagination: number;
  dropDetails: DropDetailsInter;
  latestDropDetails: DropDetailsInter;
  dropPaintings: any;
  worldDetails: any;
  walletDetails: any;
  walletCreation: any;
  loginDetail: any;
  userGeneralInfo: any;
  dropVideoSrc: any;
  dropStats?: Array<any>;
  latestDropPaintingDetails: latestDropPaintingDetails;
  bidAuctionHistory: any;
  transactionHistory: Array<any>;
}

const initialState: AuthenticationState = {
  loggedIn: false,
  generated: false,
  userDetails: [],
  dashboardPagination: 1,
  userPaintings: [],
  filters: {
    rarity: [],
    artists: [],
    collections: [],
    saleType: [],
    genre: [],
    media: [],
  },
  userListedPaintingsCount: 0,
  marketplacePaintings: [],
  dropDetails: {
    _id: '',
    artists: [],
    collections: [],
    description: '',
    logo: '',
    name: '',
    paintings: [],
    releaseTime: '',
    worldID: '',
  },
  userListedPaintings: [],
  latestDropDetails: {
    _id: '',
    artists: [],
    collections: [],
    description: '',
    logo: '',
    name: '',
    paintings: [],
    releaseTime: '',
    worldID: '',
  },
  dropPaintings: [],
  worldDetails: [],
  walletDetails: {},
  walletCreation: {},
  loginDetail: {},
  userGeneralInfo: {},
  dropVideoSrc: '',
  dropStats: [],
  latestDropPaintingDetails: {
    id: '',
    name: '',
    aboutArtWork: '',
    aboutNFT: '',
    aboutArtist: '',
    previewUrl: '',
    preview3DUrl: '',
    gridImg: '',
    authorBadge: '',
    collection: '',
    dropDate: '',
    rarity: '',
    artist: '',
    desc: '',
    saleType: '',
    price: 0,
    cryptoPrice: 0,
    isSold: false,
    availableMints: 0,
    orientation: '',
    slug: '',
    silverBadge: '',
  },
  bidAuctionHistory: {},
  transactionHistory: [],
};

export const slice = createSlice({
  name: 'AuthenticationState',
  initialState,
  reducers: {
    set_logged_in: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    set_generated: (state, action: PayloadAction<boolean>) => {
      state.generated = action.payload;
    },
    set_userDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    set_userPaintings: (state, action: PayloadAction<any>) => {
      state.userPaintings = action.payload;
    },
    set_dashboardPagination: (state, action: PayloadAction<any>) => {
      state.dashboardPagination = action.payload;
    },
    set_filters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    set_marketplacePaintings: (state, action: PayloadAction<any>) => {
      state.marketplacePaintings = action.payload;
    },
    set_dropDetails: (state, action: PayloadAction<DropDetailsInter>) => {
      state.dropDetails = action.payload;
    },
    set_dropPaintings: (state, action: PayloadAction<any>) => {
      state.dropPaintings = action.payload;
    },
    set_worldDetails: (state, action: PayloadAction<any>) => {
      state.worldDetails = action.payload;
    },
    set_walletDetails: (state, action: PayloadAction<any>) => {
      state.walletDetails = action.payload;
    },
    set_walletCreation: (state, action: PayloadAction<any>) => {
      state.walletCreation = action.payload;
    },
    set_loginDetail: (state, action: PayloadAction<any>) => {
      state.loginDetail = action.payload;
    },
    set_latesDropDetails: (state, action: PayloadAction<DropDetailsInter>) => {
      state.latestDropDetails = action.payload;
    },
    set_user_general_info: (state, action: PayloadAction<any>) => {
      state.userGeneralInfo = action.payload;
    },
    set_dropVideoSrc: (state, action: PayloadAction<any>) => {
      state.dropVideoSrc = action.payload;
    },
    setDropStats: (state, action) => {
      state.dropStats = action.payload;
    },
    set_latestDropPaintingDetails: (
      state,
      action: PayloadAction<latestDropPaintingDetails>,
    ) => {
      state.latestDropPaintingDetails = action.payload;
    },
    set_bidAuctionHistory: (state, action: PayloadAction<any>) => {
      state.bidAuctionHistory = action.payload;
    },
    set_userListedPaintings: (state, action: PayloadAction<any>) => {
      state.userListedPaintings = action.payload;
    },
    set_userListedPaintingsCount: (state, action: PayloadAction<any>) => {
      state.userListedPaintingsCount = action.payload;
    },
    set_transaction_History: (state, action: PayloadAction<any>) => {
      state.transactionHistory = action.payload;
    },
  },
});

export const AuthenticationStateActions = slice.actions;
export default slice.reducer;
