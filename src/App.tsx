import React from 'react';
import './App.css';
import TransactionsTable from "./table/TransactionsTable";
import ChartVis from "./chart-vis/ChartVis";
import {Box} from "@mui/material";
import Transaction from "./model/Transaction";
import Sidebar from "./sidebar/Sidebar";
import {TransactionAppState} from "./model/TransactionAppState";
import {TransactionType} from "./model/TransactionType";

class App extends React.Component<any, TransactionAppState> {


    constructor(props: any) {
        super(props);
        this.state = {
            transactions: [
                this.createTransaction(new Date(2022,2,2), 'mtg', 45.5),
                this.createTransaction(new Date(2022,2,3), 'groceries', 43.87),
                this.createTransaction(new Date(2022,2,7), 'gas', 23.39),
                this.createTransaction(new Date(2022,2,10), 'books', 359.87),
                this.createTransaction(new Date(2022,2,10), 'water', 65.87),
                this.createTransaction(new Date(2022,2,13), 'food', 25.87),
                this.createTransaction(new Date(2022,2,17), 'videos', 16.23)
            ]
        };
    }

    createTransaction(date:Date, description:string, amount:number): Transaction {
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
        this.setState({transactions: transactions});
        console.log(this.state);
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
