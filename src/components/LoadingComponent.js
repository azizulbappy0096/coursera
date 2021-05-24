import React from 'react';

export const Loading = ({addClass}) => {
    return(
        <div className={`col ${addClass}`}>
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading . . .</p>
        </div>
    );
};