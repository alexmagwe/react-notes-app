import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { init } from 'emailjs-com';
init(process.env.REACT_APP_EMAIL_USER_ID);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

