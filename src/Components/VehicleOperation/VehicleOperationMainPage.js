import React, { useEffect } from "react";
import styled from "styled-components";
import NavigationMainPage from "../Navigation/NavigationMainPage";
import UserSubmitList from "./User_Submit_List/UserSubmitList";
import UserInputInfo from "./User_Input_Info/UserInputInfo";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "../ToasMessage/ToastManager";


const VehicleOperationMainPageMainDivBox = styled.div`
    background-color:#efefef;
    .Show_Container{
        max-width:1000px;
        margin:0 auto;
    }
`

const VehicleOperationMainPage = () => {
      const history = useHistory();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);

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
        <VehicleOperationMainPageMainDivBox>
            <NavigationMainPage TitleName="차량운행 일지"></NavigationMainPage>
            <div className="Show_Container">
                <UserSubmitList></UserSubmitList>
            </div>
        
        </VehicleOperationMainPageMainDivBox>
    )
}

export default VehicleOperationMainPage;