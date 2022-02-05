import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

// fix mobile screen height
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
