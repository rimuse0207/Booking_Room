import React from 'react';
import { AdminPrePareContainerMainDivBox, ConFirmMainDivBox } from '../PimRoomPrePare/AdminPrePare/AdminPrePareContainer';
import BasicOngoingMainPage from './BasicOngoing/BasicOngoingMainPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import axios from 'axios';
import { toast } from '../../../ToasMessage/ToastManager';
import { useHistory } from 'react-router-dom';

const PimRoomOngoingContainer = ({ Room_Keys, CheckingMaker }) => {
    console.log(CheckingMaker);
    const history = useHistory();
    const handleFinishedMatch = () => {
        try {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <ConFirmMainDivBox>
                            <div className="custom-ui">
                                <h2>주의사항</h2>
                                <ul>
                                    <li>투표 종료시 수정 및 삭제가 불가합니다.</li>
                                    <li>투표 종료시 참가자들의 투표가 중지 됩니다.</li>
                                </ul>
                                <div className="Button_Cotainer">
                                    <button className="Submit" onClick={() => Server_Send_Data(onClose)}>
                                        확인
                                    </button>
                                    <button className="Cancle" onClick={() => onClose()}>
                                        취소
                                    </button>
                                </div>
                            </div>
                        </ConFirmMainDivBox>
                    );
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const Server_Send_Data = async onClose => {
        try {
            const Data_Sending_Finished_Axios = await axios.post(`${process.env.REACT_APP_DB_HOST}/LocalPim/Pim_Room_Now_Match_Finished`, {
                Room_Keys,
            });

            if (Data_Sending_Finished_Axios.data.dataSuccess) {
                toast.show({
                    title: `PIM 로컬전을 대전 종료 하였습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
                onClose();
                history.push('/PIM');
            }
        } catch (error) {
            console.log(error);
            onClose();
            toast.show({
                title: `PIM 로컬전을 대전 종료 에러발생. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <AdminPrePareContainerMainDivBox>
            <BasicOngoingMainPage Room_Keys={Room_Keys}></BasicOngoingMainPage>
            {CheckingMaker ? (
                <div className="Button_Cotainer">
                    <button className="Submit" onClick={() => handleFinishedMatch()}>
                        대전 종료
                    </button>
                </div>
            ) : (
                <></>
            )}
        </AdminPrePareContainerMainDivBox>
    );
};

export default PimRoomOngoingContainer;
