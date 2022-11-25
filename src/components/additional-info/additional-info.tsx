import React, { useState } from 'react';
import { currLevel, transactionsAndXp } from '../../query/search';
import './additional-info.css';

interface InfoProps {
    value: string;
}

// interface Info {
//     min: number,
//     max: number,
//     percents: number,
// }

const getXp = (level: number) => level * (176 + 3 * level * (47 + 11 * level))

function AdditionalInfo({ value }: InfoProps) {
    const [max, setMax] = useState(0)
    const [min, setMin] = useState(0)
    const [percents, setPercents] = useState(0)

    currLevel(value).then(async (level) => {
        let { totalXp } = await transactionsAndXp(value)

        let max = getXp(level + 1) - getXp(level)
        let min = getXp(level + 1) - totalXp
        min = min > 0 ? min : 0
        let percents = Math.round(min * 100 / max)

        setMax(max)
        setMin(min)
        setPercents(percents)
    })

    return (
        <div className='additional_info'>
            <div className='additional_info__currentXp'>{min}/{max}</div>
            <div className='progress'>
                <div className='progress__bar' style={{ width: `${percents}%` }}></div>
            </div>
        </div>
    );
}

export default AdditionalInfo