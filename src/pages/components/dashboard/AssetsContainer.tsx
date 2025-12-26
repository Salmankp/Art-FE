import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import AssetList from 'pages/components/dashboard/Asset/AssetList';
import { AuthenticationStateActions } from 'redux/slices/AuthenticationState';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import MyListing from './MyListing';
import styles from '../styles/dashboard/Tabs.module.scss';
import MyAssets from './MyAssets';
import { UserAPI } from '../../../api/user';
import AccountSettings from './AccountSettings';
import TransactionHistory from './TransactionHistory';

const TAB_CONSTANTS = {
  MY_ASSETS: 0,
  ASSETS_LIST: 1,
  MY_LISTINGS: 2,
  TRANSACTION_HISTORY: 3,
  ACCOUNT_SETTINGS: 4,
};

const AssetsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState(TAB_CONSTANTS.MY_ASSETS);

  const userGeneralInfo = useAppSelector(
    (state) => state.AuthenticationState.userGeneralInfo,
  );

  const getTransactionsData = async () => {
    const res: any = await UserAPI.getTransactionsHistory(
      userGeneralInfo?.userInfo?.walletAddress,
    );
    if (res.success)
      dispatch(
        AuthenticationStateActions.set_transaction_History(
          res?.response?.data || [],
        ),
      );
  };

  useEffect(() => {
    getTransactionsData();
  }, []);

  const TabHeader: React.FC = () => {
    return (
      <div className={styles.tabheader}>
        <div
          className={
            currentTab === TAB_CONSTANTS.MY_ASSETS
              ? styles.tabheadactive
              : styles.tabhead
          }
          onClick={() => setCurrentTab(TAB_CONSTANTS.MY_ASSETS)}
        >
          <div>
            <span>My Assets</span>
          </div>
        </div>
        <div
          className={
            currentTab === TAB_CONSTANTS.ASSETS_LIST
              ? styles.tabheadactive
              : styles.tabhead
          }
          onClick={() => setCurrentTab(TAB_CONSTANTS.ASSETS_LIST)}
        >
          <div>
            <span>Asset List</span>
          </div>
        </div>

        <div
          className={
            currentTab === TAB_CONSTANTS.MY_LISTINGS
              ? styles.tabheadactive
              : styles.tabhead
          }
          onClick={() => setCurrentTab(TAB_CONSTANTS.MY_LISTINGS)}
        >
          <div>
            <span>Marketplace Listings</span>
          </div>
        </div>

        <div
          className={
            currentTab === TAB_CONSTANTS.TRANSACTION_HISTORY
              ? styles.tabheadactive
              : styles.tabhead
          }
          onClick={() => setCurrentTab(TAB_CONSTANTS.TRANSACTION_HISTORY)}
        >
          <div>
            <span>Transaction History</span>
          </div>
        </div>
        <div
          className={
            currentTab === TAB_CONSTANTS.ACCOUNT_SETTINGS
              ? styles.tabheadactive
              : styles.tabhead
          }
          onClick={() => setCurrentTab(TAB_CONSTANTS.ACCOUNT_SETTINGS)}
        >
          <div>
            <span>Account Settings</span>
          </div>
        </div>
      </div>
    );
  };

  const TabsBody: React.FC = () => {
    return (
      <div className={styles.body}>
        {currentTab === TAB_CONSTANTS.MY_ASSETS && (
          <div
            className={
              currentTab === TAB_CONSTANTS.MY_ASSETS
                ? styles.tabcontentactive
                : styles.tabcontent
            }
          >
            <MyAssets isMarketplaceListings={false} />
          </div>
        )}

        {currentTab === TAB_CONSTANTS.ASSETS_LIST && (
          <div
            className={
              currentTab === TAB_CONSTANTS.ASSETS_LIST
                ? styles.tabcontentactive
                : styles.tabcontent
            }
          >
            <AssetList />
          </div>
        )}
        {currentTab === TAB_CONSTANTS.MY_LISTINGS && (
          <div
            className={
              currentTab === TAB_CONSTANTS.MY_LISTINGS
                ? styles.tabcontentactive
                : styles.tabcontent
            }
          >
            <MyListing />
          </div>
        )}
        <div
          id={styles.asd}
          className={
            currentTab === TAB_CONSTANTS.TRANSACTION_HISTORY
              ? styles.tabcontentactive2
              : styles.tabcontent
          }
        >
          <TransactionHistory />
        </div>
        {currentTab === TAB_CONSTANTS.ACCOUNT_SETTINGS && (
          <div
            className={
              currentTab === TAB_CONSTANTS.ACCOUNT_SETTINGS
                ? styles.tabcontentactive
                : styles.tabcontent
            }
          >
            <AccountSettings />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Container className={styles.tabContainerWrapper}>
        <div className={styles.tabswrap}>
          <TabHeader />
          <TabsBody />
        </div>
      </Container>
    </>
  );
};

export default AssetsContainer;
