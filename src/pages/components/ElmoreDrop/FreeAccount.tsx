import React from 'react';
import { dropnewbg } from 'assets';
import { useHistory } from 'react-router-dom';
import styles from '../styles/ElmoreDrop/FreeAccount.module.scss';

const FreeAccount: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.border} />
      <div className={styles.getStarted}>
        <div className={styles.imgOverlayWrap}>
          <div>
            <img className={styles.featurebg} src={dropnewbg} />
          </div>
          <div className={styles.overlayNew} />
          <div className={styles.messageContainer}>
            Create your free account now
          </div>
        </div>
      </div>
      <div className={styles.border} />
    </>
  );
};
export default FreeAccount;
