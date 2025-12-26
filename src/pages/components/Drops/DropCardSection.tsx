import React, { useEffect, useState } from 'react';
import styles from '../styles/Drops/DropCardSection.module.scss';
import { DropType, DropCardSmallInter } from '../../../utils/interfaces';
import {
  circularbtn,
  classicDrop,
  everscapesText,
  legendaryDrop,
  masterpieceDrop,
  rareDrop,
  uniqueDrop,
} from '../../../assets/index';
import { useAppSelector } from '../../../redux/hooks';

const DropCard: React.FC<{
  type: DropType;
  data: DropCardSmallInter;
}> = ({ type, data }) => {
  const getDropImg = (name: DropType) => {
    switch (name) {
      case 'Classic':
        return classicDrop;
      case 'Legendary':
        return legendaryDrop;
      case 'Masterpiece':
        return masterpieceDrop;
      case 'Rare':
        return rareDrop;
      case 'Unique':
        return uniqueDrop;
      default:
        return '';
    }
  };

  return (
    <div className={styles.DropCard}>
      {getDropImg(type) && (
        <div className={styles.dropBadge}>
          <img src={getDropImg(type)} alt="drop-img" />
        </div>
      )}
      <img src={data.image} alt={data.art} className={styles.nftImage} />
      <div className={styles.dataSection}>
        <p>{data.name}</p>
        <p className={styles.artName}>{data.art}</p>
        <p>
          {data.edition}
          Edition
        </p>
        <a href={`#${data.id}`}>View Drop</a>
      </div>
    </div>
  );
};

export const RegisterContainer: React.FC = () => {
  return (
    <div className={styles.RegisterContainer}>
      <div className={styles.Main}>
        <div className={styles.EverscapesTitle}>
          <img
            src={everscapesText}
            alt="everscapes-text"
            height="60px"
            width="276px"
          />
          <div className={styles.border} />
        </div>
        <p>Register now to buy!</p>
        <div className={styles.inputContainer}>
          <input placeholder="Enter your email" />
          <img src={circularbtn} alt="arrow" />
        </div>
      </div>
    </div>
  );
};

interface dropCardProps {
  type: string;
}

const DropCardSection = ({ type }: dropCardProps) => {
  const dropId = useAppSelector(
    (state) => state.AuthenticationState.dropDetails,
  )._id;
  const { dropPaintings } = useAppSelector(
    (state) => state.AuthenticationState,
  );
  const [data, setData] = useState<DropCardSmallInter[]>([]);

  useEffect(() => {
    console.log('dropPaintings ======', dropPaintings);
    dropPaintings.length > 0 &&
      setData(
        dropPaintings.map((item) => ({
          art: item.title,
          name: item.name,
          edition: item.mints.length,
          image: item.image,
          id: item._id,
          rarity: item.rarity,
          artist: item?.artist,
        })),
      );
  }, [dropPaintings]);

  if (!dropId && !dropPaintings) return null;

  return (
    <div className={styles.DropCardSection}>
      {/* <DropSection
        days={10}
        hours={45}
        minutes={14}
        seconds={54}
        showBtn={false}
        dropType={type as any}
      /> */}
      <div className={styles.cardsDataSection}>
        {data.length > 0 &&
          data.map((item) => (
            <DropCard
              key={item.id}
              type={item.rarity as DropType}
              data={{
                art: item.art,
                name: item.name,
                edition: item.edition,
                image: item.image,
                id: item.id,
                rarity: item.rarity,
                artist: item?.artist,
              }}
            />
          ))}
      </div>
      {/* <RegisterContainer /> */}
      <div
        style={{
          padding: '0 1.4rem',
          background: ' linear-gradient(180deg, #363636 0%, #111111 100%)',
        }}
      />
    </div>
  );
};

export default DropCardSection;
