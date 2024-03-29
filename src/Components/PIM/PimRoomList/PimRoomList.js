import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { TiThMenu } from 'react-icons/ti';
import { IoCloseSharp } from 'react-icons/io5';
import { RiPlayListAddLine } from 'react-icons/ri';
import { ChildButton, FloatingMenu, MainButton } from 'react-floating-button-menu';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { request } from '../../../API';

const PimRoomListMainDivBox = styled.div`
    .Local_Pim_Lists_Ul {
        @media only screen and (max-width: 800px) {
            padding: 0px;
            .Room_Title {
                font-size: 1em;
            }
            .Poistion_Right,
            .Room_Participate_Count {
                font-size: 0.7em;
            }
        }
        li {
            border: 1px solid lightgray;
            min-height: 70px;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 1px 1px 10px 1px gray;
            margin-top: 10px;
            margin-bottom: 10px;

            .Room_Container_List {
                position: relative;
                .Room_Title {
                }
                .Room_Maker {
                }
                .Room_Participate_Count {
                    margin-left: 30px;
                }
                .Poistion_Right {
                    position: absolute;
                    right: 10px;
                    top: 20%;
                    transform: translateY(-20%);
                    .Room_Maker {
                        margin-bottom: 10px;
                    }
                }
            }
            :hover {
                cursor: pointer;
                opacity: 0.6;
                transition: all 0.5s;
            }
        }

        .finished {
            position: relative;
            ::before {
                content: '';
                display: block;
                clear: both;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0px;
                left: 0px;
                opacity: 0.7;
                background-color: lightgray;
                z-index: 1;
                text-align: center;
            }
            .Finished_Text {
                position: absolute;
                top: 40%;
                left: 50%;
                font-size: 2em;
                font-weight: bolder;
                z-index: 2;
                transform: translate(-40%, -50%);
                @media only screen and (max-width: 800px) {
                    font-size: 1.5em;
                }
            }
        }
    }

    .FloatingMenu_Container {
        position: fixed;
        bottom: 40px;
        right: 40px;
        z-index: 10;
        /* @media only screen and (max-width: 800px) {
            display: none;
        } */
        a,
        li {
            background-color: #fff;
        }
    }
`;

const PimRoomList = () => {
    const history = useHistory();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [PimRoomData, setPimRoomData] = useState([]);
    const [FloatingMenuOnCheck, setFloatingMenuOnCheck] = useState(true);

    const GetRoomInfoData = async () => {
        try {
            const GetRoomData_Axios = await request.get(`/LocalPim/Pim_Room_Getting`, {
                params: {
                    id: LoginInfo.Login_id,
                },
            });

            if (GetRoomData_Axios.data.dataSuccess) {
                setPimRoomData(GetRoomData_Axios.data.Pim_Room_Getting_Rows);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleMoveRoom = data => {
        try {
            history.push(`/PIM/RoomEnter/${data.local_pim_room_info_room_key}/${data.local_pim_room_info_title}`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!LoginInfo.Login_id) {
            history.push('/Login_Page');
        } else {
            GetRoomInfoData();
        }
    }, []);

    return (
        <PimRoomListMainDivBox>
            <ul className="Local_Pim_Lists_Ul">
                {PimRoomData.map((list, i) => {
                    return (
                        <li
                            className={
                                list.finished_Check === 1 ||
                                list.local_pim_room_info_prepare_check === 0 ||
                                list.local_pim_room_info_finished_check === 1
                                    ? 'finished'
                                    : 'not_finished'
                            }
                            key={list.local_pim_participate_user_room_key}
                            onClick={() => handleMoveRoom(list)}
                        >
                            <div className="Room_Container_List">
                                <h3 className="Room_Title">{list.local_pim_room_info_title} </h3>

                                <div className="Room_Participate_Count">
                                    참가인원 : {list.brity_works_user_info_name} 외 {list.count - 1}명
                                </div>
                                <div className="Poistion_Right">
                                    <div className="Room_Maker">방장 : {list.brity_works_user_info_name}</div>
                                    <div className="Room_Date">
                                        날짜 : {moment(list.local_pim_room_info_date).format('YYYY-MM-DD HH:mm:ss')}
                                    </div>
                                </div>
                            </div>

                            {list.local_pim_room_info_finished_check === 1 ? (
                                <div className="Finished_Text">종료</div>
                            ) : list.local_pim_room_info_prepare_check === 0 ? (
                                <div className="Finished_Text">준비중</div>
                            ) : (
                                <></>
                            )}
                        </li>
                    );
                })}
            </ul>
            {/* 플로팅 메뉴바 컴포넌트 */}
            <div className="FloatingMenu_Container">
                <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={FloatingMenuOnCheck}>
                    <MainButton
                        iconResting={<TiThMenu style={{ fontSize: 20 }} nativecolor="white" />}
                        iconActive={<IoCloseSharp style={{ fontSize: 20 }} nativecolor="white" color="black" />}
                        // backgroundColor="black"
                        onClick={() => setFloatingMenuOnCheck(!FloatingMenuOnCheck)}
                        size={56}
                    ></MainButton>
                    <ChildButton
                        icon={<RiPlayListAddLine style={{ fontSize: 20 }} nativecolor="black" />}
                        // backgroundColor="white"
                        size={40}
                        onClick={() => history.push('/PIM/PIMApplyRoom')}
                    />
                </FloatingMenu>
            </div>
        </PimRoomListMainDivBox>
    );
};
export default PimRoomList;
