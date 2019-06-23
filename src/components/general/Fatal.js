import React from 'react';

const Fatal = (props) => {
    return (
        <h2 className="is-centered">
            {props.message}
        </h2>
    );
};

export default Fatal;