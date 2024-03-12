import React from 'react';
import './App.css';
import DataFetcher from './datafetcher';
import Header from './header';
function App() {
  return (
    <div>
      <Header/>
      <div className="App">
        <DataFetcher />
      </div>
    </div>
  );
}

export default App;
