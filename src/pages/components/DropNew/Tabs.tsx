import React, { useState } from 'react';
import styles from '../styles/DropNew/NFT.module.scss';
import {
  DropInter,
  DropStatus,
  DropType,
  Time,
} from '../../../utils/interfaces';
import { NFT } from './DropDetails';
import { getArtistBio } from '../../../utils/helpers';

const Tabs: React.FC<{
  data: NFT;
  modalHandler?: (data: any) => void;
}> = ({ data, modalHandler }) => {
  const [tab, setTab] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [currentNav, setCurrentNav] = useState<'Art' | 'NFT' | 'Artist'>('Art');
  const [details, setDetails] = useState<string>(data.aboutArtWork);
  const tabs: any = [];
  if (data?.aboutArtWork) {
    const dataArtwork = {
      title: 'About the Artwork',
      content: data.aboutArtWork,
      tab: 'Art',
    };
    tabs.push(dataArtwork);
  }
  if (data?.aboutNFT) {
    const dataNFT = {
      title: 'About the NFT',
      content: data.aboutNFT,
      tab: 'NFT',
    };
    tabs.push(dataNFT);
  }
  if (data?.aboutArtist.length > 0) {
    const dataArtist = {
      title: 'About the Artist',
      content: getArtistBio(data?.aboutArtist || [], true),
      tab: 'Artist',
    };
    tabs.push(dataArtist);
  }
  return (
    <div className={styles.tabswrap}>
      <div className={styles.headwrap}>
        {tabs?.map((tab, index) => (
          <>
            <div
              key={index}
              onClick={() => {
                setCurrentNav(tab.tab);
                setDetails(tab.content);
                setActiveTab(index);
                setTab(index);
              }}
              className={`${styles.head} ${
                index === activeTab && styles.active
              }`}
            >
              {tab.title}
            </div>
            {index + 1 < tabs.length && <div className={styles.divider} />}
          </>
        ))}
      </div>
      <div
        className={styles.bodywrap}
        dangerouslySetInnerHTML={{ __html: details }}
      />
    </div>
  );
};

export default Tabs;
