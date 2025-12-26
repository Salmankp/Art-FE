import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    '& .MuiPaginationItem-root': {
      color: 'rgba(255, 255, 255, 1) !important',
    },
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
  },
}));

export default function PaginationComponent({ handle, count, page }) {
  const classes = useStyles();
  const handleChange = (value) => {
    handle(value);
  };
  return (
    <div className={classes.root}>
      <Pagination
        count={count}
        page={page}
        onChange={(event, val) => handleChange(val)}
        size="large"
        variant="outlined"
        color="primary"
        shape="rounded"
      />
    </div>
  );
}
