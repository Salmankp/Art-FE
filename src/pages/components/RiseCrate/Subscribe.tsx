import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { checkOnlyEmail } from '../../../utils/validate';
import { success } from '../../../utils/toast';
import { UserAPI } from '../../../api/user';
import styles from '../styles/RiseCrate/Subscribe.module.scss';
import { RedCircle } from '../../../assets';

const Signup: React.FC = () => {
  const history = useHistory();

  const [userEmailAddress, setUserEmailAddress] = useState<any>('');
  const subscribeNewsletters = async () => {
    if (!checkOnlyEmail(userEmailAddress)) return;

    const res = await UserAPI.getSubscription(userEmailAddress);
    if (res?.success) {
      success(res?.data?.message);
      setUserEmailAddress('');
    }
  };

  return (
    <div className={styles.Signup}>
      <Container className={styles.innerwrap}>
        <div className={styles.messageContainer}>
          <div className={styles.inputContainer}>
            <input
              placeholder="Enter your email."
              type="email"
              name="email"
              className="email"
              required
              onChange={(e) => setUserEmailAddress(e.target.value)}
            />
            <button
              type="submit"
              name="subscribe"
              id="mc-embedded-subscribe"
              onClick={subscribeNewsletters}
            >
              <img src={RedCircle} alt="cir-btn" />
            </button>
          </div>
          <div>
            SUBSCRIBE AND GET A BONUS NFT COLLECTABLE FREE!
            <div className={styles.borderwrap}>
              <div className={styles.border} />
            </div>
            <span className={styles.borderAfterText}>
              Join our RISE mailing list to be notified when crates go live.
            </span>
          </div>
        </div>
        <div className={styles.mobileMessage}>
          <div className={styles.inputContainer}>
            <input
              placeholder="Enter your email."
              type="email"
              name="email"
              className="email"
              required
              onChange={(e) => setUserEmailAddress(e.target.value)}
            />
            <button
              type="submit"
              name="subscribe"
              id="mc-embedded-subscribe"
              onClick={subscribeNewsletters}
            >
              <img src={RedCircle} alt="cir-btn" />
            </button>
          </div>
          Register now and get started for free.
        </div>
      </Container>
    </div>
  );
};

export default Signup;
