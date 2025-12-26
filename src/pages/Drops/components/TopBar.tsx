import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from 'pages/components/styles/Everscapes/TopNav.module.scss';
import { artefyBeta } from '../../../assets';

const TopNav: React.FC = () => {
  const history = useHistory();
  return (
    <div className={styles.TopNav}>
      <div className={styles.Main}>
        <p
          onClick={() => {
            window.scrollTo(0, 0);
            history.push('/');
          }}
        >
          Powered by
        </p>
        <img
          src={artefyBeta}
          alt="artefy-logo"
          onClick={() => {
            window.scrollTo(0, 0);
            history.push('/');
          }}
        />
      </div>
    </div>
  );
};

export default TopNav;
