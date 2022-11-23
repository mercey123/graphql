import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './header/header';
import MainContainer from './main-container/main-container';
import './index.css';
import './normalize.css'
import {allUsers, auditRatio, currLevel, getUser, transactionsAndXp} from './query/search'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <MainContainer />
  </React.StrictMode>
);

// getUser("Zewas")
// .catch((reas) => {console.log(reas)})
// .then(
//   (username)=>{
//     if (username != null) {
      
//     console.log("name: " + username)
//     currLevel(username).then(
//       (level)=>{console.log("level: " + level)}
//     )
    
//     auditRatio(username).then(
//       (audits)=>{console.log("audits: "), console.log(audits)}
//     )

//     console.log("totalxp: ")
//     console.log(transactionsAndXp(username, false))
//   }
//   }
// )

// // allUsers().then(console.log)