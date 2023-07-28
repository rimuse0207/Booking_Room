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
    
    return (
        <UserInputInfoMainDivBox>
            <CarList></CarList>
            <Purpose></Purpose>
            <Date></Date>
            <PlaceList></PlaceList>
            <Distance></Distance>
            <OilCost></OilCost>
            <RoadCost></RoadCost>
            <EtcCost></EtcCost>
            <div style={{marginBottom:"50px",marginTop:"50px"}}>
                <div className="Submit_Button">저장</div>
            </div>
                
            
            
        </UserInputInfoMainDivBox>
    )
}

export default UserInputInfo;