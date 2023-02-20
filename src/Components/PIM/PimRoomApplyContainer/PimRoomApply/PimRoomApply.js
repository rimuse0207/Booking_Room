import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Select from 'react-select';
import axios from 'axios';
import { TiUserAdd, TiUserDelete } from 'react-icons/ti';
import { useHistory } from 'react-router-dom';
import { toast } from '../../../ToasMessage/ToastManager';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { request } from '../../../../API';
const PimRoomApplyMainDivBox = styled.div`
    .BookingCheck_Cotainer {
        display: flex;
        align-items: center;
        @media only screen and (max-width: 800px) {
            display: block;
            width: 90%;
        }

        .BookingCheck_Cotainer_Title {
            width: 130px;
            font-size: 1.1em;
            @media only screen and (max-width: 800px) {
                display: block;
                width: 90%;
            }
        }
        .BookingCheck_Cotainer_SubTitle {
            min-width: 500px;
            border: 1px solid lightgray;
            height: 40px;
            line-height: 42px;
            padding-left: 15px;
            border-radius: 5px;
            position: relative;
            input {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0px;
                top: 0px;
                border: none;
                padding-left: 15px;
                border-radius: 5px;
                :focus {
                    outline: 2px solid #2684ff;
                }
            }
            @media only screen and (max-width: 800px) {
                display: block;
                width: 100% !important;
                min-width: 0px;
            }
        }

        .basic-single {
            max-width: 500px;
            height: 40px;
            width: 100%;
        }
    }

    .BookingCheck_Cotainer_SubTitle2 {
        max-width: 640px;
        margin-top: 30px;
        width: 100%;
        .Select_Container {
            ::after {
                clear: both;
                display: block;
                content: '';
            }
            .Select_Left {
                float: left;
                border: 1px dashed gray;
                width: 45%;
                height: 300px;
                overflow: auto;
                h4 {
                    padding: 10px;
                    border-bottom: 1px dashed gray;
                    padding-top: 0px;
                    position: sticky;
                    background: #fff;
                    top: 0px;
                }
                @media only screen and (max-width: 800px) {
                    display: none;
                }
                .Add_User_Click {
                    :hover {
                        cursor: pointer;
                        opacity: 0.7;
                        .user_icons {
                            color: green;
                        }
                    }
                }
            }
            .Select_Right {
                float: right;
                border: 1px dashed black;
                width: 45%;
                height: 300px;
                overflow: auto;
                h4 {
                    padding: 10px;
                    border-bottom: 1px dashed gray;
                    padding-top: 0px;
                    position: sticky;
                    background: #fff;
                    top: 0px;
                }
                @media only screen and (max-width: 800px) {
                    float: left;
                    width: 100%;
                }

                .Add_User_Click {
                    :hover {
                        cursor: pointer;
                        opacity: 0.7;
                        .user_icons {
                            color: red;
                        }
                    }
                }
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

    .Select_Show_User_Lists {
        ul {
            padding-left: 10px;
            padding-right: 10px;
            li {
                display: flex;
                justify-content: space-between;
                border: 1px solid black;
                margin-top: 5px;
                margin-bottom: 5px;
                padding: 10px;
            }
        }
    }

    .VideoClickRoom {
        color: #368;
        font-weight: bolder;
        padding-bottom: 5px;
        margin-left: 20px;
        :hover {
            color: gray;
        }
    }
`;
const PimRoomApply = () => {
    const handleChangeRef = useRef(null);
    const history = useHistory();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [RoomInfoData, setRoomInfoData] = useState({
        team_name: '',
        title: '',
        VideoCheck: false,
    });
    const [SelectLeftHeaderInfo, setSelectLeftHeaderInfo] = useState(null);
    const [LeftHeaderInfo, setLeftHeaderInfo] = useState([]);
    const [SelectedLists, setSelectedLists] = useState([
        { label: `${LoginInfo.Login_name} || ${LoginInfo.Login_id}`, value: LoginInfo.Login_id },
    ]);

    //사용자 인원 조회
    const GetPersonData = async () => {
        try {
            const GetPersonData_Axios = await request.get(`/LocalPim/Pim_Preson_Getting`);

            if (GetPersonData_Axios.data.dataSuccess) {
                const datas = GetPersonData_Axios.data.Select_Data.filter(list => list.value !== LoginInfo.Login_id);
                setLeftHeaderInfo(datas);
            } else {
                alert('error발생.');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Select창 엔터 시
    const InsertSelectData = data => {
        if (data) {
            setSelectedLists(SelectedLists.concat(data));
            setLeftHeaderInfo(LeftHeaderInfo.filter(user => user.value !== data.value));
        }
    };

    //마우스 User 선택 시 (선택가능 인원 -> 선택된 인원)
    const handleUserAdd = data => {
        setSelectedLists(SelectedLists.concat(data));
        setLeftHeaderInfo(LeftHeaderInfo.filter(user => user.value !== data.value));
    };

    //마우스 User 선택 시 (선택 된 인원 -> 선택가능 인원)
    const handleUserMinus = data => {
        if (data.value === LoginInfo.Login_id) {
            toast.show({
                title: `자기자신을 삭제 할 수 없습니다.`,
                successCheck: false,
                duration: 4500,
            });
            return;
        }
        const Concat_Data = LeftHeaderInfo.concat(data);

        setSelectedLists(SelectedLists.filter(user => user.value !== data.value));
        let pensByColors = Concat_Data.sort((a, b) => {
            if (a.value > b.value) return 1;
            if (a.value < b.value) return -1;
            return 0;
        });
        setLeftHeaderInfo(pensByColors);
    };

    //Room생성
    const handleCreateRoom = async () => {
        if (!RoomInfoData.team_name || !RoomInfoData.title) {
            toast.show({
                title: `공란을 전부 입력 해주세요.`,
                successCheck: false,
                duration: 4500,
            });
            return;
        } else if (SelectedLists.length < 2) {
            toast.show({
                title: `참가인원을 선택 해주세요.`,
                successCheck: false,
                duration: 4500,
            });

            return;
        }
        try {
            const Sending_Room_Info_Data_Axios = await request.post(`/LocalPim/Pim_Room_Info_Data`, {
                RoomInfoData,
                LoginInfo,
                SelectedLists,
            });

            if (Sending_Room_Info_Data_Axios.data.dataSuccess) {
                toast.show({
                    title: `방을 생성하였습니다.`,
                    successCheck: true,
                    duration: 4500,
                });
                history.push(`/PIM/RoomEnter/${Sending_Room_Info_Data_Axios.data.RoomKeys}/${RoomInfoData.title}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //Room생성 취소
    const handleCancleRoom = async () => {
        confirmAlert({
            title: '정말 취소하시겠습니까?',
            message: '확인 시 기존 데이터는 사라집니다.',
            buttons: [
                {
                    label: '확인',
                    onClick: () => history.push('/PIM'),
                },
                {
                    label: '취소',
                },
            ],
        });
    };

    useEffect(() => {
        GetPersonData();
    }, []);

    return (
        <PimRoomApplyMainDivBox>
            <div>
                <h2>PIM로컬전 방생성</h2>
            </div>
            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">방생성자 : </h4>
                <div className="BookingCheck_Cotainer_SubTitle">{LoginInfo.Login_name}</div>
            </div>
            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">팀명 : </h4>
                <div className="BookingCheck_Cotainer_SubTitle">
                    <input
                        placeholder="PIM 팀명"
                        value={RoomInfoData.team_name}
                        onChange={e => setRoomInfoData({ ...RoomInfoData, team_name: e.target.value })}
                    ></input>
                </div>
            </div>

            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">로컬전 제목 : </h4>
                <div className="BookingCheck_Cotainer_SubTitle">
                    <input
                        placeholder="로컬전 제목"
                        value={RoomInfoData.title}
                        onChange={e => setRoomInfoData({ ...RoomInfoData, title: e.target.value })}
                    ></input>
                </div>
            </div>

            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">화상회의 만들기: </h4>
                <div className="BookingCheck_Cotainer_SubTitle2" style={{ marginTop: '0px' }}>
                    <label name="Yes" style={{ marginRight: '20px' }}>
                        <input
                            type="radio"
                            name="Video"
                            value="Yes"
                            checked={RoomInfoData.VideoCheck}
                            onChange={() => setRoomInfoData({ ...RoomInfoData, VideoCheck: true })}
                        ></input>
                        예
                    </label>
                    <label name="No">
                        <input
                            type="radio"
                            name="Video"
                            value="No"
                            checked={!RoomInfoData.VideoCheck}
                            onChange={() => setRoomInfoData({ ...RoomInfoData, VideoCheck: false })}
                        ></input>
                        아니오
                    </label>
                </div>
            </div>
            <div className="BookingCheck_Cotainer">
                {RoomInfoData.VideoCheck ? <div className="VideoClickRoom">회의실 접속은 URL로 생성됩니다.</div> : <></>}
            </div>

            <div className="BookingCheck_Cotainer">
                <h4 className="BookingCheck_Cotainer_Title">참가인원 : </h4>

                <Select
                    ref={handleChangeRef}
                    className="basic-single"
                    classNamePrefix="이쪽에서 선택 해주세요."
                    value={SelectLeftHeaderInfo}
                    isClearable={true}
                    isSearchable={true}
                    name="Person"
                    options={LeftHeaderInfo}
                    placeholder={'인원을 선택 해주세요.'}
                    onChange={value => InsertSelectData(value)}
                />
            </div>
            <div className="BookingCheck_Cotainer">
                <div className="BookingCheck_Cotainer_SubTitle2">
                    <div className="Select_Container">
                        <div className="Select_Left">
                            <h4>선택가능 인원</h4>
                            <div className="Select_Show_User_Lists">
                                <ul>
                                    {LeftHeaderInfo.map((list, i) => {
                                        return (
                                            <li className="Add_User_Click" onClick={() => handleUserAdd(list)} key={list.value}>
                                                <div>{list.label}</div>
                                                <div className="user_icons">
                                                    <TiUserAdd></TiUserAdd>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="Select_Right">
                            <h4>선택한 인원 ( {SelectedLists.length} )</h4>
                            <div className="Select_Show_User_Lists">
                                <ul>
                                    {SelectedLists.map((list, i) => {
                                        return (
                                            <li className="Add_User_Click" onClick={() => handleUserMinus(list)} key={list.value}>
                                                <div>{list.label}</div>
                                                <div className="user_icons">
                                                    <TiUserDelete></TiUserDelete>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Button_Cotainer">
                <button className="Submit" onClick={() => handleCreateRoom()}>
                    생성
                </button>
                <button className="Cancle" onClick={() => handleCancleRoom()}>
                    취소
                </button>
            </div>
        </PimRoomApplyMainDivBox>
    );
};

export default PimRoomApply;
