import React from 'react';
import './Main_container.css';
import '../Graphs/Graphs.css'
import Additional_info from '../Additional_info/Additional_info'
import Transactions from '../Transactions/Transactions'
import Graph from '../Graphs/Graphs'

function Main_container() {
    return (
        <div className="main_container">
            <div className="profile_container">
                <div className="profile_container__nickname">Менсунн123</div>
                <Additional_info />
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

export default Main_container