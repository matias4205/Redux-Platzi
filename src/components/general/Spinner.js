import React from 'react';

import '../styles/spinner.css';

const Spinner = (props) => {
    return (
        <div className="is-centered">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>            
        </div>
    );
};

export default Spinner;