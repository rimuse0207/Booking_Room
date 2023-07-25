import React from "react";
import styled from "styled-components";
import { TbSquareMinus,TbSquarePlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Vehicle_Operation_State_Change_Func } from "../../../../Models/VehicleOperationReducer/VehicleOperationReducer";

export const DistanceMainDivBox = styled.div`
    padding-bottom:10px;
    background-color:#fff;
    .Distance_Container{
        display:flex;
        border-top:1px solid gray;
        .Distance_Sub_Container{
            width:49%;
            display:flex;
            justify-content:space-between;
            padding:10px;
            font-size:1.1em;
            input{
                width:70%;
                border:none;
                border-bottom:1px solid lightgray;
                text-align:right;
                padding-right:10px;
                margin-left:10px;
            }
           
        }
        .Distance_Division_Container{
            border:1px solid lightgray;
        }
    }
    .Distance_Calcu{
        text-align:center;
        margin:0 auto;
        margin-top:10px;
        margin-bottom:10px;
        width:80%;
        border-radius:5px;
        background-color:#EDEEF3;
        padding-top:15px;
        padding-bottom:15px;
    }
`

const Distance = () => {
     const dispatch = useDispatch();
    const VehicleOperationState = useSelector(state => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    

    const HandleChangePlace = (e, place) => {
        
        if (place === 'start') {
                 const Change_Data = {
                    ...VehicleOperationState,
                    company_car_start_dispatnce:e.target.value
                }

                dispatch(Vehicle_Operation_State_Change_Func(Change_Data))     
        } else {
                 const Change_Data = {
                    ...VehicleOperationState,
                    company_car_end_dispatnce:Number(e.target.value)
                }

                dispatch(Vehicle_Operation_State_Change_Func(Change_Data))
        }

       
    }


    const HandleMinusDistance = (place) => {
        if (place === 'start') {
            const Change_Data = {
                    ...VehicleOperationState,
                    company_car_start_dispatnce:VehicleOperationState.company_car_start_dispatnce -10
                }

                dispatch(Vehicle_Operation_State_Change_Func(Change_Data))    
        } else {
             const Change_Data = {
                    ...VehicleOperationState,
                    company_car_end_dispatnce:VehicleOperationState.company_car_end_dispatnce -10
                }

                dispatch(Vehicle_Operation_State_Change_Func(Change_Data))    
        }
    }

    const HandlePlusDistance = (place) => {
        if (place === 'start') {
            const Change_Data = {
                    ...VehicleOperationState,
                    company_car_start_dispatnce:VehicleOperationState.company_car_start_dispatnce +10
                }

                dispatch(Vehicle_Operation_State_Change_Func(Change_Data))    
        } else {
             const Change_Data = {
                    ...VehicleOperationState,
                    company_car_end_dispatnce:VehicleOperationState.company_car_end_dispatnce +10
                }

                dispatch(Vehicle_Operation_State_Change_Func(Change_Data))    
        }
    }

    return (
        <DistanceMainDivBox>
            <div className="Distance_Container">
                <div className="Distance_Sub_Container">
                    <div onClick={()=>HandleMinusDistance("start")}><TbSquareMinus></TbSquareMinus></div>
                    <div style={{ fontSize: "0.9em" }}>
                        <input type="number" value={VehicleOperationState.company_car_start_dispatnce} onChange={(e)=>HandleChangePlace(e,'start')} placeholder="출발전 KM"></input>KM
                    </div>
                    <div onClick={()=>HandlePlusDistance("start")}><TbSquarePlus></TbSquarePlus></div>
                </div>
                <div className="Distance_Division_Container">

                </div>
                <div className="Distance_Sub_Container">
                    <div onClick={()=>HandleMinusDistance("end")}><TbSquareMinus></TbSquareMinus></div>
                    <div style={{ fontSize: "0.9em" }}>
                        <input type="number"  value={VehicleOperationState.company_car_end_dispatnce} onChange={(e)=>HandleChangePlace(e,'end')} placeholder="도착후 KM"></input>KM
                    </div>
                    <div onClick={()=>HandlePlusDistance("end")}><TbSquarePlus></TbSquarePlus></div>
                </div>
            </div>
            <div className="Distance_Calcu">{( Number(VehicleOperationState.company_car_end_dispatnce) - Number(VehicleOperationState.company_car_start_dispatnce)).toString().toLocaleString()}KM 운행</div>
        </DistanceMainDivBox>   
    )
}

export default Distance;