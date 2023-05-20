import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";

// material-ui
import {Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
// import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

// function createData(index, address, pk) {
//   return { index, address, pk};
// }

// const rows = [
//   createData(84564564, 'Camera Lens', 40, 2, 40570,),
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
    id: 'Index',
    align: 'left',
    disablePadding: false,
    label: 'Index'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Name'
  },
//   {
//     id: 'symbol',
//     align: 'left',
//     disablePadding: false,
//     label: 'Symbol'
//   },
  {
    id: 'price',
    align: 'left',
    disablePadding: false,
    label: 'Price'
  },
  {
    id: 'Gas Asset',
    align: 'left',
    disablePadding: false,
    label: 'Gas Asset'
  },
  {
    id: 'Address',
    align: 'left',
    disablePadding: false,
    label: 'Address'
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
    case 1:
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
const IsGas = ({status}) =>{
    let title;
    switch (status) {
        case 0:
          title = 'No';
          break;
        case 1:
          title = 'Yes';
          break;
        default:
          title = 'None';
      }
    
      return (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{title}</Typography>
        </Stack>
      );
}
// const Icon = ({icon}) =>{
//     console.log(icon)
//     fetch("https://teststatic.zkbnbchain.org/shared/icon/coin/bnb.svg")
//       .then(res => res.text())
//       .then(text => console.log(text));
//     return (
//         <Stack direction="row" spacing={1} alignItems="center">
//           <Typography>{icon}</Typography>
//         </Stack>
//       );
// }
OrderStatus.propTypes = {
  status: PropTypes.number
};

// let changePage = (e, page) =>{
//     console.log(e)
//     return page+1
// }
// ==============================|| ORDER TABLE ||============================== //
const baseURL = "https://api-testnet.zkbnbchain.org/api/v1/assets?offset=0&limit=20";
export default function AssetsTable() {
    const [assets, setAssets] = useState([]);
    // const [page, setPage] = useState(0);
    useEffect(()=>{
        axios.get(baseURL).then((response) => {
            console.log(response.data.assets)
            let arr = response.data.assets
            const compareByIndex = (a, b) => a.id - b.id;
            arr.sort(compareByIndex);
            setAssets(arr);
        })
        .catch((err)=>console.log(err))
    }, [])
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
    // console.log(accounts)
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
            {assets && stableSort(assets, getComparator(order, orderBy)).map((row, index) => {
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
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                  <Link color="secondary" component={RouterLink} to="">
                      {row.name}
                    </Link>
                    </TableCell>
                  {/* <TableCell align="left"> */}
                    {/* <Icon icon={row.icon}/> */}
                    {/* </TableCell> */}
                  <TableCell align="left">{row.price.slice(0, 10)}</TableCell>
                  <TableCell align="left">
                    <IsGas status={row.is_gas_asset}/>
                    </TableCell>
                <TableCell align="left">
                    {row.address}</TableCell>

                  {/* <TableCell align="left">
                    <OrderStatus status={row.status} />
                  </TableCell>
                  <TableCell align="right">
                    <NumberFormat value={row.time} displayType="text" thousandSeparator />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat value={row.from} displayType="text" thousandSeparator />
                  </TableCell>
                  <TableCell align="right">
                    <NumberFormat value={row.to} displayType="text" thousandSeparator />
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
          {/* <TablePagination count={100} rowsPerPage={20} page={page} onPageChange={(e)=>setPage(changePage(e, page))}/> */}
        </Table>
      </TableContainer>
    </Box>
  );
}
