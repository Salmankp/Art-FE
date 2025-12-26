import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useHistory } from 'react-router-dom';
import styles from '../styles/Everscapes/Upcoming.module.scss';
import {
  exploringDrop,
  valentineDrop,
  exploringNext,
  valentineNext,
} from '../../../assets';
import { NFT } from '../DropNew/DropDetails';

const DesktopItem: React.FC<{
  image: string[];
  dropName: string;
  name: any;
  collectionsCount: string;
  collectablesCount: number;
  artistCount: number;
  dropStatus: string;
  onViewDropClick: any;
}> = ({
  image,
  dropName,
  name,
  collectionsCount,
  collectablesCount,
  artistCount,
  dropStatus,
  onViewDropClick,
}) => {
  const history = useHistory();
  return (
    <>
      <div className={styles.DesktopItem}>
        <div
          className={
            dropStatus === 'Drop Live'
              ? styles.dropTextLive
              : dropStatus === 'Drop Ended'
              ? styles.dropTextEnded
              : styles.dropText
          }
        >
          {dropStatus}
        </div>
        <div className={styles.imageContainer}>
          <div style={{ flex: '0 0 50%' }}>
            {image.map((item, index) => (
              <img
                className={styles.mainImage}
                src={item}
                alt="img"
                key={index}
              />
            ))}
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.leftItem}>
              <div
                style={{
                  color: '#ffffff',
                  fontSize: '20px',
                  paddingBottom: '10px',
                }}
              >
                {dropName}
              </div>
              <div className={styles.nextDropImage}>
                <img className={styles.nameImage} src={name} />
              </div>
              <div className={styles.rightItem} style={{ marginLeft: '2rem' }}>
                <ul>
                  <li>
                    {collectablesCount}
                    {name === 'EverScapes <span>Celebration Crates</span>'}
                    &nbsp;Collectables
                  </li>
                  <li>
                    {artistCount}
                    {name === 'EverScapes <span>Celebration Crates</span>' &&
                      '+'}
                    &nbsp;
                    {dropName === 'LARRY ELMORE' ||
                    dropName === 'GIDEON KENDALL' ||
                    dropName === 'THE RISE'
                      ? 'Artist'
                      : 'Artists'}
                  </li>
                  <li>
                    {collectionsCount}
                    {name === 'EverScapes <span>Celebration Crates</span>' &&
                      '+'}
                    &nbsp;
                    {dropName === 'THE RISE'
                      ? 'Crate Collection'
                      : 'Collection'}
                  </li>
                </ul>
              </div>
            </div>
            <button
              className={styles.ItemBtn2}
              onClick={() => {
                onViewDropClick(history);
              }}
            >
              View Drop
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const DesktopItemContainer: React.FC<{
  data: NFT;
}> = ({ data }) => {
  return (
    <>
      <div className={styles.DropNextContainer}>
        <div className={styles.dropNext}>Live & Upcoming Drops</div>
      </div>
      <div className={styles.DesktopItemsContainer}>
        <div className={styles.DesktopItemMain} key={3}>
          <DesktopItem
            image={[valentineDrop]}
            dropStatus="Drop Live"
            dropName="VALENTINE"
            artistCount={1}
            collectionsCount="1"
            collectablesCount={5}
            name={valentineNext}
            onViewDropClick={(history) => {
              history.push('/drop/valentine');
              window.scroll(0, 0);
            }}
            key={1}
          />
          <div className={styles.verticalLine2} />
          <DesktopItem
            image={[exploringDrop]}
            dropStatus="Drop Live"
            dropName="EXPLORING FANTASY"
            artistCount={4}
            collectionsCount="2"
            collectablesCount={4}
            name={exploringNext}
            key={2}
            onViewDropClick={(history) => {
              history.push('/drop/exploring-fantasy');
              window.scroll(0, 0);
            }}
          />
        </div>
      </div>
    </>
  );
};

const Upcoming: React.FC<{ worldID: string }> = ({ worldID }) => {
  const [data, setdata] = useState<{ [key: string]: any }>({});

  return (
    <div className={styles.Upcoming}>
      <div className={styles.Main}>
        <div className={styles.UpcomingContainer}>
          <DesktopItemContainer data={data.drops ?? []} />
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
