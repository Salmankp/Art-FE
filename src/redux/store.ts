import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import * as Flatted from 'flatted';
import AuthenticationState from './slices/AuthenticationState';
import TransactionState from './slices/TransactionState';
import ErrorState from './slices/ErrorState';
import SuccessState from './slices/SuccessState';
import FiltersState from './slices/FiltersState';

const isLoggedIn = !!localStorage.getItem('authToken');

const preloadedState = {
  AuthenticationState: {
    loggedIn: isLoggedIn,
    generated: false,
    userDetails: [],
    dashboardPagination: 1,
    userPaintings: [],
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
    errorMessage: '',
    showErrorModal: false,
    showSuccessModal: false,
  },
};

export const transformCircular = createTransform(
  (inboundState, key) => Flatted.stringify(inboundState),
  (outboundState, key) => Flatted.parse(outboundState),
);

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [transformCircular],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    AuthenticationState,
    TransactionState,
    ErrorState,
    SuccessState,
    FiltersState,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default { store, persistor };
