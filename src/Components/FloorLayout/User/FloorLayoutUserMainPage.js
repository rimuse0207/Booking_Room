import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { request } from '../../../API';
import { Loader_Check_For_False, Loader_Check_For_True } from '../../../Models/LoaderCheckReducer/LoaderCheckReducer';
import LoaderMainPage from '../../Loader/LoaderMainPage';
import FloorLayoutUserContent from './FloorLayoutUserContent/FloorLayoutUserContent';
import FloorLayoutUserSelect from './FloorLayoutUserSelect/FloorLayoutUserSelect';

const FloorLayoutUserMainPageMainDivBox = styled.div`
    overflow: auto;
    padding: 10px;
    height: 90vh;
    ::-webkit-scrollbar {
        width: 5px;
        height: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #368;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
        background-color: grey;
        border-radius: 10px;
        box-shadow: inset 0px 0px 2px white;
    }
`;

const FloorLayoutUserMainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const Loading = useSelector(state => state.LoaderCheckingRedux.loading);
    const [PlaceState, setPlaceState] = useState([]);
    const [UserSelect, setUserSelect] = useState(null);
    const Get_Floor_Room_Position = async () => {
        dispatch(Loader_Check_For_True());
        try {
            const Get_Floor_Room_Position_State_Axios = await request.get(`/users/User_Get_Floor_Room_Position_State`);
            if (Get_Floor_Room_Position_State_Axios.data.dataSuccess) {
                setPlaceState(Get_Floor_Room_Position_State_Axios.data.PlaceState);
                dispatch(Loader_Check_For_False());
            }
        } catch (error) {
            console.log(error);
            dispatch(Loader_Check_For_False());
        }
    };

    useEffect(() => {
        if (LoginInfo.Login_token) {
            Get_Floor_Room_Position();
        } else {
            history.push('/Login_Page');
        }
    }, []);

    const handleClicksNotUser = e => {
        e.stopPropagation();
        setUserSelect(null);
    };
    return (
        <div>
            <FloorLayoutUserMainPageMainDivBox onClick={e => handleClicksNotUser(e)}>
                <FloorLayoutUserContent
                    UserSelect={UserSelect}
                    PlaceState={PlaceState}
                    setUserSelect={data => setUserSelect(data)}
                ></FloorLayoutUserContent>
            </FloorLayoutUserMainPageMainDivBox>
            <FloorLayoutUserSelect
                id="text"
                UserSelect={UserSelect}
                setUserSelect={data => setUserSelect(data)}
                handleClicksNotUser={e => handleClicksNotUser(e)}
                Get_Floor_Room_Position={() => Get_Floor_Room_Position()}
            ></FloorLayoutUserSelect>

            {/* 로딩 컴포넌트 시작 */}
            <LoaderMainPage loading={Loading}></LoaderMainPage>
            {/* 로딩 컴포넌트 끝 */}
        </div>
    );
};

export default FloorLayoutUserMainPage;
