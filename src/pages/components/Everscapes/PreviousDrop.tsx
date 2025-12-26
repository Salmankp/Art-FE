import 'react-multi-carousel/lib/styles.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import styles from '../styles/Everscapes/PreviousDrop.module.scss';
import {
  prevhescox,
  prevheavymetal,
  prevart,
  prevgreg,
} from '../../../assets/index';

const PreviousDrop: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.previousDropWrapper}>
        <Container>
          <div className={styles.headWrapper}>
            Previous
            <span className={styles.coloredHeadWrap}>Drops</span>
          </div>
          <div className={styles.flexWrap}>
            <div>
              <div className={styles.textWrap}>
                Greg
                <br />
                Hildebrandt
              </div>
              <img className={styles.imgWrap} src={prevgreg} />
            </div>
            <div>
              <div className={styles.textWrap}>Corner4Art</div>
              <img className={styles.imgWrap} src={prevart} />
            </div>
            <div>
              <div className={styles.textWrap}>
                Richard
                <br />
                Hescox
              </div>
              <img className={styles.imgWrap} src={prevhescox} />
            </div>
            <div>
              <div className={styles.textWrap}>
                Heavy
                <br />
                MetalMas
              </div>
              <img className={styles.imgWrap} src={prevheavymetal} />
            </div>
          </div>
          <div>
            <div className={styles.dropText}>
              Missed any drops? Find them on the
              <span
                onClick={() => history.push('/marketplace')}
                className={styles.mpbtn}
              >
                Marketplace
              </span>
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default PreviousDrop;
