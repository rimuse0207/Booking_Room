import React, { useEffect } from "react";
import styled from "styled-components";
import NavigationMainPage from "../../Navigation/NavigationMainPage";
import UserInputInfo from "./UserInputInfo";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Vehicle_Operation_Input_Content_Reduce_Thunk } from "../../../Models/ReduxThunk/VehicleOperationReducer/VehicleOperationReducer";
import { toast } from "../../ToasMessage/ToastManager";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



const VehicleOperationSubmitMainPageMainDivBox = styled.div`
  background-color:#efefef;
    .Show_Container{
        max-width:1000px;
        margin:0 auto;
    }
`

const VehicleOperationSubmitMainPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { company_car_epid } = useParams();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const Vehicle_Operation_State = useSelector((state) => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    


    useEffect(() => {           
        if (!LoginInfo.Login_token) {
              toast.show({
                    title: `로그인 후 이용 가능합니다.`,
                    successCheck: false,
                    duration: 6000,
              });
            history.push("/Login_Page")
        } else if(LoginInfo.Login_company !== 'DHKS') {
               toast.show({
                    title: `로그인 후 이용 가능합니다.`,
                    successCheck: false,
                    duration: 6000,
               });
            history.push("/Today_Food");
        }
    },[])

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