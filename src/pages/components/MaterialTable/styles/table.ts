import { makeStyles, SvgIcon } from '@material-ui/core';
import colors from 'pages/components/MaterialTable/styles/colors';

const tableStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  tableContainer: {
    // maxHeight: 800,
    maxWidth: '100vw',
    marginBottom: '5%',
  },
  txtValue: {
    color: colors.darkThemeColor[50],
    textAlign: 'center',
  },
  overFlow: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tableCell: {
    fontSize: '0.75rem',
    lineHeight: '1',
  },
  footerRow: {
    backgroundColor: '#f5f3ef',
  },
  sortLable: {
    color: '#bfbfbf !important',
    maxWidth: '100px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'bolder',
  },
});

export default tableStyles;
