import {
  Button,
  createStyles,
  alpha,
  Grid,
  makeStyles,
  OutlinedInputProps,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import styles from '../styles/home/Signup.module.scss';

const useStylesBootstrap = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 0,
      backgroundColor: '#fcfcfb',
      padding: '5.5px 10px',
      width: '33vw',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '@media screen and (max-width: 900px)': {
        width: '80vw',
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

export function BootstrapInput(props: TextFieldProps) {
  const classes = useStylesBootstrap();
  return (
    <TextField
      InputProps={
        { classes, disableUnderline: true } as Partial<OutlinedInputProps>
      }
      {...props}
    />
  );
}

export const Signup: React.FC<{ dark?: boolean }> = ({ dark }) => {
  return (
    <Grid
      className={dark ? styles.signupDark : styles.signup}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography className={styles.text}>
        Register now for first access to the world's most exclusive NFT drops
      </Typography>
      <Grid
        container
        className={styles.box}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <BootstrapInput placeholder="Enter Your Email" />
        <Button
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          className={styles.button}
        >
          Register Now
        </Button>
      </Grid>
    </Grid>
  );
};
