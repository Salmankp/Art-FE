import React from 'react';
import { Tooltip } from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';
import DataTable from 'react-data-table-component';
import { info } from 'utils/toast';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styles from '../styles/dashboard/TransactionHistory.module.scss';
import { useAppSelector } from '../../../redux/hooks';

const getPolygonScanURL = (address: string) =>
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? `https://polygonscan.com/tx/${address}`
    : `https://mumbai.polygonscan.com/tx/${address}`;

const TransactionHistory = () => {
  dayjs.extend(relativeTime);

  const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text);
    info('Copied to clipboard');
  };

  const transactionHistory = useAppSelector(
    (state) => state.AuthenticationState.transactionHistory,
  );

  const columns: any = [
    {
      name: 'Transaction ID',
      selector: 'transactionId',
      sortable: true,
      minWidth: '100px',
      maxWidth: '180px',
      cell: (row: any) => (
        <Tooltip title={row?.transactionId} placement="top">
          <span
            className={styles.cellItem}
            onClick={() => copyToClipBoard(row?.to)}
          >
            {row?.transactionId}
          </span>
        </Tooltip>
      ),
    },
    {
      name: 'Asset',
      selector: 'name',
      sortable: true,
      minWidth: '160px',
      cell: (row: any) => (
        <div className={styles.assetRoot}>
          <img
            src={row?.previewUrl}
            width={50}
            height="100%"
            alt="preview img"
          />
          <span className={styles.cellItem}>{row?.name}</span>
        </div>
      ),
    },
    {
      name: 'Date',
      selector: 'timeStamp',
      sortable: true,
      minWidth: '200px',
      cell: (row: any) => {
        return (
          <>
            {dayjs(new Date(+row.timeStamp * 1000)).format('DD/MM/YYYY h:mm A')}
          </>
        );
      },
    },
    {
      name: 'Transaction Type',
      selector: 'type',
      sortable: true,
    },
    {
      name: 'Value',
      selector: 'price',
      sortable: true,
      minWidth: '100px',
      maxWidth: '120px',
    },
    {
      name: '',
      selector: '',
      sortable: false,
      minWidth: '100px',
      maxWidth: '120px',
      cell: (row: any) => {
        return (
          <a
            href={getPolygonScanURL(row?.transactionId)}
            target="_blank"
            className={styles.detailtBtn}
            rel="noreferrer"
          >
            Details
          </a>
        );
      },
    },
  ];

  return (
    <div className={styles.transactionHistoryWrap}>
      <DataTable
        className={styles.transactionsTable}
        persistTableHead
        columns={columns}
        data={transactionHistory}
        striped
        sortIcon={<ExpandLess />}
      />
    </div>
  );
};
export default TransactionHistory;
