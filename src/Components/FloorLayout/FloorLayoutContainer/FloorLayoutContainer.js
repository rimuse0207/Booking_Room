import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';
import TableLayout from './FloorLayoutContent/TableLayout';
import ChairLayout from './FloorLayoutContent/ChairLayout';
import RoomLayout from './FloorLayoutContent/RoomLayout';
import WindowLayout from './FloorLayoutContent/WindowLayout';
import FloorLayoutModal from './FloorLayoutModals/FloorLayoutModal';
import { Axios_Get_Moduls, Axios_Post_Moduls, request } from '../../../API';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from '../../ToasMessage/ToastManager';
const FloorLayoutContainerMainDivBox = styled.div`
    margin-top: 10px;
    padding: 10px;
    min-height: 100vh;
    margin-bottom: 100px;
    button {
        margin-right: 10px;
        margin-left: 10px;
    }
    .Company_Division {
        min-height: 100vh;
        margin-top: 10px;
        border: 1px dashed gray;
        width: 1096px;
        border-right: none;
        border-left: none;
    }
    .box {
        position: absolute;
        cursor: move;
        color: black;
        border-radius: 5px;

        margin: auto;
        user-select: none;
        border: 2px solid black;
    }
    .SaveButton_container {
        position: fixed;
        top: 80px;
        right: 20px;
        width: 100px;
        height: 50px;
    }
    .Company_Division_Container {
        display: flexbox;
        overflow: auto;
        .Company_Division {
        }
    }
`;

const FloorLayoutContainer = () => {
    const history = useHistory();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [PlaceState, setPlaceState] = useState([]);
    const [Place_Chair_State, setPlace_Chair_State] = useState([]);
    const [Place_Room_State, setPlace_Room_State] = useState([]);
    const [Place_Window_State, setPlace_Window_State] = useState([]);
    const [Selected_Data, setSelected_Data] = useState(null);
    const [Delete_Data, setDelete_Data] = useState([]);

    //책상 추가
    const TableAdd = () => {
        const RandomCode = uuid();
        setPlaceState(
            PlaceState.concat({
                type: 'table',
                width: 50,
                height: 80,
                state_id: RandomCode,
                PositionX: 1200,
                PositionY: -70,
                user_id: '',
                memo: '',
                team: '',
                name: '',
            })
        );
    };

    //의자 추가
    const ChairAdd = () => {
        const RandomCode = uuid();
        setPlace_Chair_State(
            Place_Chair_State.concat({
                type: 'chair',
                width: 10,
                height: 10,
                state_id: RandomCode,
                PositionX: 1200,
                PositionY: -70,
                user_id: '',
                memo: '',
                team: '',
                name: '',
            })
        );
    };

    //회의실 추가
    const RoomAdd = () => {
        const RandomCode = uuid();
        setPlace_Room_State(
            Place_Room_State.concat({
                type: 'room',
                width: 140,
                height: 70,
                state_id: RandomCode,
                PositionX: 1200,
                PositionY: -70,
                user_id: '',
                memo: '',
                team: '',
                name: '',
            })
        );
    };

    //창문 추가
    const WindoAdd = () => {
        const RandomCode = uuid();
        setPlace_Window_State(
            Place_Window_State.concat({
                type: 'Window',
                width: 1,
                height: 100,
                state_id: RandomCode,
                PositionX: 1200,
                PositionY: -70,
                user_id: '',
                memo: '',
                team: '',
                name: '',
            })
        );
    };

    //저장

    const handleSave = async () => {
        try {
            const handleSave_data_Axios = await Axios_Post_Moduls(`/users/Floor_Layout_Save`, {
                PlaceState,
                Place_Chair_State,
                Place_Room_State,
                Place_Window_State,
                Delete_Data,
            });

            if (handleSave_data_Axios) {
                alert('저장 되었습니다.');
            } else {
                toast.show({
                    title: `IT팀에게 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Get_Floor_Room_Position = async () => {
        try {
            const Get_Floor_Room_Position_State_Axios = await Axios_Get_Moduls('/users/Get_Floor_Room_Position_State', {});

            if (Get_Floor_Room_Position_State_Axios) {
                setPlaceState(Get_Floor_Room_Position_State_Axios.PlaceState);
                setPlace_Chair_State(Get_Floor_Room_Position_State_Axios.Place_Chair_State);
                setPlace_Room_State(Get_Floor_Room_Position_State_Axios.Place_Room_State);
                setPlace_Window_State(Get_Floor_Room_Position_State_Axios.Place_Window_State);
            } else
                toast.show({
                    title: `IT팀에게 문의바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (LoginInfo.Login_token) {
            if (LoginInfo.Login_Admin_Access) {
                Get_Floor_Room_Position();
            } else {
                alert('권한이 없습니다.');
                history.push('/FloorLayout');
            }
        } else {
            history.push('/Login_Page');
        }
    }, []);

    return (
        <FloorLayoutContainerMainDivBox>
            <button onClick={() => TableAdd()}>책상</button>
            <button onClick={() => ChairAdd()}>의자</button>
            <button onClick={() => RoomAdd()}>회의실</button>
            <button onClick={() => WindoAdd()}>선</button>
            <div className="Company_Division_Container">
                <div className="Company_Division">
                    <h2>DHKS 8F 자리 배치도</h2>
                    <div className="" style={{ position: 'relative' }}>
                        {PlaceState.map(list => {
                            return (
                                <TableLayout
                                    key={list.state_id}
                                    PlaceState={PlaceState}
                                    list={list}
                                    setPlaceState={data => setPlaceState(data)}
                                    setSelected_Data={data => setSelected_Data(data)}
                                    setDelete_Data={data => setDelete_Data(data)}
                                    Delete_Data={Delete_Data}
                                ></TableLayout>
                            );
                        })}
                        {Place_Chair_State.map(list => {
                            return (
                                <ChairLayout
                                    key={list.state_id}
                                    PlaceState={Place_Chair_State}
                                    list={list}
                                    setPlaceState={data => setPlace_Chair_State(data)}
                                    setSelected_Data={data => setSelected_Data(data)}
                                    setDelete_Data={data => setDelete_Data(data)}
                                    Delete_Data={Delete_Data}
                                ></ChairLayout>
                            );
                        })}
                        {Place_Room_State.map(list => {
                            return (
                                <RoomLayout
                                    key={list.state_id}
                                    PlaceState={Place_Room_State}
                                    list={list}
                                    setPlaceState={data => setPlace_Room_State(data)}
                                    setSelected_Data={data => setSelected_Data(data)}
                                    setDelete_Data={data => setDelete_Data(data)}
                                    Delete_Data={Delete_Data}
                                ></RoomLayout>
                            );
                        })}
                        {Place_Window_State.map(list => {
                            return (
                                <WindowLayout
                                    key={list.state_id}
                                    PlaceState={Place_Window_State}
                                    list={list}
                                    setPlaceState={data => setPlace_Window_State(data)}
                                    setSelected_Data={data => setSelected_Data(data)}
                                    setDelete_Data={data => setDelete_Data(data)}
                                    Delete_Data={Delete_Data}
                                ></WindowLayout>
                            );
                        })}
                    </div>
                </div>
                <FloorLayoutModal
                    list={Selected_Data}
                    setPlaceState={data => setPlaceState(data)}
                    PlaceState={PlaceState}
                    setSelected_Data={setSelected_Data}
                    setPlace_Room_State={data => setPlace_Room_State(data)}
                    Place_Room_State={Place_Room_State}
                ></FloorLayoutModal>
                <div className="SaveButton_container">
                    <button onClick={() => handleSave()}>저장</button>
                </div>
                <div className="Company_Division">
                    <h2>DHK 8F 자리 배치도</h2>
                </div>
            </div>
        </FloorLayoutContainerMainDivBox>
    );
};

export default FloorLayoutContainer;
