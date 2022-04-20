import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import LoginContext from './ContextAPI/LoginContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginContext>
          <App />
      </LoginContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
