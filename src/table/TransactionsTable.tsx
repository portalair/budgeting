import React from "react";
import Transaction from "../model/Transaction";
import {Paper, TableContainer, TableHead, Table, TableCell, TableBody, TableRow} from "@mui/material";

class TransactionsTable extends React.Component<any> {

    render() {
        const transactions = this.props.transactions;
        return (
            <TableContainer sx={{width: 1}} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount&nbsp;($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((row: Transaction) => (
                            <TableRow
                            key={row.description}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.date.format('MM-DD-YYYY')}</TableCell>
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