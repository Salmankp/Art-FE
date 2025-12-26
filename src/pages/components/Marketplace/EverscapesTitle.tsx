import React from 'react';
import styles from '../styles/Marketplace/EverscapesTitle.module.scss';
import { everscapesText, subText } from '../../../assets';

const EverscapesTitle: React.FC = () => {
  return (
    <div className={styles.EverscapesTitle}>
      <img src={everscapesText} alt="everscapes-text" />
      <div className={styles.border} />
      <img src={subText} alt="sub-text" />
    </div>
  );
};

export default EverscapesTitle;
