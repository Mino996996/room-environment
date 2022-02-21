import React from 'react';
import './App.css';
import {Graph} from "./components/Graph";


const App: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Graph />
    </>

  );
}

export default App;
