import React from "react";
import styled from "styled-components";
import NavigationMainPage from "../Navigation/NavigationMainPage";
import UserSubmitList from "./User_Submit_List/UserSubmitList";
import UserInputInfo from "./User_Input_Info/UserInputInfo";


const VehicleOperationMainPageMainDivBox = styled.div`
    background-color:#efefef;
    .Show_Container{
        max-width:1000px;
        margin:0 auto;
    }
`

const VehicleOperationMainPage = () => {
    return (
        <VehicleOperationMainPageMainDivBox>
            <NavigationMainPage TitleName="차량운행 일지"></NavigationMainPage>
            <div className="Show_Container">
                <UserSubmitList></UserSubmitList>
            </div>
        
        </VehicleOperationMainPageMainDivBox>
    )
}

export default VehicleOperationMainPage;