import { createStyles, TableCell, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import colors from 'pages/components/MaterialTable/styles/colors';

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
    head: {
      backgroundColor: colors.darkTheme[50],
      color: colors.darkThemeColor[50],
      textAlign: 'center',
    },
    body: {
      fontSize: '16px', // theme.typography.fontSize,
    },
  }),
)(TableCell);
