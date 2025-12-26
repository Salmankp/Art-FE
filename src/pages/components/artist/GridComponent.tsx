import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '../Marketplace/Card';
import { Collections } from './data/ArtistCollection';
import styles from '../styles/artist/Grid.module.scss';

export const GridComponent = () => {
  return (
    <>
      <div className={styles.links}>
        <div className={styles.active}> Previous Drops</div>
        <div> Recently Sold</div>
        <div> Active Listings</div>
        <div> Gallery Features</div>
      </div>
      <div className={styles.grid}>
        <Grid item xs={3} spacing={8} className={styles.card}>
          <Card
            loggedInUser={null}
            data={Collections[0].data}
            type="available"
            hasOverlay={false}
            favorites={false}
            showButton={false}
          />
        </Grid>
        <Grid item xs={3} spacing={8} className={styles.card}>
          <Card
            loggedInUser={null}
            data={Collections[1].data}
            type="available"
            hasOverlay={false}
            favorites={false}
          />
        </Grid>
        <Grid item xs={3} spacing={8} className={styles.card}>
          <Card
            loggedInUser={null}
            data={Collections[2].data}
            type="available"
            hasOverlay={false}
            favorites={false}
          />
        </Grid>
      </div>
    </>
  );
};
