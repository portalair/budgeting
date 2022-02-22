import React from "react";
import {Box, Button, MenuItem, Select, TextField} from "@mui/material";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {DatePicker} from "@mui/lab";
import {Moment} from "moment";
import Transaction from "../model/Transaction";


// interface SidebarState {
//     transactionType: TransactionType,
//     date: Date,
//     description: string,
//     amount: number
// }

enum TransactionType {
    TRANSACTION='transaction',
    RECURRING='recurring'
}

class Sidebar extends React.Component<any> {
        transactionType: any;
        date: any;
        description: any;
        amount: any;

    render() {
        return (
            <Box sx={{display: 'flex',flexDirection: 'column'}}>
                <Select label="Mode" value={this.transactionType} onChange={this.handleChange}>
                    <MenuItem value={TransactionType.TRANSACTION}>Transaction</MenuItem>
                    <MenuItem value={TransactionType.RECURRING}>Recurring</MenuItem>
                </Select>
                {/*<LocalizationProvider dateAdapter={DateAdapter}>*/}
                {/*    <DatePicker*/}
                {/*        label="Date"*/}
                {/*        value={this.value}*/}
                {/*        onChange={(newValue) => {this.setValue(newValue);}}*/}
                {/*        renderInput={(params) => <TextField {...params} />}>*/}

                {/*    </DatePicker>*/}
                {/*</LocalizationProvider>*/}
                <BasicDatePicker/>
                <TextField id="description" label="description" variant="outlined"></TextField>
                <TextField id="amount" label="amount" variant="outlined"></TextField>
                <Button variant="outlined">submit</Button>
            </Box>
        );
    }

    private handleChange() {

    }

    createTransaction(date:Date, description:string, amount:number): Transaction {
        return {
            date: date,
            description: description,
            amount: amount
        }
    }
}

function BasicDatePicker() {
    const [value, setValue] = React.useState<Date | null>(null);

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
                label="Date"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
export default Sidebar