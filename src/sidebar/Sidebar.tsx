import React from "react";
import {
    Box,
    Button,
    FormControl, InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput, Paper,
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


    state = {
        transactionType: TransactionType.TRANSACTION,
        date: dayjs().startOf('day'),
        description: '',
        amount: ''
    };

    render() {
        const date = this.state.date;
        return (
            <Box>
                <Paper sx={{display: 'flex',flexDirection: 'column', p: 3, height: '100%'}}>
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
                            value={date}
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
                    <FormControl sx={{marginTop: '5px', marginBottom: '5px'}}>
                        <InputLabel htmlFor="amount">amount</InputLabel>
                        <OutlinedInput
                            id="amount"
                            label="amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            value={this.state.amount}
                            onChange={(event => {
                                this.setState({amount:event.target.value});
                            })}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                    </FormControl>
                    <Button variant="outlined" onClick={() => {this.onSubmit(this.state)}}>submit</Button>
                    {/*{JSON.stringify(this.state)}*/}
                </Paper>
            </Box>
        );
    }

    private onSubmit(state: any) {
        console.log(state);
        if(state.description === 'smug.exe') {
            console.log('execute smug.exe')
            this.props.smugexe();
        } else {
            this.props.parentCallback(this.props.createTransaction(state.date, state.description, state.amount));
            this.setState({description: '', amount: ''})
        }
    }
}

export default Sidebar