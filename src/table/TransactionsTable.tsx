import React from "react";
import Transaction from "../model/Transaction";
import {Paper, TableContainer, TableHead, Table, TableCell, Button, TableBody, TableRow, Tab} from "@mui/material";

class TransactionsTable extends React.Component {
    mockData = [
        this.createTransaction(new Date(2022,2,2), 'mtg', 45.5),
        this.createTransaction(new Date(2022,2,3), 'groceries', 43.87),
        this.createTransaction(new Date(2022,2,7), 'gas', 23.39),
        this.createTransaction(new Date(2022,2,10), 'books', 359.87)
    ];

    createTransaction(date:Date, description:string, amount:number): Transaction {
        return {
            date: date,
            description: description,
            amount: amount
        }
    }


    render() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount&nbsp;($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.mockData.map((row) => (
                            <TableRow
                            key={row.description}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.date.toDateString()}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
export default TransactionsTable