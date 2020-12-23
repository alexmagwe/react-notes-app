import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga'
import './index.css';
import App from './App';

ReactGA.initialize('G-G4R2V9QXJR');
 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

