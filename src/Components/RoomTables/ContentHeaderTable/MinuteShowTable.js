import React from 'react';

const MinuteShowTable = () => {
    return (
        <div className="TableInTableLine">
            {Array(48)
                .fill(0)
                .map((data, index) => {
                    return (
                        <div
                            key={index}
                            className="Main_TimeLine_Content"
                            style={index % 2 === 0 ? { borderLeft: '1px solid lightgray' } : { borderRight: '1px solid lightgray' }}
                        >
                            {index % 2 === 0 ? '00' : '30'}
                        </div>
                    );
                })}
        </div>
    );
};

export default MinuteShowTable;
