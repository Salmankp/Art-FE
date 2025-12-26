import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import 'moment-timezone';
import styles from '../styles/MarketplaceAuctionListing/AuctionListing.module.scss';

import { useAppSelector } from '../../../redux/hooks';

const AuctionListing: React.FC<{
  bidHistoryArray: any;
  paintingName: string;
}> = ({ bidHistoryArray = [], paintingName }) => {
  const getAestTime = (date: any) => {
    return `${moment(date)
      .tz('Australia/Brisbane')
      .format('DD/MM/YYYY hh:mm:ss A z')}`;
  };
  return (
    <>
      {bidHistoryArray?.length && (
        <Container className={styles.listingWrap}>
          <Table>
            <TableHead className={styles.tbHead}>
              {/* <TableRow className={styles.tbRow}> */}
              <TableCell className={styles.tableCell}>Type</TableCell>
              <TableCell className={styles.tableCell}>NFT NAME</TableCell>
              <TableCell className={styles.tableCell}>$ BID</TableCell>
              <TableCell className={styles.tableCell}>BIDDER</TableCell>
              <TableCell className={styles.tableCell}>BID TIME</TableCell>
              {/* </TableRow> */}
            </TableHead>
            <TableBody>
              {bidHistoryArray?.map((bid) => (
                <TableRow className={styles.tbRow}>
                  <TableCell className={styles.tableCell}>
                    {bid?.type}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {paintingName}
                  </TableCell>
                  <TableCell className={styles.tableCell2}>
                    <span>$</span>
                    {bid?.price}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {bid?.bidderId.username}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {getAestTime(bid?.date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      )}
    </>
  );
};
export default AuctionListing;
