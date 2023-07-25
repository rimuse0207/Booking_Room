import React from "react";
import styled from "styled-components";
import { PurposeMainDivBox } from "../Purpose/Purpose";
import { useDispatch, useSelector } from "react-redux";
import { Vehicle_Operation_State_Change_Func } from "../../../../Models/VehicleOperationReducer/VehicleOperationReducer";

export const OilCostMainDivBox = styled.div`
    margin-top:10px;
    .Purpose_Container{
        padding-left:10px;
        background-color:#fff;
        display:flex;
        align-items:center;
        height:60px;
        .Purpose_Label{
            margin-right:20px;
        }   
        .Purpose_Selector{
            input{
                height:30px;
                border:none;
                border-bottom:1px solid lightgray;
                text-align:right;
                padding-right:5px;
            }
        }
    }
`

const OilCost = () => {
     const dispatch = useDispatch();
    const VehicleOperationState = useSelector(state => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    

    const HandleChangePlace = (e) => {
                 const Change_Data = {
                    ...VehicleOperationState,
                    company_car_oil_cost:e.target.value
                }

                dispatch(Vehicle_Operation_State_Change_Func(Change_Data))     
    }
    return (
        <OilCostMainDivBox>
            <div className="Purpose_Container">
                <div className="Purpose_Label">유류비 : </div>
                <div className="Purpose_Selector">
                    <input type="number" value={VehicleOperationState.company_car_oil_cost} onChange={(e)=>HandleChangePlace(e)}>
                        
                    </input>
                    <label>원</label>
                </div>
            </div>
        </OilCostMainDivBox>
    )
}

export default OilCost;