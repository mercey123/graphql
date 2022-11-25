import React, { useContext, useState, useEffect } from 'react';
import './main-container.css';
import '../graphs/graphs.css'
import Transactions, { TransactionsProps } from '../transactions/transactions'
import Graph from '../graphs/graphs'
import { UserContext } from '../app/app';
import { auditRatio, currLevel, getUser, transactionsAndXp } from '../../query/search';

function MainContainer() {
    const { username } = useContext(UserContext)

    const [parsedUsername, setParsedUsername] = useState(username)
    const [audits, setAudits] = useState<{ amount: number; createdAt: number; objectName: string; type: string; }[]>([])
    const [trans, setTrans] = useState<TransactionsProps>({ totalXp: 0, level: 0, transactions: [] })

    useEffect(() => {
        getUser(username)
            .then(async user => {
                let auditArr = await auditRatio(user)
                let { transactions, totalXp } = await transactionsAndXp(user, false)
                let level = await currLevel(user)

                let trans = { totalXp, transactions, level }

                setParsedUsername(user)
                setAudits(auditArr)
                setTrans(trans)
            })
    }, [username])

    return (
        <div className="main_container">
            <div className="profile_container">
                <div className="profile_container__nickname">{parsedUsername}</div>
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