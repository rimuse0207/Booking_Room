import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import PimRoomOngoingContainer from './PimRoomOngoing/PimRoomOngoingContainer';
import AdminPrePareContainer from './PimRoomPrePare/AdminPrePare/AdminPrePareContainer';
import BasicPrePareContainer from './PimRoomPrePare/BasicPrePare/BasicPrePareContainer';
import { FaArrowLeft } from 'react-icons/fa';
import PimRoomPrePareContainer from './PimRoomPrePare/PimRoomPrePareContainer';
import PimRoomFinishContainer from './PimRoomFinish/PimRoomFinishContainer';

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
    const history = useHistory();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [PimState, setPimState] = useState({
        prepare: false,
        finished: false,
    });
    const [CheckingMaker, setCheckingMaker] = useState(false);
    const Checking_Room_Start = async () => {
        try {
            const Checking_Room_Start_Axios = await axios.get(`${process.env.REACT_APP_DB_HOST}/LocalPim/Pim_Room_Checking_Start`, {
                params: {
                    Room_Keys,
                },
            });

            if (Checking_Room_Start_Axios.data.dataSuccess) {
                if (Checking_Room_Start_Axios.data.Room_Checking_Start_Rows[0]) {
                    if (Checking_Room_Start_Axios.data.Room_Checking_Start_Rows[0].local_pim_room_info_prepare_check === 0) {
                        // 준비중
                        if (Checking_Room_Start_Axios.data.Room_Checking_Start_Rows[0].local_pim_room_info_maker !== LoginInfo.Login_id) {
                            setPimState({ ...PimState, prepare: true, finished: false });
                        } else {
                            setPimState({ ...PimState, prepare: true, finished: false });
                            setCheckingMaker(true);
                        }
                    } else if (Checking_Room_Start_Axios.data.Room_Checking_Start_Rows[0].local_pim_room_info_finished_check === 1) {
                        // 종료
                        if (Checking_Room_Start_Axios.data.Room_Checking_Start_Rows[0].local_pim_room_info_maker === LoginInfo.Login_id) {
                            setCheckingMaker(true);
                        }
                        setPimState({ ...PimState, finished: true, prepare: false });
                    } else {
                        // 대전 시작
                        if (Checking_Room_Start_Axios.data.Room_Checking_Start_Rows[0].local_pim_room_info_maker === LoginInfo.Login_id) {
                            setCheckingMaker(true);
                        }
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
                {PimState.prepare && CheckingMaker && !PimState.finished ? (
                    <AdminPrePareContainer Room_Keys={Room_Keys}></AdminPrePareContainer>
                ) : (
                    <></>
                )}
                {/* 투표 만들기 전 */}
                {PimState.prepare && !CheckingMaker && !PimState.finished ? (
                    <PimRoomPrePareContainer Room_Keys={Room_Keys}></PimRoomPrePareContainer>
                ) : (
                    <></>
                )}
                {/* 투표진행 시 */}
                {!PimState.prepare && !PimState.finished ? (
                    <PimRoomOngoingContainer Room_Keys={Room_Keys} CheckingMaker={CheckingMaker}></PimRoomOngoingContainer>
                ) : (
                    <></>
                )}
                {/* 투표종료 시 */}
                {PimState.finished ? <PimRoomFinishContainer></PimRoomFinishContainer> : <></>}
            </div>
        </PimRoomEnterContainerMainDivBox>
    );
};

export default PimRoomEnterContainer;
