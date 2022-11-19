import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header/Header';
import Main_container from './Main_container/Main_container';
import './index.css';
import './normalize.css'
import {allUsers, auditRatio, currLevel, getUser, personalTransactions, totalXP} from './query/search'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <Main_container />
  </React.StrictMode>
);

getUser("Zewas")
.catch((reas) => {console.log(reas)})
.then(
  (username)=>{
    if (username != null) {
      
    // console.log("name: " + username)
    // currLevel(username).then(
    //   (level)=>{console.log("level: " + level)}
    // )
    
    // auditRatio(username).then(
    //   (audits)=>{console.log(audits)}
    // )

    // personalTransactions(username).then(
    //   (trans)=>{console.log(trans)}
    // )

    // console.log(testus(username))
  }
  }
)

allUsers().then(console.log)