import React from 'react';
import './graphs.css';

interface AuditProps {
    audits: {
        amount: number,
        createdAt: number,
        objectName: string,
        type: string,
    }[]
}

function Graph({ audits }: AuditProps) {

    // audits.sort((a, b) => a.createdAt - b.createdAt)
    // for (const audit of audits) {
    //     console.log(audit)
    // }

    return (
        <div className='graph'>
            <svg width="100%" height="400px" viewBox="0 0 3626 1021" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 845L753 48.5L1620.5 1018.5L2397.5 125.5L3278 697.5L3425.5 3.5L3624.5 395.5" stroke="white" strokeWidth="10" />
            </svg>
        </div>
    )

}

export default Graph;
