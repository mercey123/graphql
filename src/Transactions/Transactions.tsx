import React from 'react';
import './Transactions.css';

const buba = {
    transactions: [
        {
            name: "make-your-game-score-handling",
            date: "Oct 28, 2022 at 3:21 pm",
        },
        {
            name: "real-time-forum",
            date: "Oct 24, 2022 at 6:14 pm",
        },
        {
            name: "Rust-piscine",
            date: "Oct 7, 2022 at 4:12 pm",
        },
        {
            name: "atm-management-system",
            date: "Jul 25, 2022 at 7:07 pm",
        },
        {
            name: "make-your-game",
            date: "Jul 7, 2022 at 12:40 pm",
        },
        {
            name: "forum",
            date: "Jun 15, 2022 at 9:20 pm",
        },

    ]
}

class Transactions extends React.Component {
    constructor(props: Object) {
        super(props);
        this.state
    }

    renderTransactions(trans: any) {
        return (
            <div className='transaction'>
                <div className='transaction__item'>{trans.name}</div>
                <div className='transaction__item'>{trans.date}</div>
            </div>
        )
    }

    render() {
        return (
            <div className='transactions'>
                <div className='level'>
                    <div className='level__item'>Total xp = 800kB</div>
                    <div className='level__item'>Level 99</div>
                </div>
                <div className='recent_activity'>
                    {this.renderTransactions(buba.transactions[0])}
                    {this.renderTransactions(buba.transactions[1])}
                    {this.renderTransactions(buba.transactions[2])}
                    {this.renderTransactions(buba.transactions[3])}
                    {this.renderTransactions(buba.transactions[4])}
                    {this.renderTransactions(buba.transactions[5])}
                </div>
            </div>
        )
    }
}

export default Transactions;