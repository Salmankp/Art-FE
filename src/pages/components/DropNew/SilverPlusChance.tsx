import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Container, Box } from '@material-ui/core';
import styles from '../styles/MedalionDrop/PlusChance.module.scss';

const SilverPlusChance: React.FC = () => {
  const history = useHistory();

  const pushRiseCrate = () => history.push('/rise-crate');

  return (
    <div className={styles.collectionSection}>
      <Container className={styles.collectionContainer}>
        <Box className={styles.textWrapper}>
          <div className={styles.descWrap}>
            Frazetta Frenzy Silver Warrior: Starts 7:00 AM AEDT 11/11/21. Ends
            8:00 AM AEDT 19/11/21. Open to NSW, NT, QLD, TAS, VIC and WA
            residents 18+ who fulfil the entry/eligibility requirements. 333
            prizes to be won (refer to full T&Cs for complete list of prizes).
            Total prize pool is $127,000 (inc GST). Prize draw 3:00 PM AEDT
            23/11/21 at Level 2 11 York St Sydney NSW 2000. Winners notified via
            DM on social media and published at artefy.io/everscapes 27/11/21.
            Promoter is Artefy Pty Ltd. ABN 33 650 695 248. Suite 402, Level 24,
            Tower 2, 101 Grafton St Bondi Junction NSW 2022. Authorised under
            NSW Authority No. TP/01421. For full T&Cs refer to &nbsp;
            <Link to="/medallian-terms" className={styles.pluslink}>
              For full T&Cs refer to artefy.io/everscapes.
            </Link>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default SilverPlusChance;
