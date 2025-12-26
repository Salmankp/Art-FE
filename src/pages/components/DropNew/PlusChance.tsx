import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Box } from '@material-ui/core';
import styles from '../styles/DropNew/PlusChance.module.scss';
import { plusyourchanceto, chancemain2 } from '../../../assets';

const PlusChance: React.FC = () => {
  const history = useHistory();

  const pushRiseCrate = () => history.push('/rise-crate');

  return (
    <div className={styles.pluschanceSection}>
      <Container className={styles.plusChanceContainer}>
        <Box className={styles.plusChanceWrapper}>
          <img src={plusyourchanceto} className={styles.plusyourchance} />
          <div>
            <img src={chancemain2} className={styles.plusmainimg} />
          </div>
        </Box>
        <Box className={styles.infoWrapper}>
          <span className={styles.headWrapper}>Here's how:</span>
          <ul className={styles.unorderListWrap}>
            <li>
              1) Purchase The Rise Heavy Metal cover NFT during Horror Drop week
            </li>
            <li>
              2) If the NFT you receive is an ODD NUMBER (i.e. 1, 37, 149 etc)
            </li>
            <li>
              3) We’ll send you one (1) free THE RISE: CRATE COLLECTION crate
              when it launches!
            </li>
          </ul>
        </Box>
        <Box className={styles.buttonBox}>
          <Button onClick={pushRiseCrate} className={styles.infoButton}>
            CLICK FOR MORE INFO
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default PlusChance;
