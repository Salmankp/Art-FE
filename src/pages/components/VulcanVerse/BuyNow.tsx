import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import styles from '../styles/VulcanVerse/BuyNow.module.scss';
import { SilverWrrior } from '../../../assets/index';

const BuyNow: React.FC = () => {
  const history = useHistory();

  return (
    <div className={styles.Signup}>
      <div className={styles.innerwrap}>
        <div className={styles.innerDont}>
          <div className={styles.dontMiss}>
            <img src={SilverWrrior} alt="" />
          </div>
          <div className={styles.rightContent}>
            <div className={styles.btnDraw}>
              <Button
                onClick={() => history.push('/drop/silver-warrior-medallion')}
                className={styles.drawButton}
                style={{
                  backgroundColor: '#ef0000',
                }}
                disabled
              >
                Drop Ended
              </Button>
            </div>
            <div className={styles.text}>DON’T MISS IT!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
