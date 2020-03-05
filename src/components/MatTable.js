import React, { useEffect, useState } from "react";
import firebase from "../Firebase";
import {Table, makeStyles, TableHead, TableContainer, TableCell, TableBody, TableRow, Paper} from '@material-ui/core'
import "../App.css"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

 const MatTable = (props) => {
  const classes = useStyles()

  return (
    <div>
       <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Current Stock</TableCell>
            <TableCell align="right">Minimum Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {props.items.map(row => (
              <TableRow className={row.minStock > row.currStock ? 'hilite':''} key={row.key}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.currStock}</TableCell>
                <TableCell align="right">{row.minStock}</TableCell>
              </TableRow>
           ))}
        </TableBody>
      </Table>
    </TableContainer> 
    </div>
  );
}

export default MatTable