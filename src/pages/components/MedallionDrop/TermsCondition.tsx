import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import { dropnewbg } from '../../../assets';
import styles from '../styles/MedallionDrop/TermsCondition.module.scss';

const TermsCondition = () => {
  return (
    <>
      <Typography component="div" className={styles.border} />
      <Typography
        component="div"
        className={styles.termsCondition}
        style={{
          background: `url(${dropnewbg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Container className={styles.innerContainer}>
          <div className={styles.innerArea}>
            <Typography component="h1" className={styles.title}>
              MOON MAID DRAW TERMS AND CONDITIONS
            </Typography>
            <Typography className={styles.description}>
              Starts 6:00 AM AEST 23/4/22. Ends 6:00 AM AEST 30/4/22. Open to
              AUST residents who fulfil the entry/eligibility requirements. 333
              prizes to be won with a total prize pool of $133,000 (inc GST).
              Prize draw 3:00 PM AEST 5/5/22. Winners notified via DM on social
              media and published at artefy.io/drop/moonmaid on 6/5/22. Promoter
              is Artefy Pty Ltd. ABN 33 650 695 248. C/GMP Partners Pty Limited
              Suite 402, Level 24, Tower 2, 101 Grafton St Bondi Junction NSW
              2022. Authorised under NSW Authority No. TP/01421. For full T&Cs
              refer to{' '}
              <Link
                to="/TAC/moonmaid"
                style={{ color: 'white', textDecoration: 'none' }}
              >
                artefy.io/TAC/moonmaid.
              </Link>
            </Typography>
          </div>
        </Container>
      </Typography>
      <Typography component="div" className={styles.border} />
    </>
  );
};

export default TermsCondition;
