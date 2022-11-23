import React, { useContext } from 'react';
import './main-container.css';
import '../graphs/graphs.css'
import AdditionalInfo from '../additional-info/additional-info'
import Transactions from '../transactions/transactions'
import Graph from '../graphs/graphs'
import { UserContext } from '../app/app';

function MainContainer() {
    const { username } = useContext(UserContext)

    return (
        <div className="main_container">
            <div className="profile_container">
                <div className="profile_container__nickname">{username}</div>
                <AdditionalInfo />
                <Transactions />
            </div>
            <div className='graphs_container'>
                <Graph />
                <Graph />
                <Graph />
            </div>
        </div>
    )
}

export default MainContainer