import {
  alpha,
  createStyles,
  Grid,
  makeStyles,
  TextFieldProps,
  Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/home2/Signup.module.scss';
import { checkOnlyEmail } from '../../../utils/validate';
import { UserAPI } from '../../../api/user';
import { success } from '../../../utils/toast';

export const Signup: React.FC<{
  dark?: boolean;
  color?: string;
  mobile?: string;
}> = ({ dark, color, mobile }) => {
  return (
    <div className={dark ? styles.rootDark : styles.rootLight}>
      <Grid
        container
        className={dark ? styles.signupDark : styles.signup}
        id="signup"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <div
          className={
            color === 'white'
              ? styles.textWhite
              : mobile === 'white'
              ? styles.textBlue1
              : styles.textBlue
          }
        >
          Register now for the first access to the world's most exclusive NFT
          drops
        </div>
        <Grid
          container
          className={styles.box}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ height: '55px' }}
        >
          <BootstrapInput placeholder="Enter Your Email" />
        </Grid>
      </Grid>
    </div>
  );
};

export function BootstrapInput(props: TextFieldProps) {
  const classes = useStylesBootstrap();
  const [userEmailAddress, setUserEmailAddress] = useState<any>('');
  const history = useHistory();

  const subscribeNewsletters = async () => {
    if (!checkOnlyEmail(userEmailAddress)) return;

    const res = await UserAPI.getSubscription(userEmailAddress);
    if (res?.success) {
      success(res?.data?.message);
      setUserEmailAddress('');
    }
  };

  return (
    <form
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate"
    >
      <div className={styles.signupBox}>
        <button
          className={styles.button}
          type="button"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
          onClick={() => history.push('/auth#register')}
        >
          Register Now
        </button>
      </div>
    </form>
  );
}

const useStylesBootstrap = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 0,
      backgroundColor: '#fcfcfb',
      padding: '5.5px 10px',
      width: '928px',
      height: '55px',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '@media screen and (max-width: 900px)': {
        width: '244px',
      },
      '@media screen and (max-width: 400px)': {
        width: '164px',
      },

      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
  }),
);
