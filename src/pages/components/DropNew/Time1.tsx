import React, { CSSProperties } from 'react';
import Countdown from 'react-countdown';
import styles from '../styles/DropNew/NFT2.module.scss';
import { paypalicon, maticicon, creditcardicon } from '../../../assets';

interface TimeData {
  timeData: {
    date: string;
    data: any;
    isMetalLaunch: boolean;
  };
  setIsAutoRerender: (value: number) => void;
  autoRerender: number;
}

const Time1 = ({ timeData, setIsAutoRerender, autoRerender }: TimeData) => {
  const isComingSoon = timeData?.data?.isComingSoon;
  const IsSold = timeData?.data?.isSold;
  const comingSoonCountDownTimer = ({ days, hours, minutes, seconds }) => {
    if (!hours && !minutes && !seconds) {
      setIsAutoRerender(1);
    } // Render a countdown
    return (
      <div className={styles.timee2}>
        {!timeData.isMetalLaunch && (
          <>
            <div className={styles.timee}>
              {days < 10 ? `0${days}` : days}
              <span>days</span>
            </div>
            <div className={styles.sep}>:</div>
          </>
        )}
        <div className={styles.timee}>
          {hours < 10 ? `0${hours}` : hours}
          <span>hour</span>
        </div>
        <div className={styles.sep}>:</div>
        <div className={styles.timee}>
          {minutes < 10 ? `0${minutes}` : minutes}
          <span>min</span>
        </div>
        <div className={styles.sep}>:</div>
        <div className={styles.timee}>
          {seconds < 10 ? `0${seconds}` : seconds}
          <span>sec</span>
        </div>
      </div>
    );
  };

  const dropFinishesCountDownTimer = ({ days, hours, minutes, seconds }) => {
    if (!hours && !minutes && !seconds) setIsAutoRerender(2);
    // Render a countdown
    return (
      <div className={styles.timee2}>
        {!timeData.isMetalLaunch && (
          <>
            <div className={styles.timee}>
              {days < 10 ? `0${days}` : days}
              <span>days</span>
            </div>
            <div className={styles.sep}>:</div>
          </>
        )}
        <div className={styles.timee}>
          {hours < 10 ? `0${hours}` : hours}
          <span>hour</span>
        </div>
        <div className={styles.sep}>:</div>
        <div className={styles.timee}>
          {minutes < 10 ? `0${minutes}` : minutes}
          <span>min</span>
        </div>
        <div className={styles.sep}>:</div>
        <div className={styles.timee}>
          {seconds < 10 ? `0${seconds}` : seconds}
          <span>sec</span>
        </div>
      </div>
    );
  };

  const getStatusText = (isSold: boolean, availableMints: number) => {
    const styleColor = timeData.data.bidBtn
      ? { color: `${timeData.data.bidBtn.background}` }
      : ({ textAlign: 'left' } as CSSProperties);
    if (timeData.isMetalLaunch) {
      if (!isComingSoon && !isSold && !timeData.data.isDropFinished) {
        return (
          <p className={styles.title1}>
            DROP
            <br />
            FINISHES
          </p>
        );
      }
      if (isSold && timeData.data.isDropFinished) {
        return <p className={styles.title2}>DROP ENDED</p>;
      }
      if (timeData.data.isComingSoon) {
        return (
          <p className={styles.title1}>
            COMING
            <br />
            SOON
          </p>
        );
      }
      if (availableMints > 0 && !isSold && timeData.data.isDropFinished) {
        return <p className={styles.title2}>DROP ENDED</p>;
      }
      if (availableMints <= 0 && isSold) {
        return (
          <p className={styles.title2}>
            DROP
            <br />
            FINISHED
          </p>
        );
      }
    }

    if (timeData?.data?.isDropFinished)
      return (
        <p className={styles.title2} style={styleColor}>
          DROP ENDED
        </p>
      );
    if (!isComingSoon && !isSold) {
      return (
        <>
          <p className={styles.title1}>DROP LIVE</p>
          <p className={styles.slash}>| </p>

          <p className={styles.title3}>DROP ENDS</p>
        </>
      );
    }

    if (isComingSoon) {
      return (
        <p className={styles.title} style={styleColor}>
          DROP STARTS
        </p>
      );
    }
  };

  return (
    <div className={styles.timewrap}>
      <div className={styles.iconwrap}>
        <div>
          <img src={creditcardicon} alt="logo" />
          &nbsp;Credit Card
        </div>
        <div>
          <img src={paypalicon} alt="logo" />
          &nbsp;Paypal
        </div>
        <div>
          <img src={maticicon} alt="logo" />
          &nbsp;Matic
        </div>
      </div>
      <div className={styles.timer}>
        {getStatusText(
          timeData.data.availableMints === 0,
          timeData.data.availableMints,
        )}

        {isComingSoon && (
          <Countdown
            date={new Date(timeData?.data?.dropDate)}
            renderer={comingSoonCountDownTimer}
          />
        )}

        {/* {timeData.isMetalLaunch && */}
        {!isComingSoon && !timeData.data.isDropFinished && !IsSold && (
          <Countdown
            date={new Date(timeData?.data?.dropEndDate)}
            renderer={dropFinishesCountDownTimer}
          />
        )}
      </div>
      {/* {data?.saleType && ( */}
      <div className={styles.textwrap}>
        <span
          style={{ color: '#A69A9A', fontWeight: 'bold', fontSize: '16px' }}
        >
          Sale Type |&nbsp;
        </span>
        {/* {data?.saleType} */}
        <span
          style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px' }}
        >
          {timeData?.data?.saleType}
        </span>
      </div>
      {/* )} */}
    </div>
  );
};

export default Time1;
