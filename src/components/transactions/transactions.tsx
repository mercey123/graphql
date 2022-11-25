import React from 'react';
import './transactions.css';

export interface TransactionsProps {
    totalXp: number,
    level: number,
    transactions: {
        amount: number;
        timestamp: number;
        objectName: string;
    }[]
}

function Transactions({ totalXp, level, transactions }: TransactionsProps) {
    let ans = ""

    if (totalXp / 1000000 > 1) {
        ans = (totalXp / 1000000).toFixed(2) + " Mb"
    } else if (totalXp / 1000 > 1) {
        ans = (totalXp / 1000).toFixed(2) + " Kb"
    } else {
        ans = totalXp + " b"
    }

    return (
        <div className='transactions'>
            <div className='level'>
                <div className='level__item'>Total xp = {ans}</div>
                <div className='level__item'>Level {level}</div>
            </div>
            <div className='recent_activity'>
                {transactions.map((trans, index) => (
                    <div className='transaction' key={index}>
                        <div className='transaction__item'>{trans.objectName}</div>
                        <div className='transaction__item transaction__item_right'>{new Date(trans.timestamp).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Transactions;