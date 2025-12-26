import React, { CSSProperties } from 'react';
import Countdown from 'react-countdown';
import styles from '../styles/DropNew/NFT.module.scss';
import {
  paypalicon,
  maticicon,
  creditcardicon,
  infoImg,
} from '../../../assets';

interface TimeData {
  timeData: {
    date: string;
    data: any;
    isMetalLaunch: boolean;
  };
  autoRerender: number;
  setIsAutoRerender: (value: number) => void;
}

const Time = ({ timeData, setIsAutoRerender, autoRerender }: TimeData) => {
  console.log('Timer', timeData);
  const isComingSoon = timeData?.data?.isComingSoon;
  const IsSold = timeData?.data?.isSold;
  const comingSoonCountDownTimer = ({ days, hours, minutes, seconds }) => {
    if (!hours && !minutes && !seconds) {
      setIsAutoRerender(1);
    } // Render a countdown
    return (
      <div className={styles.timee2}>
        {/* {!timeData.isMetalLaunch && ( */}
        <>
          <div className={styles.timee}>
            {days < 10 ? `0${days}` : days}
            <span>days</span>
          </div>
          <div className={styles.sep}>:</div>
        </>
        {/* )} */}
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
      if (isSold && timeData.data.isDropFinished) {
        return <p className={styles.title2}>DROP ENDED</p>;
      }
      if (
        timeData.data.isComingSoon &&
        !isSold &&
        !timeData.data.isDropFinished
      ) {
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
      if (!isComingSoon && !isSold && !timeData.data.isDropFinished) {
        return (
          <p className={styles.title1}>
            DROP
            <br />
            FINISHES
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

    if (isComingSoon) {
      return (
        <p className={styles.title} style={styleColor}>
          DROP STARTS
        </p>
      );
    }
    if (isSold) {
      return (
        <p className={styles.title2} style={styleColor}>
          DROP SOLD OUT
        </p>
      );
    }
    if (!isComingSoon && !isSold) {
      return (
        <>
          <p className={styles.title1}>DROP LIVE</p>
          <p className={styles.slash}>| </p>

          <p className={styles.title3}>DROP ENDS</p>
        </>
      );
    }
  };
  const info = {
    title: 'What’s a crypto wallet?',
    description:
      'A crypto-wallet is a place where you can safely store all your crypto currencies and digital collectables. There is no charge.',
  };
  return (
    <div className={styles.timewrap}>
      <div className={styles.iconwrap}>
        <div>
          <img src={creditcardicon} alt="logo" />
          {` Credit Card`}
        </div>
        <div>
          <img src={paypalicon} alt="logo" />
          {` Paypal`}
        </div>
        <div>
          <img src={maticicon} alt="logo" />
          {` Matic`}
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
      {/* {timeData?.data?.saleType && ( */}
      <div className={styles.textwrap}>
        <span>Sale Type | </span>
        {timeData?.data?.saleType}
      </div>
      {/* )} */}
    </div>
  );
};

export default Time;
