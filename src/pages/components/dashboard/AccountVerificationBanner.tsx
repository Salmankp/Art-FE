import React from 'react';
import styles from '../styles/dashboard/Hero.module.scss';
import { UserAPI } from '../../../api/user';
import { success } from '../../../utils/toast';

const AccountVerificationBanner = () => {
  const resendAccountVerificationEmail = async () => {
    const res = await UserAPI.resendVerificationEmail();

    if (res.success) {
      success(res?.data?.message);
    }
  };

  return (
    <div className={styles.outerDiv}>
      <div className={styles.innerDiv}>
        <h1 style={{ color: 'white' }}>
          Please verify your email to continue.
        </h1>
        <button onClick={resendAccountVerificationEmail}>Resend Email</button>
      </div>
    </div>
  );
};

export default AccountVerificationBanner;
