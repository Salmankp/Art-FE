import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, MenuItem, Select } from '@material-ui/core';
import styles from '../style/styles.module.scss';

const useStyles = makeStyles(() => ({
  select: {
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
  },
  icon: {
    fill: 'white',
  },
}));
const SingleSelect = ({ options, label, handleOption }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    console.log('targetvalue => ', value, options);
    const selected = options.find((item: any) => item.value === value);
    console.log('Selected => ', selected);
    handleOption(selected);
  };
  const classes = useStyles();

  return (
    <Select
      value={label}
      onChange={handleChange}
      className={styles.quickListSelection}
      inputProps={{
        classes: {
          icon: classes.icon,
        },
      }}
    >
      {options &&
        options?.map((data) => (
          <MenuItem key={data?.mintId} value={data?.value}>
            {data?.label}
          </MenuItem>
        ))}
    </Select>
  );
};

export default SingleSelect;
