import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import './App.css';

import { Routes} from "./routing/routing";

function App() {

  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  );
}

export default App;
