import 'reflect-metadata';
import React, { StrictMode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import CheckInternetConnected from 'check-internet-connected';
import './index.scss';
import { Offline, Online } from 'react-detect-offline';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { disconnected } from './assets/index';
import App from './App';
import MetamaskProvider from './contexts/Metamask';
import redux from './redux/store';
import 'Styles.scss';

const queryClient = new QueryClient();
const AppWrapper = () => {
  return (
    <>
      <Online>
        <StrictMode>
          <QueryClientProvider client={queryClient}>
            <MetamaskProvider>
              <Provider store={redux.store}>
                <PersistGate loading={null} persistor={redux.persistor}>
                  <Router>
                    <App />
                  </Router>
                </PersistGate>
              </Provider>
            </MetamaskProvider>
          </QueryClientProvider>
        </StrictMode>
      </Online>
      <Offline>
        <div className="indexWraper">
          <div className="oflineText">
            <img src={disconnected} alt="" width="35px" height="35px" />
            <h1
              style={{
                marginBottom: 'unset',
              }}
            >
              {' '}
              Offline
            </h1>
          </div>
          <div className="longText">
            <h3
              style={{
                marginLeft: '5%',
              }}
            >
              Your network is unavailable. Please check your data or wifi
              connection.
            </h3>
          </div>

          <div className="tryAgainButton">
            <button
              className="trybutton"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </Offline>
    </>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
