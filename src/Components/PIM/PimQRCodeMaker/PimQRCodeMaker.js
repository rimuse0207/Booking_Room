import React from 'react';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';

const PimQRCodeMaker = () => {
    const { Room_Title, Room_Keys } = useParams();
    return (
        <div style={{ height: 'auto', margin: '0 auto', maxWidth: 264, width: '100%' }}>
            <div style={{ marginBottom: '50px' }}></div>
            <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={`${process.env.REACT_APP_FRONT_HOST}/PIM/RoomEnter/${Room_Keys}/${Room_Title}`}
                viewBox={`0 0 256 256`}
            />
        </div>
    );
};

export default PimQRCodeMaker;
