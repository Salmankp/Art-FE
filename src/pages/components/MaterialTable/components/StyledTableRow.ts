import { createStyles, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import colors from 'pages/components/MaterialTable/styles/colors';

export const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
      textAlign: 'left',
      cursor: 'pointer',
      '&:nth-of-type(odd)': {
        backgroundColor: colors.darkTheme[50],
      },
      backgroundColor: colors.backgrounds.black,
      color: colors.darkThemeColor[50],
      // '&:hover': {
      //   backgroundColor: colors.backgrounds.grey20,
      // },
    },
  }),
)(TableRow);
