import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);