import 'react-multi-carousel/lib/styles.css';
import { useAppSelector } from 'redux/hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/home2/StartCollection.module.scss';
import { one, two, three } from '../../../assets/index';

const CollData: React.FC<{
  name: string;
  description: string;
  number: string;
}> = (props) => {
  return (
    <div className={styles.CollData}>
      <div>
        <img src={props.number} />
      </div>
      <div className={styles.dataContainer}>
        <p className={styles.headerData}>{props.name}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

const MobileCollData: React.FC<{
  name: string;
  description: string;
  numberMobile: string;
}> = (props) => {
  return (
    <div className={styles.MobileCollData}>
      <div className={styles.mobileImg}>
        <img src={props.numberMobile} />
      </div>
      <div className={styles.spacingWrap}>
        <p className={styles.headerData}>{props.name}</p>
        <p className={styles.descriptionData}>{props.description}</p>
      </div>
    </div>
  );
};

const StartCollection: React.FC = () => {
  const loggedIn = useAppSelector(
    (state) => state.AuthenticationState?.loggedIn,
  );

  const history = useHistory();
  return (
    <div className={styles.StartCollection}>
      <div className={styles.wrap}>
        <p className={styles.header}>
          Start your own
          <span className={styles.colText}>collection today</span>
        </p>
        <div className={styles.propertiesSection}>
          <CollData
            number={one}
            name="COLLECT"
            description="Start your digital art collection from the world’s greatest artists"
          />
          <CollData
            number={two}
            name="CURATE"
            description="Curate your very own virtual gallery and share it with the world."
          />
          <CollData
            number={three}
            name="CONNECT"
            description="Connect with other fans, collectors and artists in the Discord"
          />
        </div>
        <div className={styles.mobilePropertiesSection}>
          <div className={styles.section}>
            <div className={styles.data}>
              <MobileCollData
                numberMobile={one}
                name="COLLECT"
                description="Start your digital art collection from the world’s greatest artists"
              />
              <MobileCollData
                numberMobile={two}
                name="CURATE"
                description="Curate your very own virtual gallery and share it with the world."
              />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.data}>
              <MobileCollData
                numberMobile={three}
                name="CONNECT"
                description="Connect with other fans, collectors and artists in the Discord"
              />
            </div>
          </div>
        </div>
        {!loggedIn && (
          <div className={styles.buttonwrap}>
            <button onClick={() => history.push('/auth#register')}>
              Create an Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartCollection;
