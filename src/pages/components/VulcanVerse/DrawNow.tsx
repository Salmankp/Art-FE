import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import styles from '../styles/VulcanVerse/DrawNow.module.scss';

const calculateTimeLeft = () => {
  const liveDate = new Date('2021-11-18T21:00:00.000+00:00');
  const difference = +new Date(liveDate) - +new Date();
  let timeLeft: any = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

const BuyNow: React.FC = () => {
  const history = useHistory();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  }, []);

  return (
    <div className={styles.Signup}>
      <div className={styles.innerwrap}>
        <div className={styles.messageContainer}>
          Drop Finished !
          <div className={styles.timewrap}>
            <div className={styles.timer}>
              <span className={styles.dateNumber}>{timeLeft?.days || 0}</span>
              <span className={styles.dateDays}>Days</span>
            </div>
            <div className={styles.colon}>:</div>
            <div className={styles.timer}>
              <span className={styles.dateNumber}>{timeLeft?.hours || 0}</span>
              <span className={styles.dateDays}>hours</span>
            </div>
            <div className={styles.colon}>:</div>
            <div className={styles.timer}>
              <span className={styles.dateNumber}>
                {timeLeft?.minutes || 0}
              </span>
              <span className={styles.dateDays}>minutes</span>
            </div>
            <div className={styles.colon}>:</div>
            <div className={styles.timer}>
              <span className={styles.dateNumber}>
                {timeLeft?.seconds || 0}
              </span>
              <span className={styles.dateDays}>second</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
