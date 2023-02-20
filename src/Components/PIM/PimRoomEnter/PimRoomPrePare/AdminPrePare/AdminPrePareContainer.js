import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AiTwotoneDelete } from 'react-icons/ai';
import moment from 'moment';
import uuid from 'react-uuid';
import Modal from 'react-modal';
import UserSelectModal from './UserSelectModal/UserSelectModal';
import RandomUserSelectModal from './UserSelectModal/RandomUserSelectModal';
import { BsPlusLg } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { BiEdit } from 'react-icons/bi';
import ParticipateModal from './UserSelectModal/ParticipageModal';
import { toast } from '../../../../ToasMessage/ToastManager';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { request } from '../../../../../API';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px',
        minHeight: '300px',
        width: '90%',
        maxHeight: '90%',
    },
};
Modal.setAppElement('#SelectModal');

export const AdminPrePareContainerMainDivBox = styled.div`
    max-width: 500px;
    width: 100%;
    .Fight_Box {
        position: relative;
        margin-top: 80px;
    }
    .Fighter_Container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        text-align: center;
        .Fighter_Container_Blue {
            border: 2px dashed blue;
            padding: 10px;
            width: 45%;
            border-radius: 10px;
            min-height: 80px;
            .Fighter_Title {
                h5 {
                    margin: 0px;
                    padding: 0px;
                    margin-bottom: 5px;
                }
            }
            .Fighter_User {
            }
        }
        .Fighter_Container_Middle {
            width: 5%;
            font-weight: bolder;
        }
        .Fighter_Container_Red {
            border: 2px dashed red;
            padding: 10px;
            width: 45%;
            border-radius: 10px;
            min-height: 80px;
        }
    }

    .Nothing_User_Plus_Icon {
        position: relative;
        height: 100%;
        width: 100%;
        .Nothing_User_Plus_Icon_Plus {
            content: '+';
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 100%;
            width: 100%;
            font-size: 3em;
            opacity: 0.5;
            :hover {
                opacity: 1;
                transition: all 0.5s;
                cursor: pointer;
            }
        }
        :hover {
            cursor: pointer;
            background-color: darkgray;
        }
    }

    .Fighter_Team_Division {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: -70px;
        width: 100%;
        border-bottom: 2px double black;

        h3 {
            width: 45%;
            text-align: center;
        }
    }
    .BookingCheck_Cotainer {
        display: flex;
        align-items: center;
        .BookingCheck_Cotainer_Title {
            min-width: 140px;
        }
        .BookingCheck_Cotainer_SubTitle {
            width: 100%;
            label {
                :hover {
                    cursor: pointer;
                }
            }
        }
    }
    .Matched_container {
        position: relative;
        border-bottom: 1px solid gray;
        padding-bottom: 40px;
        .Delete_Icons {
            position: absolute;
            top: 20px;
            right: 10px;
            color: red;
            :hover {
                cursor: pointer;
                color: black;
            }
        }
    }

    .User_Insert_Container {
        position: relative;
        .User_Deleted {
            position: absolute;
            top: -20px;
            right: 15px;
            font-weight: bolder;
            color: red;
            :hover {
                cursor: pointer;
            }
        }
    }

    .Button_Cotainer {
        max-width: 500px;
        width: 100%;
        text-align: center;
        margin-top: 50px;
        margin-bottom: 50px;
        button {
            width: 120px;
            height: 40px;
            border: none;
            font-weight: bolder;
            font-size: 1.1em;
            border-radius: 5px;
            :hover {
                cursor: pointer;
            }
            @media only screen and (max-width: 800px) {
                width: 90px !important;
                font-size: 0.9em;
            }
        }
        .Cancle {
            background-color: orange;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: orange;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
        .Delete {
            background-color: red;
            margin-left: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: red;
            }
            @media only screen and (max-width: 800px) {
                margin-left: 10px;
            }
        }
        .Submit {
            background-color: green;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: green;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
    }

    .Match_Add_Button {
        button {
            width: 100%;
            min-height: 42px;
            font-size: 2em;
            font-weight: bolder;
            border: none;
            padding: 10px;
            border-radius: 10px;
            :hover {
                cursor: pointer;
                background-color: darkgray;
                color: white;

                transition: all ease-in-out 0.3s;
            }
        }
        width: 100%;
        min-height: 42px;
        font-weight: bolder;
        border: none;
        padding: 10px;
        border-radius: 10px;
    }
    .basic-single {
        width: 100%;
    }

    .Can_Selected_List_Container_Box {
        border: 1px dotted lightgray;
        margin-bottom: 30px;
        position: relative;
        .User_Edit_Button {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.5em;
            :hover {
                cursor: pointer;
                opacity: 0.5;
            }
        }
        h4 {
            margin-top: 0px;
            margin-left: 10px;
        }
        .Can_Selected_List_Container {
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    border: 0.5px dashed black;
                    margin: 10px;
                    text-align: center;
                    width: 100px;
                    padding: 10px;
                    font-weight: bolder;
                }
            }
        }
    }
    .List_Move_Container {
        display: flex;
        align-items: center;
        .List_Move {
            :hover {
                cursor: pointer;
                color: darkgray;
            }
        }
        .List_Move_Advance {
            margin-left: 40px;
            ul {
                li {
                    list-style: disc;
                }
            }
        }
    }
`;
export const ConFirmMainDivBox = styled.div`
    background-color: #efefef;
    padding: 40px;
    border-radius: 5px;
    ul {
        li {
            list-style: square;
            margin-bottom: 20px;
            font-size: 1em;
        }
    }

    .Button_Cotainer {
        max-width: 500px;
        width: 100%;
        text-align: center;
        margin-top: 50px;
        margin-bottom: 50px;
        button {
            width: 120px;
            height: 40px;
            border: none;
            font-weight: bolder;
            font-size: 1.1em;
            border-radius: 5px;
            :hover {
                cursor: pointer;
            }
            @media only screen and (max-width: 800px) {
                width: 90px !important;
                font-size: 0.9em;
            }
        }

        .Cancle {
            background-color: orange;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: orange;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
        .Delete {
            background-color: red;
            margin-left: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: red;
            }
            @media only screen and (max-width: 800px) {
                margin-left: 10px;
            }
        }
        .Submit {
            background-color: green;
            margin-right: 30px;
            color: #fff;
            :hover {
                background-color: #efefef;
                color: green;
            }
            @media only screen and (max-width: 800px) {
                margin-right: 10px;
            }
        }
    }
`;

const AdminPrePareContainer = ({ Room_Keys }) => {
    const history = useHistory();
    const handleMov = useRef(null);
    const [MatchState, setMatchState] = useState([]);
    const [ParticipateModalOpen, setParticipateModalOpen] = useState(false);
    const [UserSelectModalOpen, setUserSelectModalOpen] = useState(false);
    const [RandomUserSelectModalOpen, setRandomUserSelectModalOpen] = useState(false);
    const [SelectedData, setSelectedData] = useState(null);
    const [SelectedTeam, setSelectedTeam] = useState(null);
    const [Now_Room_User, setNow_Room_User] = useState([]);
    const [RoomDetailInfoData, setRoomDetailInfoData] = useState({
        Select_Room_Keys: Room_Keys,
        VideoRoom: {
            Checked: false,
            VideoRoomURL: '',
        },
        RoomState_PrePare: false,
        RoomState_Finished: false,
        RoomState_Ongoing: false,
    });

    const handleClickMatches = () => {
        try {
            const Randoms = uuid().split('-');
            const ClciksData = {
                Room_Keys: `${moment().format('YYYYMMDDHHmmss')}${Randoms[0] + Randoms[1] + Randoms[2]} `,
                Blue_Fighter: null,
                Blue_Fighter_ID: null,
                Red_Fighter: null,
                Red_Fighter_ID: null,
            };
            setMatchState(MatchState.concat(ClciksData));
            if (handleMov.current) {
                console.log(handleMov);
                handleMov.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteRoom = data => {
        setMatchState(MatchState.filter(list => list.Room_Keys !== data.Room_Keys));
    };

    const HandleClicksUserClick = (data, teams) => {
        setUserSelectModalOpen(true);
        setSelectedData(data);
        setSelectedTeam(teams);
    };
    const handleDeleteUser = (data, teams) => {
        if (teams === 'Blue') {
            const ChangeData = MatchState.map(list =>
                list.Room_Keys === data.Room_Keys ? { ...list, Blue_Fighter: null, Blue_Fighter_ID: null } : list
            );

            setMatchState(ChangeData);
        } else {
            const ChangeData = MatchState.map(list =>
                list.Room_Keys === data.Room_Keys ? { ...list, Red_Fighter: null, Red_Fighter_ID: null } : list
            );

            setMatchState(ChangeData);
        }
    };

    const handleClicksRandomUser = () => {
        setRandomUserSelectModalOpen(true);
    };

    const HandleSaveData = async () => {
        if (MatchState.length === 0) {
            toast.show({
                title: `대전을 추가 한 이후에 다시 시도 해 주세요.`,
                successCheck: false,
                duration: 4000,
            });
            return;
        }

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <ConFirmMainDivBox>
                        <div className="custom-ui">
                            <h2>주의사항</h2>
                            <ul>
                                <li>저장과 동시에 투표가 개시됩니다.</li>
                                <li>저장과 동시에 수정 및 삭제가 불가합니다.</li>
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
    };

    const Server_Send_Data = async onClose => {
        try {
            const RoomDetailInfo_Send_Axios = await request.post(`/LocalPim/Pim_Room_Info_Detail_Send`, {
                Room_Keys,
                RoomDetailInfoData,
                MatchState,
            });

            if (RoomDetailInfo_Send_Axios.data.dataSuccess) {
                RoomInfoDataGetting();
                onClose();
                history.push('/PIM');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const RoomInfoDataGetting = async () => {
        try {
            const RoomInfoData_Getting_Axios = await request.get(`/LocalPim/Pim_Room_Getting_Info_Data`, {
                params: {
                    Room_Keys,
                },
            });

            if (RoomInfoData_Getting_Axios.data.dataSuccess) {
                setRoomDetailInfoData(data => ({
                    ...data,
                    RoomState_PrePare:
                        RoomInfoData_Getting_Axios.data.RoomInfoData_Rows[0].local_pim_room_info_prepare_check === 0 ? true : false,
                    RoomState_Finished:
                        RoomInfoData_Getting_Axios.data.RoomInfoData_Rows[0].local_pim_room_info_finished_check === 1 ? true : false,
                    RoomState_Ongoing:
                        RoomInfoData_Getting_Axios.data.RoomInfoData_Rows[0].local_pim_room_info_finished_check === 0 &&
                        RoomInfoData_Getting_Axios.data.RoomInfoData_Rows[0].local_pim_room_info_prepare_check === 1
                            ? true
                            : false,
                    VideoRoom: {
                        Checked:
                            RoomInfoData_Getting_Axios.data.RoomInfoData_Rows[0].local_pim_room_info_meeting_check === 1 ? true : false,
                        VideoRoomURL:
                            RoomInfoData_Getting_Axios.data.RoomInfoData_Rows[0].local_pim_room_info_meeting_check === 1
                                ? `https://ecomet11.disco.co.jp/DHKS/PIM/${Room_Keys}`
                                : '',
                    },
                }));
                setNow_Room_User(RoomInfoData_Getting_Axios.data.RoomInfoData_User_Data_Rows);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        RoomInfoDataGetting();
    }, []);

    return (
        <AdminPrePareContainerMainDivBox>
            <div className="List_Move_Container">
                <h2 className="List_Move" onClick={() => history.push('/PIM')}>
                    <FaArrowLeft></FaArrowLeft>
                </h2>
                <div className="List_Move_Advance">
                    <div>* 주의사항</div>
                    <ul style={{ fontSize: '0.7em', paddingLeft: '10px', marginTop: '5px' }}>
                        <li>저장과 동시에 투표가 개시됩니다.</li>
                        <li>저장과 동시에 수정 및 삭제가 불가합니다.</li>
                    </ul>
                </div>
            </div>

            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">방 상태 : </h4>
                <div className="BookingCheck_Cotainer_SubTitle">
                    {RoomDetailInfoData.RoomState_PrePare ? <h2>준비중</h2> : ''}
                    {RoomDetailInfoData.RoomState_Finished ? <h2>투표종료</h2> : ''}
                    {RoomDetailInfoData.RoomState_Ongoing ? <h2>투표 진행중</h2> : ''}
                </div>
            </div>
            <div className="Can_Selected_List_Container_Box">
                <div className="User_Edit_Button" onClick={() => setParticipateModalOpen(true)}>
                    <span>
                        <BiEdit></BiEdit>
                    </span>
                </div>
                <h4 style={{ marginTop: '10px' }}>현재 방 참가 인원 ( {Now_Room_User.length}명 )</h4>

                <div className="Can_Selected_List_Container">
                    <ul>
                        {Now_Room_User.map(list => {
                            return (
                                <li key={list.brity_works_user_info_id}>
                                    <div>{list.brity_works_user_info_name}</div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {MatchState.length > 0 ? (
                <>
                    <div className="BookingCheck_Cotainer">
                        <h4 className="BookingCheck_Cotainer_Title">랜덤대결 : </h4>
                        <div className="BookingCheck_Cotainer_SubTitle">
                            <button onClick={() => handleClicksRandomUser()}>Random 대결</button>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
            <div className="Fight_Box">
                <div className="Fighter_Team_Division">
                    <h3 style={{ color: 'blue' }}>Blue 팀</h3>
                    <h3 style={{ color: 'red' }}>Red 팀</h3>
                </div>
                {MatchState.map((list, i) => {
                    return (
                        <div className="Matched_container" key={list.Room_Keys}>
                            <h2>{i + 1}</h2>
                            <div className="Fighter_Container">
                                <div className="Fighter_Container_Blue">
                                    {list.Blue_Fighter || list.Blue_Fighter_ID ? (
                                        <div className="User_Insert_Container">
                                            <div className="User_Deleted" onClick={() => handleDeleteUser(list, 'Blue')}>
                                                X
                                            </div>
                                            <h5 className="Fighter_Title">{list.Blue_Fighter}</h5>
                                            <div className="Fighter_User">{list.Blue_Fighter_ID}</div>
                                        </div>
                                    ) : (
                                        <div className="Nothing_User_Plus_Icon" onClick={() => HandleClicksUserClick(list, 'Blue')}>
                                            <div className="Nothing_User_Plus_Icon_Plus">+</div>
                                        </div>
                                    )}
                                </div>
                                <div className="Fighter_Container_Middle"> VS </div>
                                <div className="Fighter_Container_Red">
                                    {list.Red_Fighter || list.Red_Fighter_ID ? (
                                        <div className="User_Insert_Container">
                                            <div className="User_Deleted" onClick={() => handleDeleteUser(list, 'Red')}>
                                                X
                                            </div>
                                            <h5 className="Fighter_Title">{list.Red_Fighter}</h5>
                                            <div className="Fighter_User">{list.Red_Fighter_ID}</div>
                                        </div>
                                    ) : (
                                        <div className="Nothing_User_Plus_Icon" onClick={() => HandleClicksUserClick(list, 'Red')}>
                                            <div className="Nothing_User_Plus_Icon_Plus">+</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="Delete_Icons" onClick={() => handleDeleteRoom(list)}>
                                <AiTwotoneDelete></AiTwotoneDelete>
                            </div>
                        </div>
                    );
                })}
                <div className="Match_Add_Button">
                    <button onClick={() => handleClickMatches()}>
                        <BsPlusLg></BsPlusLg>
                    </button>
                </div>
            </div>
            <div className="Button_Cotainer">
                <button
                    className="Submit"
                    onClick={() => {
                        HandleSaveData();
                    }}
                >
                    저장
                </button>
                <button className="Cancle" onClick={() => history.push('/PIM')}>
                    취소
                </button>
            </div>
            <Modal isOpen={ParticipateModalOpen} style={customStyles} contentLabel="Select Modal">
                <ParticipateModal
                    setParticipateModalOpen={() => setParticipateModalOpen(false)}
                    Room_Keys={Room_Keys}
                    Now_Room_User={Now_Room_User}
                    setNow_Room_User={data => setNow_Room_User(data)}
                ></ParticipateModal>
            </Modal>
            <Modal isOpen={UserSelectModalOpen} style={customStyles} contentLabel="Select Modal">
                <UserSelectModal
                    setUserSelectModalOpen={() => setUserSelectModalOpen(false)}
                    Room_Keys={Room_Keys}
                    SelectedTeam={SelectedTeam}
                    SelectedData={SelectedData}
                    setMatchState={data => setMatchState(data)}
                    MatchState={MatchState}
                    setSelectedData={() => setSelectedData(null)}
                    setSelectedTeam={() => setSelectedTeam(null)}
                ></UserSelectModal>
            </Modal>
            <Modal isOpen={RandomUserSelectModalOpen} style={customStyles} contentLabel="Select Modal">
                <RandomUserSelectModal
                    setRandomUserSelectModalOpen={() => setRandomUserSelectModalOpen(false)}
                    Room_Keys={Room_Keys}
                    SelectedTeam={SelectedTeam}
                    SelectedData={SelectedData}
                    setMatchState={data => setMatchState(data)}
                    MatchState={MatchState}
                    setSelectedData={() => setSelectedData(null)}
                    setSelectedTeam={() => setSelectedTeam(null)}
                ></RandomUserSelectModal>
            </Modal>
            <div ref={handleMov}></div>
        </AdminPrePareContainerMainDivBox>
    );
};

export default AdminPrePareContainer;
