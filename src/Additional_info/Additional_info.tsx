import React from 'react';
import './Additional_info.css';

class Additional_info extends React.Component {
    // constructor(props: Object) {
    //     super(props);
    // }

    render() {
        return (
            <div className='additional_info'>
                <div className='additional_info__currentXp'>32506xp/60000xp</div>
                <div className='progress'>
                    <div className='progress__bar' style={{ width: `${69}%` }}></div>
                </div>
            </div>
        );
    }
}

export default Additional_info