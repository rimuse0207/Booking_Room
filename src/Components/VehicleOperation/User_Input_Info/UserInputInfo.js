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
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const Vehicle_Operation_State = useSelector((state) => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    const Handle_Save_Vehicle_Operation = async() => {
        try {

            const Handle_Save_Vehicle_Operation_Axios = await request.post(`/DepartmentRouter/Handle_Save_Vehicle_Operation`, {
                id: LoginInfo.Login_id,
                Vehicle_Operation_State
            })
            
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