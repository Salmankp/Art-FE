import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '../Marketplace/Card';
import { Collections } from './data/ArtistCollection';
import styles from '../styles/artist/Hero.module.scss';

export default function Home() {
  function FormRow() {
    return (
      <>
        <Grid item xs={3} className={styles.card}>
          <Card
            loggedInUser={null}
            data={Collections[0].data}
            type="available"
            hasOverlay={false}
            favorites={false}
          />
        </Grid>
        <Grid item xs={3} className={styles.card}>
          <Card
            loggedInUser={null}
            data={Collections[1].data}
            type="available"
            hasOverlay={false}
            favorites={false}
          />
        </Grid>
        <Grid item xs={3} className={styles.card}>
          <Card
            loggedInUser={null}
            data={Collections[2].data}
            type="available"
            hasOverlay={false}
            favorites={false}
          />
        </Grid>
        <Grid item xs={3} className={styles.card}>
          <Card
            loggedInUser={null}
            data={Collections[3].data}
            type="available"
            hasOverlay={false}
            favorites={false}
          />
        </Grid>
      </>
    );
  }

  return (
    <div className={styles.root}>
      <Grid spacing={1} className={styles.grid}>
        <div className={styles.upperText}>
          Frank Frazetta
          <span className={styles.special}>Fantasy Collection</span>
        </div>
        <Grid container item xs={11} spacing={2}>
          <FormRow />
          <button className={styles.row_button}>
            <span>SEE ALL FRAZETTA FANTASY LISTINGS</span>
          </button>
        </Grid>
        <div className={styles.upperText}>
          Frank Frazetta
          <span className={styles.special}>Horror Collection</span>
        </div>
        <Grid container item xs={11} spacing={2}>
          <FormRow />
          <button className={styles.row_button}>
            <span>SEE ALL FRAZETTA FANTASY LISTINGS</span>
          </button>
        </Grid>
      </Grid>
    </div>
  );
}
