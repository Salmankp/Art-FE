import React from 'react';
import { everscapesText, infoImg } from '../../../assets';
import styles from '../styles/Drops/DropCard.module.scss';

type World = 'everscapes' | 'artefy' | 'classic-club';

interface dropCardProps {
  data: {
    world: World;
    dropName: string;
    description: string;
    details: string[];
  };
}

const EverscapesTitle = () => {
  return (
    <div className={styles.EverscapesTitle}>
      <img src={everscapesText} alt="everscapes-text" />
      <div className={styles.border} />
    </div>
  );
};

const DropCard = ({ data }: dropCardProps) => {
  const getTitle = (name: World) => {
    switch (name) {
      case 'everscapes':
        return <EverscapesTitle />;
      case 'artefy':
        return null;
      case 'classic-club':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={styles.DropCard}>
      <div className={styles.headerData}>
        {/* {getTitle(data.world)} */}
        <p>{data.dropName}</p>
      </div>
      <div className={styles.detailsData}>
        <div className={styles.leftContainer}>
          <p>DROP DESCRIPTION</p>
          <div className={styles.description}>{data.description}</div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.border} />
          <div className={styles.data}>
            <div className={styles.titleContainer}>
              <p>DROP DETAILS</p>
              <img src={infoImg} alt="infoImg" />
            </div>
            <div className={styles.listContainer}>
              <ul>
                {data.details.map((item, index) => {
                  return (
                    <li className={styles.list} key={index.toString()}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropCard;
