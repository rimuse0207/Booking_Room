import React from "react";
import styled from "styled-components";
import { PurposeMainDivBox } from "../Purpose/Purpose";
import { useState } from "react";
import Select from "react-select";
import { useEffect } from "react";
import { request } from "../../../../API";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import {Vehicle_Operation_Input_Content_Reduce_Thunk, Vehicle_Operation_State_Change_Func} from "../../../../Models/ReduxThunk/VehicleOperationReducer/VehicleOperationReducer"

const CarListMainPage = styled.div`
`

const CarList = () => {
    const dispatch = useDispatch();
    const VehicleOperationState = useSelector(state => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const {car_info } = useParams();
    const [CarList_State, setCarList_State] = useState([]);

    const handleChangeData = (e) => {
        const Change_Data = {
            ...VehicleOperationState,
            company_car_epid: e.company_car_epid,
            company_car_userId: e.company_car_userId,
            company_car_name: e.company_car_name,
            company_car_place: e.company_car_place,
            company_car_explain: e.company_car_explain,
            company_select: {
                label: e.label,
                value:e.value
            }
        }

        dispatch(Vehicle_Operation_Input_Content_Reduce_Thunk(e.value, LoginInfo.Login_id, Vehicle_Operation_State.company_car_use_date));
        dispatch(Vehicle_Operation_State_Change_Func(Change_Data))
    }

      const Vehicle_Operation_State = useSelector((state) => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    


    


    const Car_Info_Data_Getting = async () => {
        
        const Car_Info_Data_Getting_Axios = await request.get('/DepartmentRouter/Car_Info_Data_Getting', {
            params: {
                car_info
            }
        })
        
        if (Car_Info_Data_Getting_Axios.data.dataSuccess) {
            setCarList_State(Car_Info_Data_Getting_Axios.data.Car_Info_Data_Getting_Rows);
        }

    }

    useEffect(() => {
        Car_Info_Data_Getting();
    },[])
    return (
        <PurposeMainDivBox>
            <div className="Purpose_Container">
                <div className="Purpose_Label">이용차량</div>
                <div className="Purpose_Selector">
                    <Select
                            onChange={e => handleChangeData(e)}
                            name="colors"
                            options={CarList_State}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            isReadOnly={true}
                            isSearchable={false}
                            placeholder="선택바랍니다."
                            value={VehicleOperationState.company_select}
                            />
                </div>
                <div style={{marginTop:"15px",lineHeight:"25px"}}>
                    <div>차량 위치 : <strong>{VehicleOperationState.company_car_place}</strong></div>
                    <div>차량 종류 : <strong>{VehicleOperationState.company_car_explain }</strong></div>
                </div>
            </div>
            
        </PurposeMainDivBox>
    )
}

export default CarList;