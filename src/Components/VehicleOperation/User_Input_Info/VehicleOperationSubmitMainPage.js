import React, { useEffect } from "react";
import styled from "styled-components";
import NavigationMainPage from "../../Navigation/NavigationMainPage";
import UserInputInfo from "./UserInputInfo";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Vehicle_Operation_Input_Content_Reduce_Thunk } from "../../../Models/ReduxThunk/VehicleOperationReducer/VehicleOperationReducer";



const VehicleOperationSubmitMainPageMainDivBox = styled.div`
  background-color:#efefef;
    .Show_Container{
        max-width:1000px;
        margin:0 auto;
    }
`

const VehicleOperationSubmitMainPage = () => {
    const dispatch = useDispatch();
    const { company_car_epid } = useParams();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const Vehicle_Operation_State = useSelector((state) => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    


    // useEffect(() => {           
    //     dispatch(Vehicle_Operation_Input_Content_Reduce_Thunk(company_car_epid,LoginInfo.Login_id,Vehicle_Operation_State.company_car_use_date));
    // },[company_car_epid])

    return (
        <VehicleOperationSubmitMainPageMainDivBox>
            <NavigationMainPage TitleName="차량운행 일지 둥록"></NavigationMainPage>
            <div className="Show_Container">
                <UserInputInfo></UserInputInfo>
            </div>
            
        </VehicleOperationSubmitMainPageMainDivBox>
    )
}

export default VehicleOperationSubmitMainPage;