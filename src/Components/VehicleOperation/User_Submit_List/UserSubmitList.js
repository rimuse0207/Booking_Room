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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "../../ToasMessage/ToastManager";
import { BrowserView } from "react-device-detect";
import { Vehicle_Operation_State_Reset_Func } from "../../../Models/ReduxThunk/VehicleOperationReducer/VehicleOperationReducer";
import { confirmAlert } from "react-confirm-alert";

const UserSubmitListMainDivBox = styled.div`
.FloatingMenu_Container{
    position:fixed;
    bottom:50px;
    right:20px;
}
`

const UserSubmitList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [FloatingMenuOnCheck, setFloatingMenuOnCheck] = useState(true);
    const Vehicle_Operation_State = useSelector((state) => state.VehicleOperationShowContentReduxThunk.Vehicle_Operation_Getting_Data_State);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);



    const Move_to_New_Write = () => {
        dispatch(Vehicle_Operation_State_Reset_Func())
        history.push('/VehicleOperaion/NewVehicleOperation');
    }



    const HandleExcelDownload = async () => {
        
        confirmAlert({
                    title: `차량 운행일지 Excel  `,
                    message: `Excel 다운로드를 하시려면 '예'를 눌러주세요. `,
                    buttons: [
                        {
                        label: '예',
                            onClick: () => {
                                Excel_Down_Start();
                        }
                        },
                        {
                        label: '아니오',
                            onClick: () => {
                           
                        }
                        }
                    ]
                    });
    }


    const Excel_Down_Start = async () => {
         if (Vehicle_Operation_State.Vehicle_Selected_Car === "All") {
                toast.show({
                    title: `차량을 선택 후 다운로드 부탁드립니다.`,
                    successCheck: true,
                    duration: 6000,
                });
            return;
        }

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
                        onClick={() => {
                            Move_to_New_Write();
                        }
                        }
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