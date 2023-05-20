import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
// import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import axios from '../../../node_modules/axios/index';

// function createData(hash, blobk, type, status, time, from , to) {
//   return { hash, blobk, type, status, time, from , to };
// }

// const rows = [
//   createData(84564564, 'Camera Lens', 40, 2, 40570, 1, 1),
//   createData(98764564, 'Laptop', 300, 0, 180139),
//   createData(98756325, 'Mobile', 355, 1, 90989),
//   createData(98652366, 'Handset', 50, 1, 10239),
//   createData(13286564, 'Computer Accessories', 100, 1, 83348),
//   createData(86739658, 'TV', 99, 0, 410780),
//   createData(13256498, 'Keyboard', 125, 2, 70999),
//   createData(98753263, 'Mouse', 89, 2, 10570),
//   createData(98753275, 'Desktop', 185, 1, 98063),
//   createData(98753291, 'Chair', 100, 0, 14001)
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'Txn Hash',
    align: 'left',
    disablePadding: false,
    label: 'Transaction Hash'
  },
  {
    id: 'Block',
    align: 'left',
    disablePadding: true,
    label: 'Block'
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Type'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  // {
  //   id: 'time',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Create Time'
  // },
  {
    id: 'from',
    align: 'left',
    disablePadding: false,
    label: 'From'
  },
  {
    id: 'time',
    align: 'left',
    disablePadding: false,
    label: 'To'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 5:
      color = 'success';
      title = 'Verified';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

const OrderType = ({ status }) => {
  let title;

  switch (status) {
    case 1:
      title = 'Withdraw';
      break;
    case 2:
      title = 'Deposit';
      break;
    case 5:
      title = 'Register';
      break;
    default:
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>{title}</Typography>
    </Stack>
  );
};
const Shorten = ({item}) =>{
  let string = item

  if(string.length >= 10){
    string = string.slice(0, 7) + "..." + string.slice(string.length-8, string.length-1)
  }
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>{string}</Typography>
    </Stack>
  );
}
OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //
const baseURL = "https://testapi.zkbnbchain.org/api/v1/txs?offset=0&limit=20";
export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [transactions, setTransactions] = useState([])
    useEffect(()=>{
      axios.get(baseURL).then((response) => {
          let arr = response.data.txs
          const compareByIndex = (a, b) => a.index - b.index;
          arr.sort(compareByIndex);
          setTransactions(arr);
      })
      .catch((err)=>console.log(err))
  }, [])
  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {transactions && stableSort(transactions, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.trackingNo);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.trackingNo}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      <Shorten item={row.hash}/>
                      {/* {}? */}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.block_height}</TableCell>
                  <TableCell align="left">
                    <OrderType status={row.type}/>
                  </TableCell>
                  <TableCell align="left">
                    <OrderStatus status={row.status} />
                  </TableCell>
                  <TableCell align="left">
                    <Shorten item={row.from_l1_address}/>
                  </TableCell>
                  <TableCell align="left">
                    <Shorten item={row.to_l1_address}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
