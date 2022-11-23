import React from 'react';
import './main-container.css';
import '../Graphs/Graphs.css'
import Additional_info from '../Additional_info/Additional_info'
import Transactions from '../Transactions/Transactions'
import Graph from '../Graphs/Graphs'

export interface sharedState {
    username: string,
    totalXp: number,
    level: number,
    transaction: any[],
    auditRatio: any[],
    distribution: any[]
}

class MainContainer extends React.Component<{}, sharedState, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            username: "Менсунн123",
            totalXp: 980000,
            level: 29,
            transaction: [{
                objectName: "make-your-game-score-handling",
                timestamp: "Oct 28, 2022 at 3:21 pm",
                amount: 49000
            },
            {
                objectName: "real-time-forum",
                timestamp: "Oct 24, 2022 at 6:14 pm",
                amount: 98000
            },
            {
                objectName: "Rust-piscine",
                timestamp: "Oct 7, 2022 at 4:12 pm",
                amount: 390000
            },
            {
                objectName: "atm-management-system",
                timestamp: "Jul 25, 2022 at 7:07 pm",
                amount: 75000
            },
            {
                objectName: "make-your-game",
                timestamp: "Jul 7, 2022 at 12:40 pm",
                amount: 149000
            },
            {
                objectName: "forum",
                timestamp: "Jun 15, 2022 at 9:20 pm",
                amount: 76000
            },],
            auditRatio: [{
                xp: 56000,
                type: "up"
            }, {
                xp: 84000,
                type: "down"
            }, {
                xp: 100000,
                type: "down"
            }, {
                xp: 37560,
                type: "up"
            }, {
                xp: 184200,
                type: "up"
            },],
            distribution: [
                {
                    Zewas: 1000000,
                    Mercey123: 2000000,
                    NeMercey123: 228133
                }
            ]
        }
    }

    render() {
        return (
            <div className="main_container">
                <div className="profile_container">
                    <div className="profile_container__nickname">{this.state.username}</div>
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
}

export default MainContainer