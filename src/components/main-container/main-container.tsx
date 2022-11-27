import React, { useContext, useState, useEffect } from 'react';
import './main-container.css';
import '../graphs/graphs.css'
import Transactions, { TransactionsProps } from '../transactions/transactions'
import Graph from '../graphs/graphs'
import { UserContext } from '../app/app';
import { auditRatio, currLevel, transactionsAndXp } from '../../query/search';

function MainContainer() {
    const { username } = useContext(UserContext)

    const [audits, setAudits] = useState<{ amount: number; createdAt: number; objectName: string; type: string; }[]>([])
    const [trans, setTrans] = useState<TransactionsProps>({ totalXp: 0, level: 0, transactions: [] })

    useEffect(() => {
        auditRatio(username).then(auditArr => setAudits(auditArr))

        transactionsAndXp(username, false).then(async ({ transactions, totalXp }) => {
            let level = await currLevel(username)
            setTrans({ totalXp, transactions, level })
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
                <Graph audits={audits} />
                {/* <Graph /> */}
            </div>
        </div>
    )
}

export default MainContainer