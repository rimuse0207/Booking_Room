import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BasicPrePareContainer = ({ Room_Keys }) => {
    const [VideoRoom, setVideoRoom] = useState(false);
    const RoomVideoChecking = async () => {
        try {
            const Video_Room_Checking_Axios = await axios.get(`${process.env.REACT_APP_DB_HOST}/LocalPim/Pim_Room_Video_Room_Checking`, {
                params: {
                    Room_Keys,
                },
            });

            if (Video_Room_Checking_Axios.data.dataSuccess) {
                setVideoRoom(
                    Video_Room_Checking_Axios.data.Video_Room_Checking_Rows[0].local_pim_room_info_meeting_check === 1 ? true : false
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        RoomVideoChecking();
    }, []);

    return (
        <div>
            <h2>현재 대진표 준비중입니다.</h2>
            {VideoRoom ? (
                <div>
                    <h2>준비중에는 화상회의 접속만 가능합니다.</h2>
                    <div style={{ display: 'flex' }}>
                        <h3>화상회의 접속 URL :</h3>
                        <h4
                            style={{ borderBottom: '1px solid #368', fontWeight: 'bolder', color: '#368', marginLeft: '30px' }}
                            onClick={() => window.open(`https://ecomet11.disco.co.jp/DHKS/PIM/${Room_Keys}`)}
                        >
                            여기를 클릭 해주세요.
                        </h4>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default BasicPrePareContainer;
