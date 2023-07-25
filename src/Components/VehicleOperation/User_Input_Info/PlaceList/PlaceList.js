import React from "react";
import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Vehicle_Operation_State_Change_Func } from "../../../../Models/VehicleOperationReducer/VehicleOperationReducer";

const PlaceListMainDivBox = styled.div`
    border:1px lightgray black;
    background-color:#fff;
    .Place_Container{
        display:flex;
        min-width:350px;
        align-items:center;
        .Place_Content_Box{
            width:50%;
            .Place_Title{
                text-align:center;
                margin-top:10px;
                font-weight:bolder;
            }
            .Place_Input_Box{
                text-align:center;
                margin-top:10px;
                margin-bottom:10px;
                input{
                    border:none;
                    border-bottom:1px solid lightgray;
                    padding-left:5px;
                    padding-bottom:5px;
                    width:90%;
                }
            }
        }
        
      
    }
`

const PlaceList = () => {
    const dispatch = useDispatch();
    const VehicleOperationState = useSelector(state => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    

    const HandleChangePlace = (e, place) => {
        
        if (place === 'start') {
                 const Change_Data = {
                    ...VehicleOperationState,
                    company_car_start_place:e.target.value
                }

                dispatch(Vehicle_Operation_State_Change_Func(Change_Data))     
        } else {
                 const Change_Data = {
                    ...VehicleOperationState,
                    company_car_end_place:e.target.value
                }

                dispatch(Vehicle_Operation_State_Change_Func(Change_Data))
        }

       
    }

    return (
        <PlaceListMainDivBox>
            <div className="Place_Container">
                <div className="Place_Content_Box">
                    <div className="Place_Title" style={{color:"blue"}}>출발</div>
                    <div className="Place_Input_Box">
                        <input value={VehicleOperationState.company_car_start_place} onChange={(e)=>HandleChangePlace(e,"start")} placeholder="출발지를 적어주세요."></input>
                    </div>
                </div>
                <div>
                    <MdArrowForwardIos></MdArrowForwardIos>
                </div>
                <div className="Place_Content_Box">
                    <div  className="Place_Title" style={{color:"red"}}>도착</div>
                    <div className="Place_Input_Box">
                        <input value={VehicleOperationState.company_car_end_place} onChange={(e)=>HandleChangePlace(e,"end")} placeholder="도착지를 적어주세요."></input>
                    </div>
                </div>
            </div>
            
        </PlaceListMainDivBox>
    )
}

export default PlaceList;