import React from 'react';
import './App.css';
import './dancin/dancin.css'
import TransactionsTable from "./table/TransactionsTable";
import ChartVis from "./chart-vis/ChartVis";
import {Box} from "@mui/material";
import Transaction from "./model/Transaction";
import Sidebar from "./sidebar/Sidebar";
import {TransactionAppState} from "./model/TransactionAppState";
import {TransactionType} from "./model/TransactionType";
import dayjs from "dayjs";
import dancin from "./dancin/dancin";

class App extends React.Component<any, TransactionAppState> {
    private timeToSmug = false;

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

    delete(transactions: Transaction[], selected: string[]) {
        const newList = transactions.filter((transaction) => {
            return selected.indexOf(this.getId(transaction)) == -1;
        });
        localStorage.setItem('transactions', JSON.stringify(newList));
        this.setState({transactions: newList});

    }

    getId(transaction: Transaction): string {
        return transaction.date.format() + ',' + transaction.description + ',' + transaction.amount;
    }


    createTransaction(date:dayjs.Dayjs, description:string, amount:string): Transaction {
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
    }



    render() {
        const transactions = this.state.transactions;
      return (
          <div className="App">
              <Box id="container" className="appContainer" sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: 1,
                  gridTemplateRows: 'auto',
                  gridTemplateAreas: '"graph graph graph graph sidebar sidebar""table table table table table table"',
                  padding: 3
              }}>
                  <Box sx={{gridArea: 'graph'}} className="graph">
                      <ChartVis/>
                  </Box>
                  <Box sx={{gridArea: 'sidebar'}} className="add">
                    <Sidebar
                        parentCallback={this.callback}
                        createTransaction={this.createTransaction}
                        smugexe={() => {
                            // @ts-ignore
                            document.getElementById("container").classList.add('danceOut');
                            // @ts-ignore
                            document.getElementById("smug").classList.add('dancin');
                        }}
                        />
                  </Box>
                  <Box sx={{gridArea: 'table'}} className="table">
                      <TransactionsTable transactions={transactions} delete={(selected: string[]) => this.delete(transactions, selected)}/>
                  </Box>
              </Box>


              <div id="smug" className="smug">
                  {dancin()}
              </div>
          </div>
      )
  }

    smugexe() {
        console.log();
        // @ts-ignore
    }



}

export default App;
