import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/MarketPlaceStatic/Main.module.scss';

interface editionDetail {
  editionData: {
    title: string;
    value: string;
  }[];
}

const EditionOverview: React.FC<{ editionDetail }> = ({ editionDetail }) => {
  return editionDetail.map((data) => (
    <div className={styles.prt}>
      <div className={styles.dataline}>
        <div>{data.title}</div>
        <div>{data.value}</div>
      </div>
    </div>
  ));
};

export default EditionOverview;
