import React from "react";
import {
    Box,
    Button,
    FormControl, InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
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
            date: dayjs().startOf('day'),
            description: '',
            amount: 0
        };
    }

    render() {
        return (
            <Box sx={{display: 'flex',flexDirection: 'column', paddingLeft: '10px', paddingRight: '10px'}}>
                {JSON.stringify(this.state)}
                <label>New Transaction</label>
                <FormControl sx={{marginTop: '5px', marginBottom: '10px'}} >
                    <InputLabel id="transaction-select-label">Transaction type</InputLabel>
                    <Select
                        labelId="transaction-select-label"
                        id="transaction-select"
                        name="transaction type"
                        label="Transaction type"
                        defaultValue={TransactionType.TRANSACTION}
                        onChange={
                            (event: SelectChangeEvent) => {
                                this.setState({
                                transactionType: event.target.value as TransactionType
                            });
                        }}
                    >
                        <MenuItem value={TransactionType.TRANSACTION}>Transaction</MenuItem>
                        <MenuItem value={TransactionType.RECURRING}>Recurring</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DatePicker
                        label="Date"
                        value={this.state.date}
                        onChange={(newValue) => {this.setState({date: newValue || dayjs()})}}
                        renderInput={(params) => <TextField {...params} />}/>
                </LocalizationProvider>
                <FormControl sx={{marginTop: '10px', marginBottom: '5px'}}>
                    <InputLabel htmlFor="description">description</InputLabel>
                    <OutlinedInput
                        id="description"
                        label="description"
                        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        value={this.state.description}
                        onChange={(event => {
                            this.setState({description: event.target.value});
                        })}
                    />
                </FormControl>
                <TextField sx={{marginTop: '5px', marginBottom: '5px'}} id="amount" value={this.state.amount} variant="outlined"/>
                <Button variant="outlined" onClick={() => {this.onSubmit(this.state)}}>submit</Button>
            </Box>
        );
    }

    private onSubmit(state: any) {
        console.log(state);
        this.props.parentCallback(this.props.createTransaction(state.date, state.description, state.amount));
    }
}

export default Sidebar