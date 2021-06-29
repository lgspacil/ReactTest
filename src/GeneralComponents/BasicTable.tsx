import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchBar from './SearchBar';
import { ApiWrapper } from '../Class/ApiWrapper';
import Amplify, { Auth, API } from 'aws-amplify';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const originalRows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

interface TableData {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

const BasicTable = () => {

  // useEffect(() => {
  //   // load all orders
  //   async function fetchOrders() {
  //     try {
  //       // console.log('attempting to fetch all orders');
  //     } catch (err) {
  //       console.log('fetch orders error ', err);
  //     }
  //   }
  //   fetchOrders();
  // }, []);

  const loadOrders = async () => {
    try{
      // console.log('AUTH ', await Auth)
      // const authInit = {
      //   headers: { Authorization: "eyJraWQiOiJYU0hUQ1BTQVdOK2pXZGZZT09ra2VVN2tZUnRiYjRVTWRDUExmZDFad013PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ODA0YjIxZC0wMjYwLTQ1MzEtOWJiNi0zMzY4YTg5OWFmMDciLCJldmVudF9pZCI6IjNkZmY0YjM2LWRlMzAtNDMzZi04MjEwLTAwYmZiYTRmZjI2MCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTU1Njc5MzMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1hCTVhpb0JvYSIsImV4cCI6MTYxNTU3MTUzMywiaWF0IjoxNjE1NTY3OTMzLCJqdGkiOiI2NjUyMzVkMC0yMGE1LTQ3MDQtYjNlMC03YmEzOTM3NDBjYTQiLCJjbGllbnRfaWQiOiI0MzljanYyZW4yazZlc280cjhzdGdiMHVvdSIsInVzZXJuYW1lIjoiODgwNGIyMWQtMDI2MC00NTMxLTliYjYtMzM2OGE4OTlhZjA3In0.QuwFZy3TPZ9uWcPfCy_1794mu-rXNkuPtH9q2GfPHijYvTuhICSjsSY5KlT-x_W-j8skolvRspSYsAwlW_c93c3CNuTwkrsNplXVtiq3KIL02wfVcsttNaQwL-ySm8S-jJP3lfeJlwGIymssFekg3xjY-qmlNlLR0zOpJscg92_P8SC7FOSvUXtJ9ZYYsacVBMzVCywXPeqQvlOLpXVXMvjSF9lTf5e3RkBAbHX-RxiafBRcxnLdcr4Mr8NpwBkZ0Z0WXqy3X_OzLXpuTQ-DnKQm_Qkj6i_scVlZU2P7S0sxQtvvvhPQrI0OPPogLIdTcDpjkDVhslSROZ0kO_HEKQ" },
      // };
      // const res = (await API.get('TerraClear', `/orders/?allZones=true`, authInit)) as any;
      // const session = await Auth.currentCredentials()

      // console.log('session ', session)

      const orders = await ApiWrapper.getAllOrders();      
      console.log('the orders ', orders);
  
      // console.log('the res ', res);
    } catch(err){
      console.log('err ', err);
    }
  }

  const [tableRows, setTableRows] = useState<TableData[]>([
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ])
  const [value, setValues] = useState('');

  const searchBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setValues(searchWord);

    const newTableRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(searchWord.toLowerCase());
    })
    setTableRows(newTableRows)
  };

  const classes = useStyles();

  return (
    <>
      <SearchBar
        value={value}
        searchBarChange={searchBarChange}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={loadOrders}>Load Orders</Button>
    </>
  );
}

export default BasicTable;