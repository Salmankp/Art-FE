import React from 'react';
import styles from '../styles/common/DropSection.module.scss';
import { everscapesText } from '../../../assets/index';

type DROPTYPE = 'everscapes' | 'artefy' | 'classic-club';

const Item: React.FC<{ data: number; showImg: boolean; text: string }> = ({
  data,
  showImg,
  text,
}) => {
  return (
    <div className={styles.Item}>
      <div className={styles.left}>
        <p>{data >= 10 ? data : `0${data}`}</p>
        <p>
          {text}
          {data > 1 && 's'}
        </p>
      </div>
      {showImg && <p className={styles.img}>:</p>}
    </div>
  );
};

const EverscapesTitle: React.FC = () => {
  return (
    <div className={styles.EverscapesTitle}>
      <img src={everscapesText} alt="everscapes-text" />
      <div />
    </div>
  );
};

const DropSection: React.FC<{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  showBtn: boolean;
  dropType: DROPTYPE;
}> = ({ days, hours, minutes, seconds, showBtn, dropType }) => {
  const getTitle = (data: DROPTYPE) => {
    switch (data) {
      case 'everscapes':
        return <EverscapesTitle />;
      case 'artefy':
        return <></>;
      case 'classic-club':
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.DropSection}>
      <div className={styles.Main}>
        <div className={styles.timeSection}>
          <p className={styles.heading}>DROP STARTS</p>
          <div className={styles.dataSection}>
            <Item data={days} showImg text="day" />
            <Item data={hours} showImg text="hour" />
            <Item data={minutes} showImg text="minute" />
            <Item data={seconds} showImg={false} text="second" />
          </div>
        </div>

        <div className={styles.logo}>{getTitle(dropType)}</div>
        <p className={styles.aboutText}>
          FANTASY
          <br />
          LAUNCH DROP
        </p>
        {showBtn && <button className={styles.viewbtn}>VIEW</button>}
      </div>
      <div className={styles.mobileDropSection}>
        <div className={styles.topContainer}>
          <div className={styles.timeSection}>
            <p className={styles.heading}>DROP STARTS</p>
            <div className={styles.dataSection}>
              <Item data={days} showImg text="day" />
              <Item data={hours} showImg text="hour" />
              <Item data={minutes} showImg text="minute" />
              <Item data={seconds} showImg={false} text="second" />
            </div>
          </div>
          {getTitle(dropType)}
        </div>
        <div className={styles.bottomContainer}>
          <p className={styles.aboutText}>FANTASY LAUNCH DROP</p>
          <button className={styles.viewDropBtn}>View Drop</button>
        </div>
      </div>
    </div>
  );
};

export default DropSection;
