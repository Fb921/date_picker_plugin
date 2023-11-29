import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

function DatePicker({id, name, dateSetter}){
    console.log("Bonjour date picker");
    return ( <App id = { id } name = { name } dateSetter = {dateSetter}/>);
};

export default DatePicker;

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

