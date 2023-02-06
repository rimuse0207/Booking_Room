import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import AdminPrePareContainer from './PimRoomPrePare/AdminPrePare/AdminPrePareContainer';

const PimRoomEnterContainerMainDivBox = styled.div`
    .Container {
        max-width: 80%;
        margin: 0 auto;
        @media only screen and (max-width: 800px) {
            max-width: 95%;
        }
    }
`;

const PimRoomEnterContainer = () => {
    const { Room_Title, Room_Keys } = useParams();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [PimState, setPimState] = useState({
        prepare: false,
        finished: false,
    });
    const Checking_Room_Start = async () => {
        try {
            const Checking_Room_Start_Axios = await axios.get(`${process.env.REACT_APP_DB_HOST}/LocalPim/Pim_Room_Checking_Start`, {
                params: {
                    Room_Keys,
                },
            });

            if (Checking_Room_Start_Axios.data.dataSuccess) {
                console.log(Checking_Room_Start_Axios);

                if (Checking_Room_Start_Axios.data.Room_Checking_Start_Rows[0]) {
                    if (Checking_Room_Start_Axios.data.Room_Checking_Start_Rows[0].local_pim_room_info_prepare_check === 0) {
                        // 준비중
                        if (Checking_Room_Start_Axios.data.Room_Checking_Start_Rows[0].local_pim_room_info_maker !== LoginInfo.Login_id) {
                            alert('아직 PIM 준비중에 있습니다. 잠시 후 다시 시도 해주세요.');
                        } else {
                            setPimState({ ...PimState, prepare: true, finished: false });
                        }
                    } else if (Checking_Room_Start_Axios.data.Room_Checking_Start_Rows[0].local_pim_room_info_finished_check === 1) {
                        // 종료
                        setPimState({ ...PimState, finished: false, prepare: false });
                    } else {
                        // 대전 시작
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Checking_Room_Start();
    }, []);

    return (
        <PimRoomEnterContainerMainDivBox>
            <NavigationMainPage TitleName={Room_Title}></NavigationMainPage>
            <div className="Container">
                {PimState.prepare ? <AdminPrePareContainer Room_Keys={Room_Keys}></AdminPrePareContainer> : <></>}
            </div>
        </PimRoomEnterContainerMainDivBox>
    );
};

export default PimRoomEnterContainer;
