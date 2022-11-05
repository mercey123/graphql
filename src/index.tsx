import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './header/header';
import Main_container from './Main_container/Main_container';
import './index.css';
import './normalize.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <Main_container />
  </React.StrictMode>
);
