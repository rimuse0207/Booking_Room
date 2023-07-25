import React from "react";
import styled from "styled-components";
import NavigationMainPage from "../Navigation/NavigationMainPage";
import UserSubmitList from "./User_Submit_List/UserSubmitList";
import UserInputInfo from "./User_Input_Info/UserInputInfo";


const VehicleOperationMainPageMainDivBox = styled.div`
    background-color:#efefef;
`

const VehicleOperationMainPage = () => {
    return (
        <VehicleOperationMainPageMainDivBox>
            <NavigationMainPage TitleName="차량운행 일지"></NavigationMainPage>
            <UserSubmitList></UserSubmitList>
            <UserInputInfo></UserInputInfo>
        </VehicleOperationMainPageMainDivBox>
    )
}

export default VehicleOperationMainPage;