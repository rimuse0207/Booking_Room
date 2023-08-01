import React from "react";
import styled from "styled-components";
import Purpose from "./Purpose/Purpose";
import CarList from "./CarList/CarList";
import Date from "./Date/Date";
import PlaceList from "./PlaceList/PlaceList";
import Distance, { DistanceMainDivBox } from "./Distance/Distance";
import OilCost from "./Oil_Cost/OilCost";
import RoadCost from "./Road_Cost/RoadCost";
import EtcCost from "./Etc_Cost/EtcCost";
import { request } from "../../../API";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "../../ToasMessage/ToastManager";
import moment from "moment";
import {Vehicle_Operation_Select_Car_AND_Date_Change_Func, Vehicle_Operation_Show_Content_Reduce_Thunk} from "../../../Models/ReduxThunk/VehicleOperationShowContentRedux/VehicleOperationShowContent"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserInputInfoMainDivBox = styled.div`
    padding-bottom:10px;
    .Submit_Button{
        width:80%;
        margin:0 auto;
        margin-top:10px;
        margin-bottom:10px;
        text-align:center;
        height:40px;
        line-height:40px;
        border-radius:10px;
        font-weight:bolder;
        background-color:#368;
        color:#fff;
    }
`

const UserInputInfo = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const Vehicle_Operation_State = useSelector((state) => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    const Handle_Save_Vehicle_Operation = async() => {
        try {

            if (Vehicle_Operation_State.company_car_end_dispatnce - Vehicle_Operation_State.company_car_start_dispatnce <= 0) {
                toast.show({
                title: `출발누적거리는 도착누적거리보다 같거나 클 순 없습니다.`,
                successCheck: false,
                duration: 6000,
                });
                return;
            }else  if (!Vehicle_Operation_State.company_car_use_purpose_select) {
                toast.show({
                title: `사용목적을 선택 해 주세요.`,
                successCheck: false,
                duration: 6000,
                });
                return;
            }else  if (!Vehicle_Operation_State.company_car_start_place) {
                toast.show({
                title: `출발지역을 적어주세요.`,
                successCheck: false,
                duration: 6000,
                });
                return;
            }else  if (!Vehicle_Operation_State.company_select) {
                toast.show({
                title: `법인차량을 선택 해 주세요.`,
                successCheck: false,
                duration: 6000,
                });
                return;
            }
            
            const Handle_Save_Vehicle_Operation_Axios = await request.post(`/DepartmentRouter/Handle_Save_Vehicle_Operation`, {
                id: LoginInfo.Login_id,
                Vehicle_Operation_State
            })

            if (Handle_Save_Vehicle_Operation_Axios.data.dataSuccess) {
                toast.show({
                    title: `${moment(Vehicle_Operation_State.company_car_use_date).format("YYYY-MM-DD")}의 법인 차량 ${Vehicle_Operation_State.company_car_name}의 운행일지를 저장하였습니다. `,
                    successCheck: true,
                    duration: 6000,
                });      
                const Change_Datas = {
                    date:Vehicle_Operation_State.company_car_use_date,
                    car:Vehicle_Operation_State.company_car_epid
                }
                dispatch(Vehicle_Operation_Select_Car_AND_Date_Change_Func(Change_Datas));
                dispatch(Vehicle_Operation_Show_Content_Reduce_Thunk(Vehicle_Operation_State.company_car_epid, Vehicle_Operation_State.company_car_use_date, LoginInfo.Login_id))
                history.push('/VehicleOperaion');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UserInputInfoMainDivBox>
            <CarList></CarList>
            <Date></Date>
            <Purpose></Purpose>
            <PlaceList></PlaceList>
            <Distance></Distance>
            <OilCost></OilCost>
            <RoadCost></RoadCost>
            <EtcCost></EtcCost>
            <div style={{marginBottom:"50px",marginTop:"50px"}}>
                <div className="Submit_Button" onClick={()=>Handle_Save_Vehicle_Operation()}>저장</div>
            </div>
                
            
            
        </UserInputInfoMainDivBox>
    )
}

export default UserInputInfo;