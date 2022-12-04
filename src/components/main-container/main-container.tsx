import React, { useContext, useState, useEffect } from 'react';
import './main-container.css';
import '../graphs/graphs.css'
import Transactions, { TransactionsProps } from '../transactions/transactions'
import { Graph } from '../graphs/graphs'
import { UserContext } from '../app/app';
import { auditRatio, currLevel, transactionsAndXp } from '../../query/search';

export interface GraphData {
    amount: number,
    timestamp: number,
    objectName: string,
    type?: string,
}

function MainContainer() {
    const { username } = useContext(UserContext)

    const [auditsData, setAudits] = useState<GraphData[]>([])
    const [transactionsData, setTransactions] = useState<GraphData[]>([])
    const [trans, setTrans] = useState<TransactionsProps>({ totalXp: 0, level: 0, transactions: [] })

    useEffect(() => {
        auditRatio(username).then(auditArr => setAudits(auditDataHandler(auditArr)))
        transactionsAndXp(username, false).then(async ({ transactions, totalXp }) => {
            let level = await currLevel(username)
            let graphTrans = transactions.slice()
            graphTrans.sort((a, b) => a.timestamp - b.timestamp)

            setTrans({ totalXp, transactions, level })
            setTransactions(transactionDataHandler(graphTrans))
        })
    }, [username])


    return (
        <div className="main_container">
            <div className="profile_container">
                <div className="profile_container__nickname">{username}</div>
                {/* <AdditionalInfo value={parsedUsername} /> */}
                <Transactions {...trans} />
            </div>
            <div className='graphs_container'>
                {/* <Graph /> */}
                <Graph data={auditsData} title={"Audits"} />
                <Graph data={transactionsData} title={"Your progress"} />
            </div>
        </div>
    )
}

function auditDataHandler(unsortedInput: GraphData[]): GraphData[] {
    let graphTotal = 0

    return unsortedInput.map(({ amount, timestamp, objectName, type }: GraphData) => {
        if (type === 'up') graphTotal += amount
        else if (type === 'down') graphTotal -= amount

        return {
            amount: graphTotal,
            timestamp,
            objectName,
        }
    })
}

function transactionDataHandler(d: GraphData[]): GraphData[] {
    let graphTotal = 0

    return d.map(({ amount, timestamp, objectName }: GraphData) => {
        graphTotal += amount

        return {
            amount: graphTotal,
            timestamp,
            objectName,
        }
    })
}

export default MainContainer