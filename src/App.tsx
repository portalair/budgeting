import React from 'react';
import './App.css';
import dancin from "./dancin/dancin";
import TransactionsTable from "./table/TransactionsTable";
import ChartVis from "./chart-vis/ChartVis";
import {Box} from "@mui/material";
import Transaction from "./model/Transaction";
import Sidebar from "./sidebar/Sidebar";
import {TransactionAppState} from "./model/TransactionAppState";

class App extends React.Component<any, TransactionAppState> {


    constructor(props: any) {
        super(props);
        this.state = {
            transactions: [
                this.createTransaction(new Date(2022,2,2), 'mtg', 45.5),
                this.createTransaction(new Date(2022,2,3), 'groceries', 43.87),
                this.createTransaction(new Date(2022,2,7), 'gas', 23.39),
                this.createTransaction(new Date(2022,2,10), 'books', 359.87)
            ]
        };
    }

    createTransaction(date:Date, description:string, amount:number): Transaction {
        return {
            date: date,
            description: description,
            amount: amount
        }
    }

    render() {
        const transactions = this.state.transactions;
      return (
          <div className="App">
              <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 1,
                  gridTemplateRows: 'auto'
              }}>
                  <Box sx={{gridColumn: '1 / 4', gridRow: '1 / 4', width: '1', height: '1'}} className="graph">
                      <ChartVis/>
                  </Box>
                  <Box sx={{gridColumn: '4 / 6', gridRow:'1 / 4'}} className="add">
                    <Sidebar/>
                  </Box>
                  <Box sx={{gridRow: '4 / 6', gridColumn: '1 / 6'}} className="table">
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