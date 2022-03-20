import React from 'react';
import './App.css';
import TransactionsTable from "./table/TransactionsTable";
import ChartVis from "./chart-vis/ChartVis";
import {Box} from "@mui/material";
import Transaction from "./model/Transaction";
import Sidebar from "./sidebar/Sidebar";
import {TransactionAppState} from "./model/TransactionAppState";
import {TransactionType} from "./model/TransactionType";
import dayjs from "dayjs";

class App extends React.Component<any, TransactionAppState> {


    constructor(props: any) {
        super(props);
        const savedTransactions = localStorage.transactions ?  JSON.parse(localStorage.transactions) : []
        savedTransactions.forEach((transaction: Transaction) => {
            transaction.date = dayjs(transaction.date);
        });
        this.state = {
            transactions: savedTransactions
        };
    }

    createTransaction(date:dayjs.Dayjs, description:string, amount:number): Transaction {
        return {
            transactionType: TransactionType.TRANSACTION,
            date: date,
            description: description,
            amount: amount
        }
    }

    callback = (transaction: Transaction) => {
        const transactions = this.state.transactions;
        transactions.push(transaction)
        localStorage.setItem('transactions', JSON.stringify(transactions));
        this.setState({transactions: transactions});
        console.log(localStorage);
    }

    render() {
        const transactions = this.state.transactions;
      return (
          <div className="App">
              <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 1,
                  gridTemplateRows: 'auto',
                  gridTemplateAreas: '"graph graph graph sidebar sidebar""table table table table table"'
              }}>
                  <Box sx={{gridArea: 'graph'}} className="graph">
                      <ChartVis/>
                  </Box>
                  <Box sx={{gridArea: 'sidebar'}} className="add">
                    <Sidebar
                        parentCallback={this.callback}
                        createTransaction={this.createTransaction}
                        state={this.state}/>
                  </Box>
                  <Box sx={{gridArea: 'table'}} className="table">
                      <TransactionsTable transactions={transactions}/>
                  </Box>
              </Box>


              <header>
                  {/*{dancin()}*/}
              </header>
          </div>
      )
  }


}

export default App;
