import React from 'react';
import './Graphs.css';

class Graph extends React.Component {
    constructor(props: Object) {
        super(props);
    }

    render() {
        return (
            <div className='graph'><svg width="100%" height="400px" viewBox="0 0 3626 1021" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 845L753 48.5L1620.5 1018.5L2397.5 125.5L3278 697.5L3425.5 3.5L3624.5 395.5" stroke="white" stroke-width="2" />
            </svg>
            </div>
        )
    }
}

export default Graph;
