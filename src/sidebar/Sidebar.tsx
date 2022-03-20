import React from "react";
import {Box, Button, MenuItem, Select, TextField} from "@mui/material";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from "@mui/lab";
import Transaction from "../model/Transaction";
import {TransactionType} from "../model/TransactionType";
import dayjs from "dayjs";


// interface SidebarState {
//     transactionType: TransactionType,
//     date: Date,
//     description: string,
//     amount: number
// }

class Sidebar extends React.Component<any, Transaction> {



    constructor(props: any) {
        super(props);
        this.state = {
            transactionType: TransactionType.TRANSACTION,
            date: dayjs(),
            description: 'mock',
            amount: 5.12
        };
    }

    render() {
        return (
            <Box sx={{display: 'flex',flexDirection: 'column'}}>

                <Select sx={{marginTop: '5px', marginBottom: '10px'}} label="Mode" value={this.state.transactionType} onChange={(newValue) => {this.handleChange(newValue)}}>
                    <MenuItem value={TransactionType.TRANSACTION}>Transaction</MenuItem>
                    <MenuItem value={TransactionType.RECURRING}>Recurring</MenuItem>
                </Select>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                        label="Date"
                        value={this.state.date}
                        onChange={(newValue) => {this.setState({date: newValue || dayjs()})}}
                        renderInput={(params) => <TextField {...params} />}/>
                </LocalizationProvider>
                <TextField sx={{marginTop: '10px', marginBottom: '5px'}} id="description" value={this.state.description} variant="outlined"/>
                <TextField sx={{marginTop: '5px', marginBottom: '5px'}} id="amount" value={this.state.amount} variant="outlined"/>
                <Button variant="outlined" onClick={() => {this.onSubmit(this.state)}}>submit</Button>
            </Box>
        );
    }

    private handleChange(newValue: any) {
        this.setState({
            transactionType:  newValue.target.value
        });
    }


    private onSubmit(state: any) {
        console.log(state);
        this.props.parentCallback(this.props.createTransaction(state.date, state.description, state.amount));
    }
}

export default Sidebar