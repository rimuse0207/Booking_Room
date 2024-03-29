import React from "react";
import { OilCostMainDivBox } from "../Oil_Cost/OilCost";
import { useDispatch, useSelector } from "react-redux";
import { Vehicle_Operation_State_Change_Func } from "../../../../Models/ReduxThunk/VehicleOperationReducer/VehicleOperationReducer";

const RoadCost = () => {
     const dispatch = useDispatch();
    const VehicleOperationState = useSelector(state => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    

    const HandleChangePlace = (e) => {
                 const Change_Data = {
                    ...VehicleOperationState,
                    company_car_road_cost:Number(e.target.value)
                }

                dispatch(Vehicle_Operation_State_Change_Func(Change_Data))     
    }
    return (
         <OilCostMainDivBox>
            <div className="Purpose_Container">
                <div className="Purpose_Label">통행료 : </div>
                <div className="Purpose_Selector">
                    <input type="number" value={VehicleOperationState.company_car_road_cost} onChange={(e)=>HandleChangePlace(e)}>
                        
                    </input>
                    <label>원</label>
                </div>
            </div>
        </OilCostMainDivBox>
    )
}

export default RoadCost;