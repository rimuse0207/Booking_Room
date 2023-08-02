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
import { confirmAlert } from "react-confirm-alert";
import { toast } from "../../../ToasMessage/ToastManager";

const CarListMainPage = styled.div`
`

const CarList = () => {
    const dispatch = useDispatch();
    const {car_info,company_car_epid } = useParams();
    const Vehicle_Operation_State = useSelector((state) => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    const VehicleOperationState = useSelector(state => state.VehicleOperationRedux.Vehicle_Operation_Input_State);
    const LoginInfo = useSelector(state => state.LoginInfoDataRedux.Infomation);
    const [CarList_State, setCarList_State] = useState([]);

    const handleChangeData = async(e) => {

        const Vehicle_Operation_Car_Change_Rendering_Axios = await request.get(`/DepartmentRouter/Vehicle_Operation_Car_Change_Rendering`, {
            params: {
                car_id: e.value,
                Login_id: LoginInfo.Login_id,
                selcet_date: Vehicle_Operation_State.company_car_use_date,
                company_car_erp_id:e.company_car_erp_id
            }
        })
        const Change_Datas = {
            ...VehicleOperationState,
            company_car_epid: e.company_car_epid,
            company_car_userId: e.company_car_userId,
            company_car_name: e.company_car_name,
            company_car_place: e.company_car_place,
            company_car_explain: e.company_car_explain,
            company_car_erp_id:e.company_car_erp_id,
            company_select: {
                label: e.label,
                value:e.value
            },
             company_car_keys:"",
                        company_car_start_dispatnce: Vehicle_Operation_Car_Change_Rendering_Axios.data.Last_Distance,
                        company_car_end_dispatnce:Vehicle_Operation_Car_Change_Rendering_Axios.data.Last_Distance
                        
        }
        if (Vehicle_Operation_Car_Change_Rendering_Axios.data.dataSuccess) {
            if (Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows.length > 0) {
               const Change_Data = {
                        ...VehicleOperationState,
                        company_car_epid: e.company_car_epid,
                        company_car_userId: e.company_car_userId,
                        company_car_name: e.company_car_name,
                        company_car_place: e.company_car_place,
                   company_car_explain: e.company_car_explain,
                        company_car_erp_id:e.company_car_erp_id,
                        company_select: {
                            label: e.label,
                            value:e.value
                        },
                        company_car_keys:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_keys,
                        company_car_use_purpose_select: {
                            value: Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_purpose,
                            label:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_purpose
                        },
                        company_car_start_place:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_start_history_place,
                        company_car_end_place:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_end_history_place,
                        company_car_start_dispatnce:Vehicle_Operation_Car_Change_Rendering_Axios.data.Last_Distance,
                        company_car_end_dispatnce:Vehicle_Operation_Car_Change_Rendering_Axios.data.Last_Distance,
                        company_car_oil_cost:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_oil_cost,
                        company_car_road_cost:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_road_cost,
                        company_car_etc_cost:Vehicle_Operation_Car_Change_Rendering_Axios.data.Vehicle_Operation_Car_Change_Rendering_Rows[0].company_input_list_etc_cost,
                }


                 confirmAlert({
                    title: `법인차량 운행일지 확인 `,
                    message: ` 작성하였던 데이터가 있습니다. 데이터를 불러오시겠습니까?`,
                    buttons: [
                        {
                        label: '예',
                            onClick: () => {
                            dispatch(Vehicle_Operation_State_Change_Func(Change_Data))
                        }
                        },
                        {
                        label: '아니오',
                            onClick: () => {
                            dispatch(Vehicle_Operation_State_Change_Func(Change_Datas))    
                        }
                        }
                    ]
                    });
            } else {
                dispatch(Vehicle_Operation_State_Change_Func(Change_Datas))    
            }

        } else {
                dispatch(Vehicle_Operation_State_Change_Func(Change_Datas))
        }

         toast.show({
                title: `출발,도착 누적거리가 초기화 됩니다.`,
                successCheck: true,
                duration: 6000,
                });
    }


// 법인차량 리스트 항목 조회
    const Car_Info_Data_Getting = async () => {
        
        const Car_Info_Data_Getting_Axios = await request.get('/DepartmentRouter/Car_Info_Data_Getting', {
            params: {
                car_info
            }
        })
        
        if (Car_Info_Data_Getting_Axios.data.dataSuccess) {
            setCarList_State(Car_Info_Data_Getting_Axios.data.Car_Info_Data_Getting_Rows);
            if (company_car_epid) {
                const a = Car_Info_Data_Getting_Axios.data.Car_Info_Data_Getting_Rows.filter((list) => {
                if (list.company_car_epid === company_car_epid) {
                    return handleChangeData(list)
                } 
            })    
            }
            
            
        }

    }

    useEffect(() => {
        Car_Info_Data_Getting();
    }, [])
    


 

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
            </div>
            <div style={{marginTop:"15px",lineHeight:"25px"}}>
                    <div>차량 위치 : <strong>{VehicleOperationState.company_car_place}</strong></div>
                    <div>차량 종류 : <strong>{VehicleOperationState.company_car_explain }</strong></div>
                </div>
            
        </PurposeMainDivBox>
    )
}

export default CarList;