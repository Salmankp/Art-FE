import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/Drops/StartCollection.module.scss';

interface CollectionOptionProps {
  header: string;
  children: React.ReactNode;
}

interface ButtonProps {
  link: string;
  children: React.ReactNode;
}

const CollectionOption = ({ header, children }: CollectionOptionProps) => {
  return (
    <div className={styles.CollectionOption}>
      <p className={styles.itemHeader}>{header}</p>
      <div className={styles.description}>{children}</div>
    </div>
  );
};

const Button = ({ link, children }: ButtonProps) => {
  const history = useHistory();
  return (
    <button
      className={styles.Collectionbtn}
      onClick={() => history.push(`/${link}`)}
    >
      {children}
    </button>
  );
};

const StartCollection: React.FC = () => {
  return (
    <div className={styles.StartCollectionContainer}>
      <div className={styles.Main}>
        <div className={styles.header}>
          <p className={styles.heading}>
            Start your own
            <span>collection today</span>
          </p>
          <p>Getting started in digital collecting has never been easier</p>
        </div>
        <div className={styles.collectionSection}>
          <CollectionOption header="Register">
            Sign up today for your free EverScapes account
          </CollectionOption>
          <CollectionOption header="Discover">
            Find unique works from your favorite fantasy, Sci-fi and horror
            artists
          </CollectionOption>
          <CollectionOption header="Collect">
            start your collection via our exclusive sale drops using either
            traditional or crypto currenices
          </CollectionOption>
          <CollectionOption header="Display">
            Curate your very own virtual gallery and share it with the world.
          </CollectionOption>
          <CollectionOption header="Connect">
            Connect with other fans, share your passion and buy, sell or trade
            with them on our p2p marketplace
          </CollectionOption>
          <CollectionOption header="Rewards">
            Complete themed collections and other challenges for amazing rewards
            such as exclusive NFTs
          </CollectionOption>
        </div>
        <div className={styles.btnContainer}>
          <Button link="">Sign Up</Button>
          <Button link="faq">Beginner’s Guide & FAQs</Button>
        </div>
      </div>
    </div>
  );
};

export default StartCollection;
