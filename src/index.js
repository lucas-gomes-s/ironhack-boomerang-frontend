import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import "./configs/firebase"
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import theme from "./configs/materialUiTheme"
import { ThemeProvider} from '@mui/material/styles';
import { AuthContextProvider } from './contexts/authContext';
import {CartContextProvider} from "./contexts/cartContext"
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterMoment from '@mui/lab/AdapterMoment';

ReactDOM.render(
  <AuthContextProvider>
    <LocalizationProvider dateAdapter={AdapterMoment} locale="ptBR" >
      <CartContextProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </BrowserRouter>
        </ThemeProvider>
      </CartContextProvider>
    </LocalizationProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
