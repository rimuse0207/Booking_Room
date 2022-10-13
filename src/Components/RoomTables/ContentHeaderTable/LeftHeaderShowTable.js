import React from 'react';

const LeftHeaderShowTable = ({ InfoDatas }) => {
    return (
        <div>
            <div className="Main_Room_title" key={InfoDatas.name}>
                <h3>{InfoDatas.name}</h3>
            </div>
        </div>
    );
};

export default LeftHeaderShowTable;
