import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/VulcanVerse/Buybronz.module.scss';
import { ImgBuy1, plussign, travelcopy } from '../../../assets/index';

const Buybronz: React.FC = () => {
  const history = useHistory();
  return (
    <div className={styles.Signup}>
      <div className={styles.innerwrap}>
        <div className={styles.buyMain}>
          <div className={styles.textDetails}>
            <img src={plussign} className={styles.plussign} />
            <h2>
              Buy a Blue, Bronze, Silver or Gold Medallion and receive one of
              two Berserk Cards
            </h2>
            <p>
              Randomly receive one of two Berserk Cards when you buy selected
              NFTs.
            </p>
            <span>Vulcanforged Account needed to claim</span>
          </div>
          <div className={styles.imgBuy}>
            <div className={styles.imgGrid}>
              <img src={ImgBuy1} alt="" />
              <h3>Berserk Card One</h3>
            </div>
            <div className={styles.imgGrid}>
              {travelcopy && <img src={travelcopy} alt="" />}
              <h3>Berserk Card Two</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buybronz;
