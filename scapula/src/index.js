import React from 'react';
import ReactDOM from 'react-dom';
import {RecoilRoot} from "recoil"
import { MoralisProvider } from "react-moralis"
import App from './App';
import reportWebVitals from './reportWebVitals';





ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <MoralisProvider  serverUrl="https://twyrtcrfrfkd.usemoralis.com:2053/server" appId="hNI1RMG8snOeIlRjEw2XhebzJIflCNb4kB9CtFuW" >
        <App />   
       </MoralisProvider>
    </RecoilRoot>
  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
