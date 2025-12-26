import React, { createRef, FunctionComponent, useEffect } from 'react';
import shortid from 'shortid';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TableSortLabel,
} from '@material-ui/core';
import PaginationComponent from 'pages/components/pagination/paginationComp';
// import { useTheme } from '@material-ui/core/styles';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import './styles/customStyle.scss';
import { DropResult } from 'react-beautiful-dnd';
import { TableCellI } from 'pages/interfaces/tableCell';
// import DroppableComponent from 'components/DroppableComponent';
// import DraggableComponent from 'components/DraggableComponent';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { StyledTableRow } from './components/StyledTableRow';
import { StyledTableCell } from './components/StyledTableCell';
import { getValue } from './components/common';
import tableStyles from './styles/table';

interface TableBuilderI {
  rows: any[];
  cells: TableCellI[];
  // eslint-disable-next-line
  onRowClick?: (rowItem: any) => void;
  onDragComplete?: (result: DropResult) => void;
  isDraggable?: boolean;
}
interface Data {
  [key: string]: any;
}

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  classes: ReturnType<any>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: any;
  rowCount: number;
  rows: any[];
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const classes = tableStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const TableBuilder: FunctionComponent<TableBuilderI> = ({
  rows,
  cells,
  isDraggable,
  onDragComplete,
  onRowClick,
  ...props
}: TableBuilderI) => {
  const classes = tableStyles();
  const tableRef = createRef<HTMLDivElement>();
  // const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  // const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const onDragEnd = (result: DropResult) => {
    if (!onDragComplete) return;
    onDragComplete(result);
  };

  const RowClickNotAllow = ['actions'];

  const onCellClick = (cell: any, fields: any) => {
    if (
      (typeof cell.value === 'string' || typeof cell.value === 'number') &&
      !RowClickNotAllow.includes(cell.value)
    ) {
      if (onRowClick) onRowClick(fields);
    }
  };

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const notClickableFields = [
    'nftID',
    'nftThumbnail',
    'owned',
    'listed',
    'view',
  ];

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const moveInPages = (index) => {
    setPage(index);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setPage(1);
  }, [cells]);
  function stableSort<T>(array: any[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);

      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(a: any, b: any, orderBy: string) {
    if (b.fields[orderBy] && a.fields[orderBy]) {
      if (b.fields[orderBy].sortBlock) {
        return 0;
      }
      if (b.fields[orderBy]?.isDate) {
        const bDate = new Date(b.fields[orderBy]?.originalValue);
        const aDate = new Date(a.fields[orderBy]?.originalValue);
        if (bDate < aDate) {
          return -1;
        }
        if (bDate > aDate) {
          return 1;
        }
      }

      if (b.fields[orderBy]?.originalValue < a.fields[orderBy]?.originalValue) {
        return -1;
      }
      if (b.fields[orderBy]?.originalValue > a.fields[orderBy]?.originalValue) {
        return 1;
      }
    }

    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    // console.log('SOmething is working on ===> ', (a, b));
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, `${orderBy}`)
      : (a, b) => -descendingComparator(a, b, `${orderBy}`);
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          {props.rows.map((headCell) => {
            return (
              <StyledTableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  className={classes.sortLable}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {/* {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'} */}
                    </span>
                  ) : null}
                </TableSortLabel>
              </StyledTableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAllowSort =
      notClickableFields.filter((item) => item === property).length > 0;

    if (isAllowSort) {
      return;
    }
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer
      className={classes.tableContainer}
      ref={tableRef}
      {...props}
    >
      <Table size="small" stickyHeader aria-label="simple table">
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
          rows={rows}
        />
        <TableBody>
          {(rowsPerPage > 0
            ? stableSort(cells, getComparator(order, orderBy)).slice(
                page * rowsPerPage - rowsPerPage,
                page * rowsPerPage,
              )
            : stableSort(cells, getComparator(order, orderBy))
          ).map((cell, index) => {
            const keys = Object.keys(cell.fields);
            const id = shortid.generate();
            return (
              <StyledTableRow selected={cell.selected} key={id}>
                {keys.map((key) => {
                  const cellItem = cell.fields[key];
                  if (cellItem.hidden) return <React.Fragment key={key} />;
                  return (
                    <TableCell
                      key={shortid.generate()}
                      align="left"
                      className={classes.tableCell}
                      onClick={() => {
                        onCellClick(cellItem, cell.fields);
                      }}
                    >
                      <Box maxWidth="100px">
                        <Typography
                          variant="inherit"
                          noWrap
                          component="div"
                          className={classes.txtValue}
                        >
                          {cellItem.value}
                        </Typography>
                      </Box>
                    </TableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      {cells.length > 10 && (
        <Box>
          <PaginationComponent
            handle={moveInPages}
            count={Math.ceil(Math.abs(cells.length / rowsPerPage))}
            page={page}
          />
        </Box>
      )}
    </TableContainer>
  );
};

export default TableBuilder;

TableBuilder.defaultProps = {
  onRowClick: undefined,
  isDraggable: false,
  onDragComplete: undefined,
};
