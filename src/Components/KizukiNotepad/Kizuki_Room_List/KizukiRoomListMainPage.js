import React from "react";
import styled from "styled-components";
import NavigationMainPage from "../../Navigation/NavigationMainPage";
import KizukiListContainer from "./Kizuki_List_Container/KizukiListContainer";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const KizukiRoomListMainPageMainDivBox = styled.div`
    
    .List_Move_Container{
        display:flex;
        
        .List_Move{
            margin-left:20px;
            min-width:50px;
        :hover{
            cursor: pointer;
            color:lightgray;
        }
    }    
    }
    
`
const KizukiRoomListMainPage = () => {
    const history = useHistory();
    return (
        <KizukiRoomListMainPageMainDivBox>
            <NavigationMainPage TitleName="KIZUKI 노트"></NavigationMainPage>
            <div className="List_Move_Container">
                <h2 className="List_Move" onClick={() => history.push('/KIZUKI_Notepad')}>
                    <FaArrowLeft></FaArrowLeft>
                </h2>
                <h2>Closer 팀</h2>
            </div>
            <KizukiListContainer></KizukiListContainer>

        </KizukiRoomListMainPageMainDivBox>
    )
}

export default KizukiRoomListMainPage;