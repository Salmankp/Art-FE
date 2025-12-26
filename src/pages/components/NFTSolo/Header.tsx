import React from 'react';
import styles from '../styles/NFTSolo/Header.module.scss';
import { NFTSolobg } from '../../../assets';

const Header: React.FC = () => {
  return (
    <div
      className={styles.wrap}
      style={{ backgroundImage: `url(${NFTSolobg})` }}
    >
      {' '}
    </div>
  );
};

export default Header;
