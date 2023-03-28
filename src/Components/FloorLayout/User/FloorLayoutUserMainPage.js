import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { request } from '../../../API';
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
    const [PlaceState, setPlaceState] = useState([]);
    const [UserSelect, setUserSelect] = useState(null);
    const Get_Floor_Room_Position = async () => {
        try {
            const Get_Floor_Room_Position_State_Axios = await request.get(`/users/User_Get_Floor_Room_Position_State`);
            if (Get_Floor_Room_Position_State_Axios.data.dataSuccess) {
                setPlaceState(Get_Floor_Room_Position_State_Axios.data.PlaceState);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Get_Floor_Room_Position();
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
        </div>
    );
};

export default FloorLayoutUserMainPage;
