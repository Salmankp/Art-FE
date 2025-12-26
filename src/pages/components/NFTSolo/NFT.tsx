import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CircularProgress,
  Container,
  Box as MBox,
  Box,
} from '@material-ui/core';
import styles from '../styles/NFTSolo/NFT.module.scss';
import Tabs from './Tabs';
import { NFTBoxRarity } from '../../../utils/nftRarity';
import { PLAYER_MEDIA_URL } from '../../../utils/constants';

export const NftIframe = ({ paintingId }: any) => {
  return (
    <iframe
      title={paintingId}
      height="100%"
      width="100%"
      frameBorder="0"
      src={`${PLAYER_MEDIA_URL}${paintingId}`}
    />
  );
};

const NFT: React.FC = () => {
  const { location } = useHistory();
  const painting: any = location.state;

  if (!painting) {
    return (
      <Container>
        <MBox sx={{ mx: 'auto', width: 30 }} padding={20}>
          <CircularProgress style={{ marginLeft: 15, marginBottom: 20 }} />
          <h3>Loading...</h3>
        </MBox>
      </Container>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.nftiframe}>
        {painting?._id && <NftIframe paintingId={painting._id} />}
      </div>

      <div className={styles.contentwrap}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.artist}>{painting?.artists?.name}</div>
            <div className={styles.nftname}>{painting?.name}</div>
            <div className={styles.colnames}>{painting?.collection?.name}</div>
          </div>
          <NFTBoxRarity rarity={painting?.rarity} />
        </div>
        <div className={styles.tabswrap}>
          <Tabs painting={painting} />
        </div>
      </div>
    </div>
  );
};

export default NFT;
