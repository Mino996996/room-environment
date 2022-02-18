import React from 'react';
import './App.css';
import {FirebaseRepository} from "./fixture/repositories/firebaseRepository";

const firebaseRepository = new FirebaseRepository();
const App: React.FC = () => {

  const readDb = async () => {
    try {
      await firebaseRepository.latestData('2022-02-18');
    } catch (e: any) {
      console.error(e.message);
    }
  }


  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <button
       onClick={readDb}
      >

      </button>
    </>

  );
}

export default App;
