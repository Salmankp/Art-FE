import React from 'react';
import 'react-multi-carousel/lib/styles.css';

import { useHistory } from 'react-router-dom';
import styles from '../styles/DropNew/StartCollection.module.scss';
import { mobilePropertiesPlusSign } from '../../../assets/index';

const CollData: React.FC<{ name: string; description: string }> = (props) => {
  return (
    <div className={styles.CollData}>
      <div className={styles.dataContainer}>
        <p className={styles.headerData}>{props.name}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

const MobileCollData: React.FC<{ name: string; description: string }> = (
  props,
) => {
  return (
    <div className={styles.MobileCollData}>
      <p className={styles.headerData}>{props.name}</p>
      <p className={styles.descriptionData}>{props.description}</p>
    </div>
  );
};

const StartCollection: React.FC = () => {
  const history = useHistory();
  return (
    <div className={styles.StartCollection}>
      <div className={styles.wrap}>
        <p className={styles.header}>
          Start your own
          <span>collection today</span>
          <span className={styles.subData}>
            Getting started in digital collecting has never been easier
          </span>
        </p>
        <div className={styles.propertiesSection}>
          <CollData
            name="Register"
            description="Sign up today for your free EverScapes account"
          />
          <CollData
            name="Discover"
            description="Find unique works from your favourite Fantasy, Sci-fi and Horror artists"
          />
          <CollData
            name="Collect"
            description="Start your collection via our exclusive sale drops using either traditional or crypto currencies "
          />
          <CollData
            name="Display"
            description="Curate your very own virtual gallery and share it with the world."
          />
          <CollData
            name="Connect"
            description="Connect with other fans, share your passion and buy, sell or trade with them on our p2p marketplace"
          />
          <CollData
            name="Rewards"
            description="Complete themed collections and other challenges for amazing rewards such as exclusive NFTs"
          />
        </div>
        <div className={styles.mobilePropertiesSection}>
          <div className={styles.section}>
            <div className={styles.data}>
              <MobileCollData
                name="Register"
                description="Sign up today for your free EverScapes account"
              />
              <MobileCollData
                name="Discover"
                description="Find unique works from your favourite Fantasy, Sci-fi and Horror artists"
              />
            </div>
            <img src={mobilePropertiesPlusSign} alt="mobile-plus" />
          </div>
          <div className={styles.section}>
            <div className={styles.data}>
              <MobileCollData
                name="Collect"
                description="Start your collection via our exclusive sale drops using either traditional or crypto currencies "
              />
              <MobileCollData
                name="Display"
                description="Curate your very own virtual gallery and share it with the world."
              />
            </div>
            <img src={mobilePropertiesPlusSign} alt="mobile-plus" />
          </div>
          <div className={styles.section}>
            <div className={styles.data}>
              <MobileCollData
                name="Connect"
                description="Connect with other fans, share your passion and buy, sell or trade with them on our p2p marketplace"
              />
              <MobileCollData
                name="Rewards"
                description="Complete themed collections and other challenges for amazing rewards such as exclusive NFTs"
              />
            </div>
          </div>
        </div>
        <div className={styles.btnSection}>
          <button onClick={() => history.push('/auth#register')}>
            Register Now
          </button>
        </div>
        <div className={styles.bottomBorder} />
      </div>
    </div>
  );
};

export default StartCollection;
