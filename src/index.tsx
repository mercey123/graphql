import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './header/header';
import MainContainer from './main-container/main-container';
import './index.css';
import './normalize.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <MainContainer />
  </React.StrictMode>
);
