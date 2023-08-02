import React from "react";
import styled from "styled-components";
import HeaderShow from "./HeaderShow/HeaderShow";
import BodyShow from "./BodyShow/BodyShow";
import CarSelector from "./CarSelector/CarSelector";
import { ChildButton, FloatingMenu, MainButton } from "react-floating-button-menu";
import { TiThMenu } from 'react-icons/ti';
import { IoCloseSharp } from "react-icons/io5";
import { RiPlayListAddLine,RiFileExcel2Fill } from "react-icons/ri";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { request } from "../../../API";
import { useSelector } from "react-redux";

const UserSubmitListMainDivBox = styled.div`
.FloatingMenu_Container{
    position:fixed;
    bottom:50px;
    right:20px;
}
`

const UserSubmitList = () => {
    const history = useHistory();
    const [FloatingMenuOnCheck, setFloatingMenuOnCheck] = useState(true);
    const Vehicle_Operation_State = useSelector((state) => state.VehicleOperationShowContentReduxThunk.Vehicle_Operation_Getting_Data_State);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const HandleExcelDownload = async () => {
        
        try {

            const Vehicle_Operation_Excel_Download_Axios = await request.get('/DepartmentRouter/Vehicle_Operation_Excel_Download', {
                params: {
                    Select_Date: Vehicle_Operation_State.Vehilce_Selected_Date,
                    Select_Car : Vehicle_Operation_State.Vehicle_Selected_Car,
                    name: LoginInfo.Login_name,
                    id: LoginInfo.Login_id
                }
            });
            if (Vehicle_Operation_Excel_Download_Axios.data.dataSuccess) {
                console.log(Vehicle_Operation_Excel_Download_Axios);
                window.open(`${process.env.REACT_APP_DB_HOST}/${Vehicle_Operation_Excel_Download_Axios.data.URL}`)
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserSubmitListMainDivBox>
            <CarSelector></CarSelector>
            <HeaderShow></HeaderShow>
            <BodyShow></BodyShow>
             {/* 플로팅 메뉴바 컴포넌트 */}
            <div className="FloatingMenu_Container">
                <FloatingMenu slideSpeed={500} direction="up" spacing={8} isOpen={FloatingMenuOnCheck}>
                    <MainButton
                        iconResting={<TiThMenu style={{ fontSize: 20 }} nativecolor="white" />}
                        iconActive={<IoCloseSharp style={{ fontSize: 20 }} nativecolor="white" color="black" />}
                        // backgroundColor="black"
                        onClick={() => setFloatingMenuOnCheck(!FloatingMenuOnCheck)}
                        size={56}
                    ></MainButton>
                    <ChildButton
                        icon={<RiPlayListAddLine style={{ fontSize: 20 }} nativecolor="black" />}
                        // backgroundColor="white"
                        size={40}
                        onClick={() => history.push('/VehicleOperaion/NewVehicleOperation/Cars')}
                    />
                    <ChildButton
                        icon={<RiFileExcel2Fill style={{ fontSize: 20,color:"green" }} nativecolor="green" />}
                        // backgroundColor="white"
                        size={40}
                        onClick={()=>{HandleExcelDownload()}}
                    />
                </FloatingMenu>
            </div>
        </UserSubmitListMainDivBox>
    )
}

export default UserSubmitList;