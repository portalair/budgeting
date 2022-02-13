import React from 'react';
import './App.css';
import dancin from "./dancin/dancin";
import TransactionsTable from "./table/TransactionsTable";

function App() {

  return (
    <div className="App">
      <header>
          {/*{dancin()}*/}
          <TransactionsTable/>
      </header>
    </div>
  );
}

export default App;
