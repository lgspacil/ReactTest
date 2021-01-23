import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StoreContainer } from "./store"

// Wrap the antire app in a store container to give global state to every component

ReactDOM.render(
  // <React.StrictMode>
    <StoreContainer.Provider>
      <App />
    </StoreContainer.Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
